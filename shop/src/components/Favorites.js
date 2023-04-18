import Product from "./Product"
import PropTypes from 'prop-types';

const Favorites = (props) => {
    const { products, favorite, cart, toggleFavorite, addToCart, removeFromCart } = props;

    const getFavorites = () => {
        if (favorite.length === 0) return []
        const favorites = products.filter(product => favorite.includes(product.code));
        return favorites
    }

    function showProducts(products) {
        if (products.length === 0 || !products) return <h2 className="empty">No favorites yet</h2>

        return products.map(product => {
            const inCart = cart.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={true} addToCart={addToCart} removeFromCart={removeFromCart} inCart={inCart} />
        });
    }
    return (
        <ul className="product-list product-list_fav">
            {showProducts(getFavorites(props))}
        </ul>
    )
}

Favorites.propTypes = {
    products: PropTypes.array.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorite: PropTypes.array,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cart: PropTypes.array,
}

Favorites.defaultProps = {
    favorite: [],
    cart: [],
}

export default Favorites