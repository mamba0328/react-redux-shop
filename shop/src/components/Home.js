import Product from './Product'
import PropTypes from 'prop-types';

const Home = (props) => {
    const { products, favorite, cart, toggleFavorite, addToCart, removeFromCart } = props;

    function showProducts(products) {
        if (!products) return

        return products.map(product => {
            const isFavorite = favorite.includes(product.code) ? true : false;
            const inCart = cart.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToCart={addToCart} removeFromCart={removeFromCart} inCart={inCart} />
        });
    }

    return (
        <ul className='product-list'>
            {showProducts(products)}
        </ul>
    )
}

Home.propTypes = {
    products: PropTypes.array.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorite: PropTypes.array,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cart: PropTypes.array,
}

Home.defaultProps = {
    favorite: [],
    cart: [],
}

export default Home