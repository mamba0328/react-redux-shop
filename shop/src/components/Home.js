import Product from './Product'
import PropTypes from 'prop-types';

const Home = (props) => {
    const { products, favorite, cart, toggleFavorite, addToCart, removeFromCart } = props;

    const randomProducts = takeRandomProducts(5, products);

    function takeRandomProducts(numOfProds, arr) {
        if (numOfProds === arr.length) return arr;
        if (arr.length === 0) return [];
        const copy = [...arr];
        const randomProds = [];
        while (numOfProds) {
            const randomIndex = Math.floor(Math.random() * copy.length);
            randomProds.push(...copy.splice(randomIndex, 1));
            numOfProds--
        }
        return randomProds
    }

    function showProducts(products, additionalClass, deckImg) {
        if (!products) return

        return products.map(product => {
            const isFavorite = favorite.includes(product.code) ? true : false;
            const inCart = cart.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToCart={addToCart} removeFromCart={removeFromCart} inCart={inCart} deckImg={deckImg} additionalClass={additionalClass} />
        });
    }

    return (
        <div className='home'>
            <section className='section section__electric'>
                <h2 className='title'>Electric Guitars</h2>
                <ul className='product-list'>
                    {showProducts(products)}
                </ul>
            </section>
            <section className='section section__best-sellers'>
                <h2 className='title'>Best sellers</h2>
                <ul className='product-list product-list_column'>
                    {showProducts(randomProducts, 'product_horizontal', true)}
                </ul>
            </section>
        </div>

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