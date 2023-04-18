import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
    const user = useSelector(state => state.rootReducer.user);
    const cart = useSelector(state => state.rootReducer.cart);
    const fallbackImg = 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png';

    return (
        <header className='header'>
            <div className='container'>
                <nav className='nav'>
                    <Link to='/'><img src='https://cdn-icons-png.flaticon.com/512/1946/1946488.png' alt='house' className='icon' /></Link>
                    <input type='text' className='nav__search' placeholder='Search'></input>
                    <ul className='menu menu_icons'>
                        <li className='menu__item'>
                            <Link to='/cart'>
                                {cart.length === 0 ? null : <div className='counter'><p className='counter__number'>{cart.length}</p></div>}
                                <img src='https://cdn-icons-png.flaticon.com/512/3144/3144456.png' className='icon' alt='cart' />
                            </Link>
                        </li>
                        <li className='menu__item'>
                            <Link to={'/personal'}>
                                <img src={user ? user.photoURL || fallbackImg : fallbackImg} alt='person' className='icon icon__round' />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
