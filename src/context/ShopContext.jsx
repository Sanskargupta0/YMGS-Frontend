import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import PropTypes from 'prop-types';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = '$';
    const delivery_fee = 35;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch]= useState(false);
    const [cartItems, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId, itemData) => {
        // Convert old format to new format if needed
        const cartData = typeof itemData === 'number' ? {
            quantity: itemData,
            selectedPrice: null,
            isPackage: false
        } : itemData;

        // Validate cart data
        if (!cartData || typeof cartData !== 'object') {
            console.error('Invalid cart data');
            return;
        }

        // Ensure quantity exists and is a number
        if (!cartData.quantity || isNaN(cartData.quantity)) {
            cartData.quantity = 1;
        }

        // Find the product to check for minimum order quantity
        const product = products.find(p => p._id === itemId);
        if (!product) {
            console.error('Product not found');
            return;
        }

        // Ensure quantity meets minimum order quantity if not a package
        if (!cartData.isPackage) {
            const minQuantity = product.minOrderQuantity || 1;
            if (cartData.quantity < minQuantity) {
                toast.error(`Minimum order quantity for this product is ${minQuantity}`);
                cartData.quantity = minQuantity;
            }
        }

        try {
            let newCartItems = structuredClone(cartItems);
            newCartItems[itemId] = cartData;
            setCartItem(newCartItems);
            toast.success('Item Added to Cart');

            if(token){
                await axios.post(backendUrl + '/api/cart/add', {
                    itemId, 
                    cartData
                }, {
                    headers: {token}
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(error.message || 'Error adding item to cart');
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        Object.values(cartItems).forEach(item => {
            if (!item) return;
            
            if (typeof item === 'object' && item.quantity > 0) {
                totalCount += item.quantity;
            } else if (typeof item === 'number' && item > 0) {
                totalCount += item;
            }
        });
        return totalCount;
    }

    const updateQuantity = async (itemId, itemData) => {
        try {
            // Convert old format to new format if needed
            const cartData = typeof itemData === 'number' ? {
                quantity: itemData,
                selectedPrice: null,
                isPackage: false
            } : itemData;

            // Validate cart data
            if (!cartData || typeof cartData !== 'object') {
                console.error('Invalid cart data');
                return;
            }

            // If quantity is 0 or invalid, remove from cart
            if (!cartData.quantity || cartData.quantity === 0) {
                let newCartItems = structuredClone(cartItems);
                delete newCartItems[itemId];
                setCartItem(newCartItems);

                if (token) {
                    await axios.post(backendUrl + '/api/cart/update', {
                        itemId, 
                        cartData: { quantity: 0 }
                    }, {
                        headers: {token}
                    });
                }
                return;
            }

            // Find the product to check for minimum order quantity
            const product = products.find(p => p._id === itemId);
            if (!product) {
                console.error('Product not found');
                return;
            }

            // Ensure quantity meets minimum order quantity if not a package
            if (!cartData.isPackage) {
                const minQuantity = product.minOrderQuantity || 1;
                if (cartData.quantity < minQuantity) {
                    toast.error(`Minimum order quantity for this product is ${minQuantity}`);
                    cartData.quantity = minQuantity;
                }
            }

            let newCartItems = structuredClone(cartItems);
            newCartItems[itemId] = cartData;
            setCartItem(newCartItems);

            if (token) {
                await axios.post(backendUrl + '/api/cart/update', {
                    itemId, 
                    cartData
                }, {
                    headers: {token}
                });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error(error.message || 'Error updating quantity');
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const itemId in cartItems){
            const item = cartItems[itemId];
            if (!item) continue;

            if (typeof item === 'object' && item.isPackage && item.selectedPrice) {
                // For package items, just add the package price (no multiplication)
                totalAmount += parseFloat(item.selectedPrice);
            } else {
                // For regular items, multiply price by quantity
                const quantity = typeof item === 'object' ? item.quantity : item;
                if (quantity <= 0) continue;

                const product = products.find((p) => p._id === itemId);
                const price = product ? parseFloat(product.price) : 0;
                totalAmount += price * quantity;
            }
        }
        return Math.round(totalAmount * 100) / 100; // Round to 2 decimal places
    }

    // Helper function to get individual item total
    const getItemTotal = (itemId) => {
        const item = cartItems[itemId];
        if (!item) return 0;

        if (typeof item === 'object' && item.isPackage && item.selectedPrice) {
            // For package items, return package price
            return parseFloat(item.selectedPrice);
        } else {
            // For regular items, multiply price by quantity
            const quantity = typeof item === 'object' ? item.quantity : item;
            const product = products.find((p) => p._id === itemId);
            const price = product ? parseFloat(product.price) : 0;
            return price * quantity;
        }
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
            if (response.data.success) {
                setCartItem(response.data.cartData);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getCartItems = () => {
        const items = [];
        for(const itemId in cartItems) {
            const item = cartItems[itemId];
            if (!item) continue;

            const product = products.find(p => p._id === itemId);
            if (!product) continue;

            const quantity = typeof item === 'object' ? item.quantity : item;
            if (quantity <= 0) continue;

            const price = typeof item === 'object' && item.selectedPrice 
                ? item.selectedPrice 
                : product.price;

            items.push({
                _id: itemId,
                name: product.name,
                price: price,
                image: product.image[0],
                quantity: quantity,
                isPackage: typeof item === 'object' ? item.isPackage : false
            });
        }
        return items;
    }

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItem,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, getCartItems, getItemTotal
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ShopContextProvider;

