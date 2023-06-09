import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
export const Header = () => {
    const user = useSelector(state => state.rootReducer.user);
    const cart = useSelector(state => state.rootReducer.cart);
    const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';

    return (
        <header className='header'>
            <div className='container'>
                <nav className='nav'>
                    <ul className='menu menu_icons'>
                        <li className='menu__item'>
                            <Link to={'/personal'} className='menu__link'>
                                <img src={user ? user.photoURL || fallbackImg : fallbackImg} alt='person' className='icon icon__round' />
                            </Link>
                        </li>

                        <li className='menu__item '>
                            <Link to='/' className='menu__link menu__link_logo'><h4 className='logo'>The Guitars</h4></Link>
                        </li>

                        <li className='menu__item'>
                            <Link to='/cart' className='menu__link'>
                                {cart.length === 0 ? null : <div className='counter'><p className='counter__number'>{cart.length}</p></div>}
                                <FontAwesomeIcon icon={faBagShopping} className='icon' alt='cart' />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
