import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { reviewsConfig } from '../../pages/Home/configs';
import Comment from '../Comment/Comment';

const Footer = () => {

  function renderReviewsContent() { 
      return reviewsConfig.map((review, index) => { 
          const { author, title, content, customStyle = '' } = review;
          return <Comment author={author} title={title} content={content} customStyle={customStyle} key={index}/>
      })
  }
  
  return (
    <section className='section section__footer footer'>
        <h2 className='footer__title'>Play your best solo</h2>
        <h2 className='footer__title'>on guitar of your dream!</h2>
        <p className='footer__slogan'>
              At our guitar shop, customer satisfaction is our top priority. We take pride in offering a carefully curated selection of high-quality guitars at the most affordable prices. Our commitment to providing exceptional value ensures that every musician can find their perfect instrument without breaking the bank.
        </p>
          
        <section className='section section_feedback'>
                {renderReviewsContent()}
        </section>

        <hr className='footer__horizontal'/>
        
        <div className='footer__row'>
              <h4 className='footer__logo logo'>The Guitars</h4>
              <p className='footer__copyrights'>© 2022. TheGuitars. All rights reserved.</p>
              <nav className='footer__socials socials'>
                  <ul className='socials__menu'>
                      <li className='socials__item'>
                          <a className='socials__link socials__instagram' href='/#'><FontAwesomeIcon className={`socials__icon icon`} icon={faInstagram} /></a>
                      </li>
                      <li className='socials__item'>
                          <a className='socials__link socials__twitter' href='/#'><FontAwesomeIcon className={`socials__icon icon`} icon={faTwitter}/></a>
                      </li>
                      <li className='socials__item'>
                          <a className='socials__link socials__youtube' href='/#'><FontAwesomeIcon className={`socials__icon icon`} icon={faYoutube} /></a>
                      </li>
                  </ul>
              </nav>
        </div>
    </section>
  )
}

export default Footer