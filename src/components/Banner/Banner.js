import React from 'react'

export default function Banner(props) {
  const { title, content, customBannerClassName = '', } = props;


  return (
    <div className={`banner ${customBannerClassName}`}>
      <h2 className='banner__title'>{title}</h2>
      <p className='banner__content ad-title'>{content}</p>
      <div className='banner__background'/>
    </div>
  )
}
