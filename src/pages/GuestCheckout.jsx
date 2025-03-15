import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import axios from "axios";
import { toast } from "react-toastify";

const GuestCheckout = () => {
  const [method, setMethod] = useState("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoWalletAddress] = useState("0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7");
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const { navigate, backendUrl, setCartItem, getCartAmount, delivery_fee, getCartItems } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    billingFirstName: "",
    billingLastName: "",
    billingEmail: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZipcode: "",
    billingCountry: "",
    billingPhone: "",
    manualPaymentDetails: {
      paymentType: "",
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
      paypalEmail: "",
      cryptoTransactionId: "User didn't enter transaction ID",
    },
  });

  // Copy crypto wallet address to clipboard
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(cryptoWalletAddress);
    toast.info("Wallet address copied to clipboard");
  };

  const handleMethodChange = (newMethod, paymentType = "") => {
    setMethod(newMethod);

    // Set the payment type if it's a manual payment method
    if (newMethod === "manual" && paymentType) {
      setFormData((prev) => ({
        ...prev,
        manualPaymentDetails: {
          ...prev.manualPaymentDetails,
          paymentType: paymentType,
        },
      }));
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSameAsDeliveryChange = (e) => {
    const isChecked = e.target.checked;
    setSameAsDelivery(isChecked);
    
    if (isChecked) {
      // If checked, copy delivery address to billing address
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingEmail: prev.email,
        billingStreet: prev.street,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipcode: prev.zipcode,
        billingCountry: prev.country,
        billingPhone: prev.phone
      }));
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.zipcode ||
      !formData.country ||
      !formData.phone
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate billing address if not using same as delivery
    if (!sameAsDelivery) {
      if (
        !formData.billingFirstName ||
        !formData.billingLastName ||
        !formData.billingEmail ||
        !formData.billingStreet ||
        !formData.billingCity ||
        !formData.billingState ||
        !formData.billingZipcode ||
        !formData.billingCountry ||
        !formData.billingPhone
      ) {
        toast.error("Please fill all required billing address fields");
        return;
      }
    }

    // Payment method validation
    if (method === "manual") {
      if (!formData.manualPaymentDetails?.paymentType) {
        toast.error("Please select a payment type");
        return;
      }

      if (
        formData.manualPaymentDetails.paymentType === "paypal" &&
        !formData.manualPaymentDetails.paypalEmail
      ) {
        toast.error("Please enter your PayPal email");
        return;
      }

      if (
        ["credit_card", "debit_card"].includes(
          formData.manualPaymentDetails.paymentType
        )
      ) {
        if (
          !formData.manualPaymentDetails.cardNumber ||
          !formData.manualPaymentDetails.cardHolderName ||
          !formData.manualPaymentDetails.expiryDate ||
          !formData.manualPaymentDetails.cvv
        ) {
          toast.error("Please fill in all card details");
          return;
        }
      }
    }

    try {
      setIsLoading(true);
      const items = getCartItems(); // Get formatted cart items
      let address = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
        phone: formData.phone
      };

      // Create billing address object
      let billingAddress = sameAsDelivery 
        ? address 
        : {
            firstName: formData.billingFirstName,
            lastName: formData.billingLastName,
            email: formData.billingEmail,
            street: formData.billingStreet,
            city: formData.billingCity,
            state: formData.billingState,
            zipcode: formData.billingZipcode,
            country: formData.billingCountry,
            phone: formData.billingPhone
          };

      const orderData = {
        address: address,
        billingAddress: billingAddress,
        items: items,
        amount: getCartAmount() + delivery_fee,
        isGuest: true,
        manualPaymentDetails: method === "manual" ? formData.manualPaymentDetails : undefined
      };

      // Call the API endpoint for guest orders
      const response = await axios.post(
        backendUrl + "/api/order/guest",
        orderData
      );
      
      if (response.data.success) {
        setCartItem({});
        toast.success("Order placed successfully!   One of our representative will get in touch with you in 24 hours Via call or email");
        navigate("/"); // Redirect to home page after successful order
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Left side - Customer Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"GUEST"} text2={"CHECKOUT"} />
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Fill in your information below to place your order without creating an account.
        </p>
        
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="E-mail Address"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Area PIN-CODE"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Mobile Number"
        />

        {/* Same As Delivery Checkbox */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="sameAsDelivery"
              checked={sameAsDelivery}
              onChange={handleSameAsDeliveryChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="sameAsDelivery"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Billing Address same as Delivery Address
            </label>
          </div>
        </div>

        {/* Billing Address Section */}
        {!sameAsDelivery && (
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
              <Title text1={"BILLING"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="billingFirstName"
                value={formData.billingFirstName}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="First name"
              />
              <input
                required
                onChange={onChangeHandler}
                name="billingLastName"
                value={formData.billingLastName}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="billingEmail"
              value={formData.billingEmail}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
              type="email"
              placeholder="E-mail Address"
            />
            <input
              required
              onChange={onChangeHandler}
              name="billingStreet"
              value={formData.billingStreet}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Street"
            />
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="billingCity"
                value={formData.billingCity}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="City"
              />
              <input
                required
                onChange={onChangeHandler}
                name="billingState"
                value={formData.billingState}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                onChange={onChangeHandler}
                name="billingZipcode"
                value={formData.billingZipcode}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Area PIN-CODE"
              />
              <input
                required
                onChange={onChangeHandler}
                name="billingCountry"
                value={formData.billingCountry}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              onChange={onChangeHandler}
              name="billingPhone"
              value={formData.billingPhone}
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded py-1.5 px-3.5 w-full"
              type="number"
              placeholder="Mobile Number"
            />
          </div>
        )}
      </div>

      {/* Right side - Payment Information */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          
          {/* Payment Methods */}
          <div className="flex gap-3 flex-col mt-4">
            {/* PayPal payment */}
            <div
              onClick={() => handleMethodChange("manual", "paypal")}
              className="flex items-center gap-3 border dark:border-gray-600 p-2 px-3 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors dark:bg-gray-700"
            >
              <p
                className={`min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full ${
                  method === "manual" &&
                  formData.manualPaymentDetails.paymentType === "paypal"
                    ? "bg-green-500"
                    : ""
                }`}
              ></p>
              <p className="dark:text-gray-200">PayPal</p>
            </div>

            {/* Credit/Debit Card payment */}
            <div
              onClick={() => handleMethodChange("manual", "credit_card")}
              className="flex items-center gap-3 border dark:border-gray-600 p-2 px-3 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors dark:bg-gray-700"
            >
              <p
                className={`min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full ${
                  method === "manual" &&
                  ["credit_card", "debit_card"].includes(
                    formData.manualPaymentDetails.paymentType
                  )
                    ? "bg-green-500"
                    : ""
                }`}
              ></p>
              <p className="dark:text-gray-200">Credit/Debit Card</p>
            </div>

            {/* Crypto payment */}
            <div
              onClick={() => handleMethodChange("manual", "crypto")}
              className="flex items-center gap-3 border dark:border-gray-600 p-2 px-3 cursor-pointer hover:border-green-500 dark:hover:border-green-500 transition-colors dark:bg-gray-700"
            >
              <p
                className={`min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full ${
                  method === "manual" &&
                  formData.manualPaymentDetails.paymentType === "crypto"
                    ? "bg-green-500"
                    : ""
                }`}
              ></p>
              <p className="dark:text-gray-200">Crypto</p>
            </div>

            {/* COD payment (disabled) */}
            <div className="flex items-center gap-3 border dark:border-gray-700 p-2 px-3 cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-600">
              <p className="min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full"></p>
              <p className="dark:text-gray-200">Cash On Delivery</p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (Coming Soon)
              </span>
            </div>
            {/* Razorpay payment (disabled) */}
            <div className="flex items-center gap-3 border dark:border-gray-700 p-2 px-3 cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-600">
              <p className="min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full"></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay (Currently Unavailable)"
              />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (Coming Soon)
              </span>
            </div>

            {/* Stripe payment (disabled) */}
            <div className="flex items-center gap-3 border dark:border-gray-700 p-2 px-3 cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-600">
              <p className="min-w-3.5 h-3.5 border dark:border-gray-500 rounded-full"></p>
              <div className="flex items-center gap-2">
                <img
                  className="h-5 mx-4 grayscale"
                  src={assets.stripe_logo}
                  alt="Stripe (Currently Unavailable)"
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  (Coming Soon)
                </span>
              </div>
            </div>
          </div>

          {/* Manual Payment Form */}
          {method === "manual" && (
            <div className="mt-6 border dark:border-gray-600 p-4 rounded dark:bg-gray-700">
              <h3 className="text-lg font-medium mb-4 dark:text-gray-200">
                Payment Details
              </h3>

              {/* PayPal Email Form */}
              {formData.manualPaymentDetails?.paymentType === "paypal" && (
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    PayPal Email
                  </label>
                  <input
                    type="email"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        manualPaymentDetails: {
                          ...prev.manualPaymentDetails,
                          paypalEmail: e.target.value,
                        },
                      }))
                    }
                    className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                    placeholder="PayPal Email Address"
                  />
                </div>
              )}

              {/* Card Details Form */}
              {formData.manualPaymentDetails?.paymentType &&
                ["credit_card", "debit_card"].includes(
                  formData.manualPaymentDetails.paymentType
                ) && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Payment Type
                      </label>
                      <select
                        required
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manualPaymentDetails: {
                              ...prev.manualPaymentDetails,
                              paymentType: e.target.value,
                            },
                          }))
                        }
                        className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">Select Payment Type</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="debit_card">Debit Card</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Card Number
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manualPaymentDetails: {
                              ...prev.manualPaymentDetails,
                              cardNumber: e.target.value,
                            },
                          }))
                        }
                        className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                        placeholder="Card Number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manualPaymentDetails: {
                              ...prev.manualPaymentDetails,
                              cardHolderName: e.target.value,
                            },
                          }))
                        }
                        className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                        placeholder="Card Holder Name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              manualPaymentDetails: {
                                ...prev.manualPaymentDetails,
                                expiryDate: e.target.value,
                              },
                            }))
                          }
                          className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                          CVV
                        </label>
                        <input
                          type="text"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              manualPaymentDetails: {
                                ...prev.manualPaymentDetails,
                                cvv: e.target.value,
                              },
                            }))
                          }
                          className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                          placeholder="CVV"
                        />
                      </div>
                    </div>
                  </div>
                )}

              {/* Crypto Payment Form */}
              {/* {formData.manualPaymentDetails?.paymentType === "crypto" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Send payment to this wallet address:
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={cryptoWalletAddress}
                        readOnly
                        className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={copyWalletAddress}
                        className="bg-gray-200 dark:bg-gray-600 px-4 py-2 ml-2 rounded"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      After sending payment, please enter your transaction ID
                      below
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Your Transaction ID (Not Required)
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          manualPaymentDetails: {
                            ...prev.manualPaymentDetails,
                            cryptoTransactionId: e.target.value,
                          },
                        }))
                      }
                      className="w-full border dark:border-gray-600 rounded py-2 px-3 dark:bg-gray-800 dark:text-white"
                      placeholder="Enter transaction ID Not Required"
                    />
                  </div>
                </div>
              )} */}

            </div>
          )}

          <div className="text-center my-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Already have an account? Login instead
            </button>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white dark:bg-[#02ADEE] dark:text-gray-800 px-16 py-3 text-sm hover:bg-gray-800 dark:hover:bg-yellow-500 disabled:opacity-70"
            >
              {isLoading ? "PROCESSING..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default GuestCheckout; 