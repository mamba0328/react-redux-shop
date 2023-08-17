import React from "react";
import Slider from "react-slick";
import PropTypes from 'prop-types';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = (props) => {
  const { settings, sliderContent } = props;

  return (
    <Slider {...settings} className="slider">
        {sliderContent}
    </Slider>
  );
}

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  lazyLoad: true,
  arrows: false,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

SlickSlider.defaultProps = {
  settings,
  sliderContent: <div> 1 </div>
}

SlickSlider.propTypes = {
  settings: PropTypes.object,
  sliderContent: PropTypes.array.isRequired,
}

export default SlickSlider