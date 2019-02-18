import React, { Component } from 'react';
import '../../App.css';
import './style.css';
import classNames from 'classnames';
import Quote from '../quote';
import Video from '../video';
import Photo from '../photo';

import {sliderContent} from '../../constants/content.js';
import {
    parseParameters,
    mobileCheck
} from '../../helpers/index.js';

const MIN_ROWS = 1;
const MIN_COLUMNS = 1;
const MILI_SECONDS_AUTOPLAY = 10000;

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthWindow: 0,
      heightWindow: 0,
      widthSlide : 0,
      columns : MIN_COLUMNS,
      rows: MIN_ROWS,
      widthSlider : 0,
      navigation : false,
      screen : 0,
      maxScreen : 0,
      translationHorizontal : 0,
      autoplay : true
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  /* =========================================
  Set default state when the componentDidMount
  ========================================= */
  componentDidMount() {
    let parameters = parseParameters();
    let isMobile = mobileCheck();
    var columns = MIN_COLUMNS;
    var rows = MIN_ROWS;
    // Set costum colums via href if its a number, not on mobile
    if(parameters.hasOwnProperty('columns') && !isNaN(Number(parameters.columns)) )
    {
        columns = Number(parameters.columns);
        this.setState({ columns });
    }
    // Set costum rows via href if its a number
    if(parameters.hasOwnProperty('rows') && !isNaN(Number(parameters.rows)) && !isMobile)
    {
        rows = Number(parameters.rows);
        this.setState({ rows });
    }
    // If there is more slides than one screen
    let numberSlides = sliderContent.length;
    if(numberSlides > (rows * columns) )
    {
        let maxScreen = Math.floor( (numberSlides-1) / (rows*columns));
        this.setState({ navigation : true, maxScreen });
        this.autoplayPanel();
    }
    this.updateWindowDimensions(rows, columns);
    let self = this;
    window.addEventListener('resize', function(){self.updateWindowDimensions(rows,columns)});
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  /* ================================================
  Update states at componentDidMount and Resize event
  ================================================ */
  updateWindowDimensions(rows, columns) {
    let widthSlide =  window.innerWidth / columns;
    let numberSlides = sliderContent.length;
    let numberMaxSlidesInOneRow = Math.ceil(numberSlides / rows);
    let widthSlider = widthSlide * numberMaxSlidesInOneRow;
    let translationHorizontal = (-(this.state.screen * this.state.widthWindow));

    this.setState({
      widthWindow: window.innerWidth,
      heightWindow: window.innerHeight,
      widthSlide,
      widthSlider,
      translationHorizontal
    });
  }
  autoplayPanel = () => {
    let self = this;
    setTimeout(function(){
      if(self.state.autoplay)
      {
        self.movePanel("RIGHT")();
      }
    }, MILI_SECONDS_AUTOPLAY);
  }
  /* =====================================================
  Create Grid according to the parameters Columns and Rows
  ===================================================== */
  createGrid = (rows, columns) => {
    let numberSlides = sliderContent.length;
    let maxColumns = Math.ceil(numberSlides / rows);

    let slidesCount = 0;
    let gridDisposition = [];
    for(var i = 1; i <= maxColumns ; i++)
    {
      for(var j = 1; j <= rows; j++)
      {
        slidesCount += 1;
        if(slidesCount <= numberSlides)
        {
            let position = { x : i, y : j};
            gridDisposition.push(position);
        }
      }
    }
    return gridDisposition;
  }
  movePanel = (direction, eventClick = null) => () => {
      var translationHorizontal = this.state.translationHorizontal;
      var nextScreen = this.state.screen;
      var maxScreen = this.state.maxScreen;
      if(eventClick === "ON_CLICK" || (eventClick === null && nextScreen === (maxScreen -1)))
      {
          this.setState({ autoplay : false });
      }
      else
      {
          this.autoplayPanel();
      }

      switch(direction)
      {
          case "LEFT" :
          {
              if(nextScreen > 0)
              {
                  nextScreen -= 1;
                  translationHorizontal = translationHorizontal + this.state.widthWindow;
              }
              this.setState({
                translationHorizontal,
                screen : nextScreen
              });
              break;
          }
          case "RIGHT" :
          {
              if(nextScreen < maxScreen)
              {
                  nextScreen += 1;
                  translationHorizontal = translationHorizontal - this.state.widthWindow;
              }
              this.setState({
                translationHorizontal,
                screen : nextScreen
              });
              break;
          }
      }
  }
  renderProgressBar = () => {
    let progression = ( (this.state.screen + 1) / (this.state.maxScreen + 1 ) ) * 100 ;
    return (
      <div className="progress_bar">
        <div
          className="progress_bar_pourcentage"
          style={{
            width: `${progression}%`
          }}
        >
        </div>
      </div>
    );
  }
  renderNavigation = () => {
      const left_arrow_disabled = this.state.screen === 0 ? 'arrows_navigation_left_disabled' : 'arrows_navigation_left_enabled';
      const rigth_arrow_disabled = this.state.screen === this.state.maxScreen ? 'arrows_navigation_right_disabled' : 'arrows_navigation_right_enabled';
      return (
        <div className="arrows_navigation">
            <div
              className={classNames(
                `arrows_navigation_left`,
                `${left_arrow_disabled}`,
              )}
              onClick={this.movePanel("LEFT","ON_CLICK")}
            >
              <i dangerouslySetInnerHTML={{__html:"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 129 129' enable-background='new 0 0 129 129'><path d='m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z'/></svg>"}}></i>
            </div>
            <div
              className={classNames(
                `arrows_navigation_right`,
                `${rigth_arrow_disabled}`,
              )}
              onClick={this.movePanel("RIGHT", "ON_CLICK")}
            >
              <i dangerouslySetInnerHTML={{__html:"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 129 129' enable-background='new 0 0 129 129'><path d='m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z'/></svg>"}}></i>
            </div>
        </div>
      );
  }
  renderSlides = () => {
    let slides = [];
    let gridDisposition = this.createGrid(this.state.rows, this.state.columns);
    sliderContent.map( (slide, index) => {
        slides.push(this.renderSlide(slide, index, gridDisposition[index]));
    });
    return(
        <div
          className="slider_content"
          style={{
            width: this.state.widthSlider,
            gridTemplate: `repeat(${this.state.rows}, 1fr) / auto auto`,
            transform: `translate3d(${this.state.translationHorizontal}px, 0px, 0px)`
          }}
        >
            {slides}
        </div>
    );
  }
  renderSlide = (detail, key, position) => {
      switch(detail.type){
          case 'PHOTO' :
              return(
                <Photo
                  key={key}
                  position={position}
                  urlImage={detail.url}
                  width={this.state.widthSlide}
                />
              );
          case 'VIDEO' :
              return(
                <Video
                  key={key}
                  position={position}
                  urlImage={detail.url}
                  title={detail.title}
                  subtitle={detail.subtitle}
                  width={this.state.widthSlide}
                />
              );
          case 'QUOTE' :
              return(
                <Quote
                  key={key}
                  position={position}
                  text={detail.text}
                  theme={detail.theme}
                  width={this.state.widthSlide}
                />
              );
      }
  }
  render() {
    return (
        <section className="slider">
            { this.renderSlides() }
            {
              this.state.navigation &&
              this.renderNavigation()
            }
            {
              this.state.navigation &&
              this.renderProgressBar()
            }
        </section>
    );
  }
}

export default Slider;
