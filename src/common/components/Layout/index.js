import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]).isRequired
  }

  render() {

    const { children } = this.props;

    return (
      <div className='wrapper'>
        <Navbar />
        { children }
        <Footer />
      </div> 
    );
    
  }

}