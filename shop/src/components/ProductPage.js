import React, { useEffect } from 'react'
import Button from './Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebase/firebaseApp';
import { authenticate } from '../redux/actions/authUser';

export const ProductPage = (props) => {
    const { id } = useParams();
    const products = useSelector(state => state.rootReducer.products);
    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const isFavorite = favorite.includes(id)
    const inCart = cart.includes(id)
    const [theProduct] = products.filter(product => product.code === id);
    const { name, price, img, code, color } = theProduct ? theProduct : {};
    const { addToCart, toggleFavorite } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const returnToHome = () => { // if u reload page with dynamic url - there is no products to show
        navigate('/', { replace: true });
        document.location.reload();
    }

    useEffect(() => {
        if (products.length === 0) returnToHome();
    }, [])

    return (
        <div className='product-page'>
            <div className='product-page__name'>
                <h3>{name}<span>{' ' + color}</span></h3>
                <p className='product-page__code'>{'Code: ' + code}</p>
            </div>
            <div className='product-page__img-wrapper'>
                <img src={img} className='product-page__img' alt='product img' />
            </div>
            <div className='product-page__more'>
                <div className='product-page__actions'>
                    <h3>{price + ' UAH'}</h3>
                    {inCart ? <Button text='In cart' backgroundColor='#e74c3c' /> : <Button text='Add to cart' backgroundColor='#262626' onClick={(e) => addToCart(code, e)} />}
                    <button className='product__favorite' onClick={(e) => toggleFavorite(code, e)}>
                        <FontAwesomeIcon icon={faStar} className={isFavorite ? 'product__star checked' : 'product__star'} />
                    </button>
                </div>
                <div className='product-page__desc'>
                    <h3 className='title'>Description</h3>
                    <p className='text'>
                        Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas
                    </p>
                </div>
            </div>
        </div>
    )
}
