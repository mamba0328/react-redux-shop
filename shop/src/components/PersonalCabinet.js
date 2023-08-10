import React, { useState } from 'react';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { SigninForm } from './SigninForm';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NumberFormik } from './NumberFormic';
import { setUserInfo } from '../redux/actions/setUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const PersonalCabinet = (props) => {
    const [showForm, setShowForm] = useState(false);
    const { toggleFavorite, addToCart } = props;

    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.rootReducer.userInfo);
    const { tel, email, adress } = userInfo;

    const user = useSelector(state => state.rootReducer.user);
    const products = useSelector(state => state.rootReducer.products);
    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const history = useSelector(state => state.rootReducer.history);

    const favorites = getFavorites();
    const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';
    const exitImg = 'https://cdn-icons-png.flaticon.com/512/1286/1286853.png';

    function getFavorites() {
        if (favorite.length === 0) return []
        const favorites = products.filter(product => favorite.includes(product.code));
        return favorites
    }

    function showProducts(products, additionalClass, deckImg) {
        if (products.length === 0 || !products) return <li className="empty">No favorites yet</li>
        return products.map(product => {
            const inCart = cart.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={true} addToCart={addToCart} inCart={inCart} deckImg={deckImg} additionalClass={additionalClass} />
        });
    }

    function returnProductsImg(purchaseProducts) {
        return purchaseProducts.map((code, i = 0) => {
            const product = products.find(product => product.code === code);
            if (product) return <img src={product.img} alt='product' className='history__img' key={Date.now() + i}></img>
            i++
        })
    }

    function showHistory() {
        if (history.length === 0) return <li><p>No purchases yet</p></li>
        return history.map(purchase => {
            const date = new Date(purchase.time);
            const formatedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            return <li key={purchase.time} className='history__elem'><div className='history__img-wrapper'>{returnProductsImg(purchase.products)}</div><p className='history__price'>{purchase.total} UAH</p><p className='history__date'>{formatedDate}</p></li>
        })
    }

    // function writeUserInfo(info) {
    //     if (!user) return
    //     const db = getDatabase();
    //     return update(ref(db, 'users/' + user.uid), {
    //         info,
    //     }).catch((error) => console.log(error))
    // }

    function logout() {
        localStorage.removeItem('user');
        document.location.reload();
    }

    const checkout = (values) => {
        // writeUserInfo(values);
        dispatch(setUserInfo(values));
        setShowForm(false);
    }

    const yupValidate = Yup.object({
        tel: Yup.string()
            .matches(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]\d{2}?$/, 'Invalid number format'),
        email: Yup.string()
            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email format'),
        adress: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .matches(/[A-Za-z0-9'\.\-\s\,]/, 'Invalid adress format'),
    });

    return (
        !user ? <SigninForm />
            :
            <div className='personal-cab'>
                <div className='personal-cab__profile profile'>
                    <div className='row'>
                        <div className='personal-cab__photo profile__photo'>
                            <img src={user.photoURL ? user.photoURL : fallbackImg} alt='person' className='profile__img' />
                        </div>
                        <h2 className='personal-cab__name profile__name'>
                            {user.displayName}
                        </h2>
                        <div className='personal-cab__exit profile__exit' onClick={logout}>
                            <FontAwesomeIcon icon={faRightFromBracket} className='icon icon_leave' />
                        </div>
                    </div>
                    {showForm ?
                        <Formik
                            initialValues={{
                                adress: adress || '',
                                email: email || user.email || '',
                                tel: tel || '',
                            }}

                            onSubmit={checkout}
                            validationSchema={yupValidate}
                        >
                            <Form className="profile__info">
                                <div className='row'>
                                    <NumberFormik id="tel" name="tel" type={'tel'} label={'Contact number'} nameClass='col' />
                                    <div className='col'>
                                        <label htmlFor="email">Email adress</label>
                                        <Field id="email" name="email" className='input' />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <label htmlFor="adress">Adress</label>
                                        <Field
                                            id="adress"
                                            name="adress"
                                            placeholder=""
                                            type="adress"
                                            className='input input_adress'
                                        />
                                        <ErrorMessage name="adress" component="div" className="error" />
                                    </div>
                                    <div className='col f-row'>
                                        <button className='okButton' type="submit"></button>
                                        <button className='xButton' type='button' onClick={() => setShowForm(false)}></button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                        :
                        <div className='profile__info'>
                            <div className='row'>
                                <div className='col'>
                                    <p>Contact number</p>
                                    <h2 class='profile__data' onClick={() => setShowForm(true)}>{tel ? tel : 'No number provided'}</h2>
                                </div>
                                <div className='col'>
                                    <p>Email</p>
                                    <h2 class='profile__data' onClick={() => setShowForm(true)}>{email ? email : user ? user.email : 'No email provided'}</h2>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <p>Adress</p>
                                    <h2 class='profile__data' onClick={() => setShowForm(true)}>{adress ? adress : 'No adress provided'}</h2>
                                </div>
                            </div>
                        </div>
                    }
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
                        {showProducts(favorites, 'product_horizontal', true)}
                    </ul>
                </div>

            </div>
    )
}
