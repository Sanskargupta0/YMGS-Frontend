import { useContext } from 'react'
import PropTypes from 'prop-types'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id, image, name, price}) => {

    const {currency} = useContext(ShopContext);
  
    return (
        <Link className='text-gray-700 dark:text-gray-300 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium dark:text-white'>{currency}{price}</p>
        </Link>
    )
}

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
}

export default ProductItem
