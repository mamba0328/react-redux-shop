import Product from "./Product"
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import setCart from '../redux/actions/setCart';
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { NumberFormik } from "./NumberFormic";
import {
    getDatabase, update, ref, get, child
} from "firebase/database";
import { setHistory } from "../redux/actions/setHistory";


const Cart = (props) => {
    const { products, favorite, toggleFavorite, addToCart, removeFromCart, writeUserCart } = props;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.rootReducer.cart);
    const user = useSelector(state => state.rootReducer.user);
    const userInfo = useSelector(state => state.rootReducer.userInfo);
    const history = useSelector(state => state.rootReducer.history);

    let productsInCart = getInCart();

    function getInCart() {
        if (cart.length === 0) return []
        const inCart = products.filter(product => cart.includes(product.code));
        return inCart
    }

    function writeUserHistory(history) {
        if (!user) return
        const db = getDatabase();
        return update(ref(db, 'users/' + user.uid), {
            history,
        }).catch((error) => console.log(error))
    }

    function showProducts(products) {
        if (products.length === 0 || !products) return

        return products.map(product => {
            const isFavorite = favorite.includes(product.code) ? true : false;

            return <Product product={product} key={product.code} toggleFavorite={toggleFavorite} isFavorite={isFavorite} addToCart={addToCart} removeFromCart={removeFromCart} inCart={true} xButton={true} />
        });
    }

    async function checkout(values) {
        try {
            const purchaseDetails = {
                products: cart,
                total: productsInCart.reduce((a, b) => a + +b.price.split(' ').join(''), 0),
                time: Date.now(),
            }
            const newHistory = history.concat(purchaseDetails);
            writeUserHistory(newHistory);
            dispatch(setHistory(newHistory));

            writeUserCart([]);
            dispatch(setCart([]));
        } catch (e) {
            alert(e)
        }
    }

    const yupValidate = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        tel: Yup.string()
            .matches(/^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{2}[- ]\d{2}?$/, 'Invalid format')
            .required('Required'),
        adress: Yup.string()
            .max(50, 'Must be 50 characters or less')
            .matches(/[A-Za-z0-9'\.\-\s\,]/, 'Invalid adress format')
            .required('Required'),
    })

    return (
        productsInCart.length === 0 ? <h2 className="empty">Cart is empty</h2> :
            <div className="cart">
                <ul className="cart__list">
                    {showProducts(productsInCart)}
                </ul>

                <Formik
                    initialValues={{
                        firstName: [...user.displayName.split(' ')][0] || '',
                        lastName: [...user.displayName.split(' ')][1] || '',
                        age: '',
                        tel: userInfo.tel || '',
                        adress: userInfo.adress || '',
                    }}

                    onSubmit={checkout}
                    validationSchema={yupValidate}
                >
                    <Form className="form">
                        <div className='form__field'>
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" placeholder="Jane" className='input' />
                            <ErrorMessage name="firstName" component="div" className="error" />
                        </div>
                        <div className='form__field'>
                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" placeholder="Doe" className='input' />
                            <ErrorMessage name="lastName" component="div" className="error" />
                        </div>
                        <div className='form__field'>
                            <label htmlFor="age">Age</label>
                            <Field
                                id="age"
                                name="age"
                                placeholder=""
                                className='input'
                                type="number"
                            />
                        </div>
                        <NumberFormik id="tel" name="tel" type={'tel'} label={'Contact number'} nameClass='form__field' />
                        <div className='form__field form__field_adress'>
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
                        <div className='form__field form__field_submit'>
                            <p>Total: {productsInCart.reduce((a, b) => a + +b.price.split(' ').join(''), 0)} UAH</p>
                            <button type="submit">Checkout</button>
                        </div>

                    </Form>
                </Formik>
            </div>
    )
}

Cart.propTypes = {
    products: PropTypes.array.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    favorite: PropTypes.array,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    cart: PropTypes.array,
}

Cart.defaultProps = {
    favorite: [],
    cart: [],
}

export default Cart