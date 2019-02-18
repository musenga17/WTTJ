import React, { Component } from 'react';
import '../App.css';

import Slider from './slider';
import LogoHeader from '../assets/icons/wttj.png';
import LogoFooter from '../assets/icons/wttj-long.svg';

class Widget extends Component {
    render() {
      return (
        <div>
          <header>
              <a
                href="https://www.welcometothejungle.co/companies/wttj"
                className="link"
                target="_BLANK"
                rel="noopener noreferrer"
              >
                  <img src={LogoHeader} alt='WTTJ' />
                  <span>Welcome To The Jungle</span>
              </a>
          </header>
          <Slider />
          <footer>
            <a
              href="https://www.welcometothejungle.co/"
              className="link_left"
              target="_BLANK"
              rel="noopener noreferrer"
            >
                <img src={LogoFooter} alt='WTTJ'/>
            </a>
            <a
              href="https://www.welcometothejungle.co/companies/wttj/jobs/developpeur-frontend-react-react-native_paris"
              className="link_right"
              target="_BLANK"
              rel="noopener noreferrer"
            >
                <span>
                  Voir le profil
                  <i dangerouslySetInnerHTML={{__html:"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' viewBox='0 0 129 129' enable-background='new 0 0 129 129'><path d='m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z'/></svg>"}}></i>
                </span>
            </a>
          </footer>
        </div>
      );
  }
}
export default Widget;
