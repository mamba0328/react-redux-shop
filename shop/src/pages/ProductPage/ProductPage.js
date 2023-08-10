import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { getSingleProduct } from '../../api/getSingleProduct';

import Button from '../../components/Button';



const ProductPage = (props) => {
    const [productData, setProductData] = useState({});
    const [loaded, setLoaded] = useState(false);

    const { id } = useParams();
    const favorite = useSelector(state => state.rootReducer.favorite);
    const cart = useSelector(state => state.rootReducer.cart);
    const isFavorite = favorite.includes(id)
    const inCart = cart.includes(id)
    const { name, price, code, } = productData ? productData : {};
    const { addToCart, toggleFavorite } = props;
    const deckImg = `/png/${code ?? 227546}_deck.png`;


    const shortName = `${name?.split(' ')[0]} ${name?.split(' ')[1]} ${name?.split(' ')[2]}`;

    const getProductData = async () => {
        const productData = await getSingleProduct(id);
        setProductData(productData);
    }

    useEffect(() => {
        getProductData();
    }, [])

    useEffect(() => {
        if (Object.keys(productData).length) {
            setLoaded(true);
        }
    }, [productData])


    const renderPage = () => {
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
                            <img src={deckImg} className='product-page__img' alt='product img' />
                            <img src={deckImg} className='product-page__img shadow' alt='product img' />
                        </div>
                    </div>
                    <div className='product-page__about'>
                        <div className='product-page__checkout'>
                            <h3>{price + ' UAH'}</h3>
                            <button className='product-page__favorite' onClick={(e) => toggleFavorite(code, e)}>
                                <FontAwesomeIcon icon={faStar} className={isFavorite ? 'product-page__star checked' : 'product-page__star'} />
                            </button>
                            {inCart ? <Button text='In cart' backgroundColor='#e74c3c' /> : <Button text='Add to cart' backgroundColor='#f5b642' onClick={(e) => addToCart(code, e)} />}
                        </div>
                        <h3 className='product-page__name'>{name}</h3>
                        <p className='product-page__desc desc'>
                            Commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {loaded && renderPage()}
        </>

    )
}

export default ProductPage