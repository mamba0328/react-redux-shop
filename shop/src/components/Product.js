import Button from './Buttons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
    const additionalClass = props.additionalClass ? props.additionalClass : "";
    const deckImg = props.deckImg;
    const { name, price, img, imgShort, code, color } = props.product;
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate('/product/' + code, { replace: true });
    }
    return (
        <li className={'product' + ' ' + additionalClass} onClick={() => handleClick(code)}>
            <div className='product__img-container'>
                <img src={deckImg ? imgShort : img} className='product__img' alt='product img' />
                <img src={deckImg ? imgShort : img} className='product__img product__img_shadow shadow' alt='product img' />

            </div>
            <div className='product__info'>
                {/* <div className='flex-row'>
                    <p className='product__code'>{code}</p>
                    <button className='product__favorite' onClick={(e) => props.toggleFavorite(code, e)}>
                        <FontAwesomeIcon icon={faStar} className={props.isFavorite ? 'product__star checked' : 'product__star'} />
                    </button>
                </div> */}
                <h4 className='product__name'>{name}</h4>
                {/* <p className='product__color'>{color}</p> */}
                <div className='product__rating rating'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <h4 className='product__price'>{'₴' + price.split(' ').join(',')}</h4>

                {/* {props.xButton ? <button className='xButton' data-testid='closeBtn' onClick={(e) => props.removeFromCart(code, e)}></button> : props.inCart ? <Button text='In cart' backgroundColor='#e74c3c' /> : <Button text='Add to cart' backgroundColor='#262626' onClick={(e) => props.addToCart(code, e)} />} */}
            </div>
        </li>
    )
}


Product.propTypes = {
    product: PropTypes.object.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func,
    inCart: PropTypes.bool,
    xButton: PropTypes.bool,
}

Product.defaultProps = {
    isFavorite: false,
    inCart: false,
    xButton: false,
    removeFromCart: () => console.log('can`t remove')
}

export default Product