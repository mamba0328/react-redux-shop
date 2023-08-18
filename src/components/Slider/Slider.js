import React from "react";
import { Carousel } from "react-responsive-carousel";
import PropTypes from 'prop-types';

import "react-responsive-carousel/lib/styles/carousel.min.css";

const SlickSlider = (props) => {
  const { sliderContent, showArrows, showStatus, showIndicators, showThumbs, autoPlay, infiniteLoop} = props;

  return (
      <Carousel
        showArrows={showArrows}
        showThumbs={showThumbs}
        showStatus={showStatus}
        showIndicators={showIndicators}
        autoPlay={autoPlay}
        infiniteLoop={infiniteLoop}
        className="slider">
            {sliderContent}
        </Carousel>
  );
}

SlickSlider.defaultProps = {
  infiniteLoop:true,
  autoPlay:true,
  showArrows: false,
  showStatus: false,
  showIndicators: true,
  showThumbs:false,
  sliderContent: <div> 1 </div>
}

SlickSlider.propTypes = {
  autoPlay:PropTypes.bool,
  showArrows: PropTypes.bool,
  showStatus: PropTypes.bool,
  showIndicators: PropTypes.bool,
  showThumbs: PropTypes.bool,
  sliderContent: PropTypes.array.isRequired,
}

export default SlickSlider