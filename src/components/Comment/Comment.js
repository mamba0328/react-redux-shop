import React from 'react'
import PropTypes from'prop-types'


const Comment = (props) => {
    const { img, title, content, author, customStyle } = props;
    return (
        <div className={`comment ${customStyle}`}>
            <img src={img} className='comment__img' alt='reviewer'/>
            <h2 className='comment__title'>{`"${title}"`}</h2>
            <h4 className='comment__author'>{author}</h4>
            <p className='comment__content'>{content}</p>
        </div>
    )
}


Comment.defaultProps = {
    img: './png/icons/anonim-user.png',
    customStyle: '',
  }
  
  Comment.propTypes = {
    img:PropTypes.string,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    customStyle: PropTypes.string,
}
  
export default Comment