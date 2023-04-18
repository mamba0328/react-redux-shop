import React from 'react'
import Product from './Product'

import { useSelector } from 'react-redux'
import { SigninForm } from './SigninForm'
import history from '../redux/reducers/historyReducer'


export const PersonalCabinet = (props) => {
    const user = useSelector(state => state.rootReducer.user);
    const products = useSelector(state => state.rootReducer.products);
    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const history = useSelector(state => state.rootReducer.history);
    const { number, email, adress } = {};
    const favorites = getFavorites();
    const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';
    const exitImg = 'https://cdn-icons-png.flaticon.com/512/1286/1286853.png';
    const { toggleFavorite, addToCart } = props;

    function getFavorites() {
        if (favorite.length === 0) return []
        const favorites = products.filter(product => favorite.includes(product.code));
        return favorites
    }

    function showProducts(products) {
        if (products.length === 0 || !products) return <li className="empty">No favorites yet</li>

        return products.map(product => {
            const inCart = cart.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={true} addToCart={addToCart} inCart={inCart} />
        });
    }

    function showHistory() {
        if (history.length === 0) return <li><p>No purchases yet</p></li>
        return history.map(purchase => {
            const date = new Date(purchase.time)
            return <li><p>{date.toString()}</p><p>{purchase.total} UAH</p></li>
        })
    }

    function logout() {
        localStorage.removeItem('user');
        document.location.reload();
    }

    return (
        !user ? <SigninForm />
            :
            <div className='personal-cab'>
                <div className='personal-cab__profile'>
                    <div className='row'>
                        <div className='personal-cab__photo'>
                            <img src={user.photoURL ? user.photoURL : fallbackImg} alt='person' className='personal-cab__img' />
                        </div>
                        <h2 className='personal-cab__name'>
                            {user.displayName}
                        </h2>
                        <div className='personal-cab__exit' onClick={logout}>
                            <img src={exitImg} alt='exit' className='icon' />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Contact number</p>
                            <h2>{number ? number : 'No number provided'}</h2>
                        </div>
                        <div className='col'>
                            <p>Email</p>
                            <h2>{email ? email : 'No email provided'}</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <p>Adress</p>
                            <h2>{adress ? adress : 'No adress provided'}</h2>
                        </div>
                    </div>
                </div>
                <div className='personal-cab__history history'>
                    <h2 className='history__heading'>Purchase history</h2>
                    <ul className='personal-cab__list history__list'>
                        {showHistory()}
                    </ul>
                </div>

                <div className='personal-cav fav'>
                    <h2 className='fav__header'>Favorites</h2>
                    <ul className='personal-cab__list fav__list'>
                        {showProducts(favorites)}
                    </ul>
                </div>

            </div>
    )
}
