import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Footer from './Footer';

const styles = {
  wrapper: {
    flex: 1
  }
}

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
      <div className='wrapper' style={styles.wrapper}>
        <Navbar />
        { children }
        <Footer />
      </div> 
    );
    
  }

}
