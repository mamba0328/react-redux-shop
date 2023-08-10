import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
    const additionalClass = props.additionalClass ? props.additionalClass : "";
    const deckImg = props.deckImg;
    const imageIsLoaded = props.imageIsLoaded ?? function () { }
    const { name, price, code, } = props.product;
    const navigate = useNavigate();

    const fullImageURL = `./png/${code}_full.png`;
    const deckImgURL = `./png/${code}_deck.png`;
    const imgURL = deckImg ? deckImgURL : fullImageURL;

    const handleClick = (code) => {
        navigate('/product/' + code, { replace: true });
    }
    return (
        <li className={'product' + ' ' + additionalClass} onClick={() => handleClick(code)}>
            <div className='product__img-container'>
                <img src={imgURL} onLoad={() => imageIsLoaded(imgURL)} className='product__img product__img_shadow shadow' alt='product img' />
                <img src={imgURL} onLoad={() => imageIsLoaded(imgURL + '2')} className='product__img' alt='product img' />

            </div>
            <div className='product__info'>
                <h4 className='product__name'>{name}</h4>
                <div className='product__rating rating'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </div>
                <h4 className='product__price'>{'₴' + price.split(' ').join(',')}</h4>
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