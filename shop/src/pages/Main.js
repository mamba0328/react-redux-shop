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
import { setHistory } from '../redux/actions/setHistory';
import { setUserInfo } from '../redux/actions/setUserInfo';

import Header from '../components/Header';

import Loader from '../components/Loader';

import Home from './Home';
import Cart from './Cart';
import SignupForm from './SignupForm';
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
            // writeUserFavorite(favorite.filter(code => code !== productCode));
            dispatch(setFavorite(favorite.filter(code => code !== productCode)));
        } else {
            // writeUserFavorite([...favorite, productCode]);
            dispatch(setFavorite([...favorite, productCode]));
        }
    }

    function writeUserCart(cart) {
        localStorage.removeItem('cart')
    }

    // function writeUserFavorite(favorite) {
    //     if (!user) return
    //     const db = getDatabase();
    //     return update(ref(db, 'users/' + user.uid), {
    //         favorite,
    //     }).catch((error) => console.log(error))
    // }

    function addToCart(productCode, e) {
        e.stopPropagation();
        dispatch(setCart([...cart, productCode]));
        // toggleConfirmModal();
    }


    function removeFromCart(productCode, e) {
        e.stopPropagation();
        dispatch(setCart(cart.filter(product => product !== productCode)))
        // toggleDeleteModal();
    }

    // function getUserDate() {
    //     const dbRef = ref(getDatabase());
    //     return get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             const response = snapshot.val();
    //             dispatch(setCart(response.cart || []));
    //             dispatch(setFavorite(response.favorite || []));
    //             dispatch(setHistory(response.history || []));
    //             dispatch(setUserInfo(response.info || []));
    //         } else {
    //             console.log('no data available')
    //         }
    //     })
    // }

    useEffect(() => {
        dispatch(setProducts());
        if (user) {
            try {
                // getUserDate().then(() => dispatch(toggleLoader()))
            }
            catch (error) {
                console.log(error)
            }
        } else {
            products.length > 0 && dispatch(toggleLoader())
        }
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
                                    <Route path='/cart' element={<Cart products={products} toggleFavorite={toggleFavorite} favorite={favorite} addToCart={addToCart} removeFromCart={removeFromCart} writeUserCart={writeUserCart} cart={cart} />} />
                                    <Route path='/personal' element={<PersonalCabinet toggleFavorite={toggleFavorite} addToCart={addToCart} cart={cart} />} />
                                    <Route path="/product/:id" element={<ProductPage addToCart={addToCart} toggleFavorite={toggleFavorite} cart={cart} />} />
                                    {/* <Route path='/signup' element={<SignupForm />} /> */}
                                </Routes >
                            </div>
                    }

                </main>
            </div>
        </Router>
    );
}

export default Main;

