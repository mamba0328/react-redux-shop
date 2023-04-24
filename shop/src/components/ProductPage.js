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
    const { name, price, img, imgShort, code, color } = theProduct ? theProduct : {};
    const { addToCart, toggleFavorite } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const returnToHome = () => { // if u reload page with dynamic url - there is no products to show
        navigate('/', { replace: true });
        document.location.reload();
    }
    const shortName = `${name?.split(' ')[0]} ${name?.split(' ')[1]} ${name?.split(' ')[2]}`;
    useEffect(() => {
        if (products.length === 0) returnToHome();
    }, [])

    return (
        <div className='product-page'>
            <div className='product-page__product'>
                <div className='product-page__info'>
                    <h2 className='product-page__name'>{shortName}</h2>
                    <div className='product-page__rating rating'>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    <ul className='product-page__features'>
                        <li className='product-page__feature feature'>
                            <h4 className='feature__name'>Custom <br /> Alnico III</h4>
                            <p className='feature__desc desc'>Pickups</p>
                        </li>
                        <li className='product-page__feature feature'>
                            <h4 className='feature__name'>Chuncky <br />  C-Shape</h4>
                            <p className='feature__desc desc'>Neck Profile</p>
                        </li>
                        <li className='product-page__feature feature'>
                            <h4 className='feature__name'>22 <br /> Frets</h4>
                            <p className='feature__desc desc'>Medium-Jumbo</p>
                        </li>
                    </ul>
                </div>
                <div className='product-page__img-wrapper'>
                    <div className='filter'>
                        <img src={imgShort} className='product-page__img' alt='product img' />
                        <img src={imgShort} className='product-page__img shadow' alt='product img' />
                    </div>

                </div>
                <div className='product-page__about'>
                    <h3 className='product-page__name'>{name}</h3>
                    <p className='product-page__desc desc'>
                        Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl
                    </p>
                </div>
            </div>
            <div className='product-page__checkout'>
                <h3>{price + ' UAH'}</h3>
                <button className='product-page__favorite' onClick={(e) => toggleFavorite(code, e)}>
                    <FontAwesomeIcon icon={faStar} className={isFavorite ? 'product-page__star checked' : 'product-page__star'} />
                </button>
                {inCart ? <Button text='In cart' backgroundColor='#e74c3c' /> : <Button text='Add to cart' backgroundColor='#f5b642' onClick={(e) => addToCart(code, e)} />}
            </div>

        </div>
    )
}

{/* <div className='product-page__name'>
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
                    <button className='product-page__favorite' onClick={(e) => toggleFavorite(code, e)}>
                        <FontAwesomeIcon icon={faStar} className={isFavorite ? 'product-page__star checked' : 'product-page__star'} />
                    </button>
                </div>

            </div> */}