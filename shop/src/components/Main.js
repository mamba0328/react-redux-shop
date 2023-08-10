import { Header } from './Header';
import Button from './Buttons';
import Modal from './Modal';
import Home from './Home';
import Cart from './Cart';
import { SignupForm } from './SignupForm';
import { PersonalCabinet } from './PersonalCabinet'
import { Loader } from './Loader';

import { ProductPage } from './ProductPage';
import { modalContent } from '../modalContent';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import showConfirmModal from '../redux/actions/showConfirmModal';
import showDeleteModal from '../redux/actions/showDeleteModal';
import setProducts from '../redux/actions/setProducts';
import { pend, unpend } from '../redux/actions/pendingProductActions';
import addAsset from '../redux/actions/assets';
import setFavorite from '../redux/actions/setFavorite';
import setCart from '../redux/actions/setCart';
import { toggleLoader } from '../redux/actions/toggleLoader';
import { setHistory } from '../redux/actions/setHistory';
import { setUserInfo } from '../redux/actions/setUserInfo';

const Main = () => {
    const [allAssetsLoaded, setAllAssetsLoaded] = useState(false);

    const dispatch = useDispatch();
    const confirmModal = useSelector(state => state.rootReducer.confirmModal);
    const deleteModal = useSelector(state => state.rootReducer.deleteModal);
    const products = useSelector(state => state.rootReducer.products);
    const pendingProduct = useSelector(state => state.rootReducer.pendingProduct);
    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const user = useSelector(state => state.rootReducer.user);
    const loader = useSelector(state => state.rootReducer.loader);
    const assets = useSelector(state => state.rootReducer.assets);

    function toggleDeleteModal() {
        return dispatch(showDeleteModal())
    }

    function toggleConfirmModal() {
        return dispatch(showConfirmModal())
    }

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

    // function writeUserCart(cart) {
    //     if (!user) return
    //     const db = getDatabase();
    //     return update(ref(db, 'users/' + user.uid), {
    //         cart,
    //     }).catch((error) => console.log(error))
    // }

    // function writeUserFavorite(favorite) {
    //     if (!user) return
    //     const db = getDatabase();
    //     return update(ref(db, 'users/' + user.uid), {
    //         favorite,
    //     }).catch((error) => console.log(error))
    // }

    function addToCart(productCode, e) {
        e.stopPropagation();
        dispatch(pend(productCode));
        toggleConfirmModal();
    }

    function comfirmAddToCart() {
        // writeUserCart([...cart, pendingProduct]);
        dispatch(setCart([...cart, pendingProduct]));
        dispatch(unpend());
        toggleConfirmModal();
    }

    function removeFromCart(productCode, e) {
        e.stopPropagation();
        dispatch(pend(productCode));
        toggleDeleteModal();
    }

    function confirmRemoveFromCart() {
        dispatch(setCart(cart.filter(product => product !== pendingProduct)))
        dispatch(unpend());
        toggleDeleteModal();
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

    async function imageIsLoaded() { //redux required
        await dispatch(addAsset());
        // return imgsLeft === 0 ? setAllImgsAreLoaded(true) : false;
    }

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
        if (assets >= products.length * 2 && products.length > 0) {
            dispatch(toggleLoader())
        }
    }, [assets, products])

    useEffect(() => {
        products.length > 0 && dispatch(toggleLoader())
    }, [products])


    modalContent.deleteModal.actions = [<Button backgroundColor={'#0001'} text={'Ok'} onClick={confirmRemoveFromCart} key={Date.now()} />, <Button backgroundColor={'#0001 '} text={'Cancel'} onClick={toggleDeleteModal} key={Date.now() + 1} />];
    modalContent.confrimModal.actions = [<Button backgroundColor={'#0001'} text={'Confirm'} onClick={comfirmAddToCart} key={Date.now()} />, <Button backgroundColor={'#0001 '} text={'Cancel'} onClick={toggleConfirmModal} key={Date.now() + 1} />];

    return (
        <Router>
            <div className='app'>
                <Header />
                <main className='main'>
                    {
                        loader ? <Loader /> :
                            <div className='container'>
                                <Routes >
                                    <Route path="/" element={<Home products={products} toggleFavorite={toggleFavorite} favorite={favorite} addToCart={addToCart} removeFromCart={removeFromCart} cart={cart} imageIsLoaded={imageIsLoaded} />} />
                                    <Route path='/cart' element={<Cart products={products} toggleFavorite={toggleFavorite} favorite={favorite} addToCart={addToCart} removeFromCart={removeFromCart} writeUserCart={null} cart={cart} />} />
                                    <Route path='/personal' element={<PersonalCabinet toggleFavorite={toggleFavorite} addToCart={addToCart} cart={cart} />} />
                                    <Route path="/product/:id" element={<ProductPage addToCart={addToCart} toggleFavorite={toggleFavorite} cart={cart} />} />
                                    {/* <Route path='/signup' element={<SignupForm />} /> */}
                                </Routes >
                            </div>
                    }

                </main>
                {deleteModal ? <Modal header={modalContent.deleteModal.header} closeButton={modalContent.deleteModal.closeButton} text={modalContent.deleteModal.text} actions={modalContent.deleteModal.actions} backgroundColor={modalContent.deleteModal.backgroundColor} onClick={toggleDeleteModal} /> : false}
                {confirmModal ? <Modal header={modalContent.confrimModal.header} closeButton={modalContent.confrimModal.closeButton} text={modalContent.confrimModal.text} pendingProduct={pendingProduct} actions={modalContent.confrimModal.actions} backgroundColor={modalContent.confrimModal.backgroundColor} onClick={toggleConfirmModal} /> : false}
            </div>
        </Router>
    );
}

export default Main;

