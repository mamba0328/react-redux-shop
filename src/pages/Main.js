import { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import setProducts from '../redux/actions/setProducts';
import setFavorite from '../redux/actions/setFavorite';
import setCart from '../redux/actions/setCart';
import { toggleLoader } from '../redux/actions/toggleLoader';

import Header from '../components/Header';
import Loader from '../components/Loader';
import Footer from '../components/Footer/Footer';
import Home from './Home';
import Cart from './Cart';
import PersonalCabinet from './PersonalCabinet'
import ProductPage from './ProductPage';


const Main = () => {
    const dispatch = useDispatch();

    const products = useSelector(state => state.rootReducer.products);

    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const user = useSelector(state => state.rootReducer.user);
    const loader = useSelector(state => state.rootReducer.loader);

    function toggleFavorite(productCode, e) {
        e.stopPropagation();
        if (favorite.includes(productCode) && favorite.length > 0) {
            dispatch(setFavorite(favorite.filter(code => code !== productCode)));
        } else {
            dispatch(setFavorite([...favorite, productCode]));
        }
    }

    function addToCart(productCode, e) {
        e.stopPropagation();
        dispatch(setCart([...cart, productCode]));
    }

    function removeFromCart(productCode, e) {
        e.stopPropagation();
        dispatch(setCart(cart.filter(product => product !== productCode)))
    }

    useEffect(() => {
        dispatch(setProducts());
        products.length > 0 && dispatch(toggleLoader())
    }, [])

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user])


    useEffect(() => {
        products.length > 0 && dispatch(toggleLoader())
    }, [products])

    return (
        <Router>
            <div className='app'>
                <Header />
                <main className='main'>
                    {
                        loader ? <Loader /> :
                            <div className='container'>
                                <Routes >
                                    <Route path="/" element={<Home products={products} toggleFavorite={toggleFavorite} favorite={favorite} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />} />
                                    <Route path='/cart' element={<Cart products={products} toggleFavorite={toggleFavorite} favorite={favorite} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} />} />
                                    <Route path='/personal' element={<PersonalCabinet toggleFavorite={toggleFavorite} addToCart={addToCart} cart={cart} />} />
                                    <Route path="/product/:id" element={<ProductPage addToCart={addToCart} toggleFavorite={toggleFavorite} cart={cart} />} />
                                </Routes >
                            </div>
                    }
                <Footer/>
                </main>
            </div>
        </Router>
    );
}

export default Main;

