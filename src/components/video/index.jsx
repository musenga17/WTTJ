import React, { Component } from 'react';
import '../../App.css';
import PropTypes from 'prop-types';
import './style.css';

const propTypes = {
    urlImage : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    subtitle : PropTypes.string,
    position : PropTypes.object.isRequired
};
const defaultProps = {
    urlImage: '1.jpg',
    title : '',
    subtitle : '',
    position : { x: 1, y:1}
};

class Video extends Component {
  render() {
    const graphImage = require('../../assets/photos/' + this.props.urlImage);
    return (
      <div
        className="slider_content_slide slider_content_slide_video"
        style={{
          width: this.props.width,
          gridColumn: `${this.props.position.x}`,
          gridRow: `${this.props.position.y}`
        }}
      >
          <div className="slider_content_slider_background" style={{backgroundImage: `url(${graphImage})`}}></div>
          <div className="icon_video">
            <i dangerouslySetInnerHTML={{__html:"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 41.999 41.999' style='enable-background:new 0 0 41.999 41.999;' xml:space='preserve'><path d='M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40  c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20  c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z'/></svg>"}}></i>
          </div>
          <div className="description_video">
              {
                this.props.title !== "" &&
                <div className="description_video_title">{this.props.title}</div>
              }
              {
                this.props.subtitle !== "" &&
                <div className="description_video_subtitle">{this.props.subtitle}</div>
              }
          </div>
      </div>
    );
  }
}

Video.defaultProps = defaultProps;
Video.propTypes = propTypes;
export default Video;
