import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Page } from '../../Global';
import img from './404.png';

const styles = {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  img: {
    width: 250,
    marginBottom: 16
  }
}

const PageNotFound = (props, context = {}) => {

  if (context.setStatus) {
    context.setStatus(404)
  }
  
  return (
    <Page>
      <div style={ styles.content }>
        <div className='text-center'>
          <img src={ img } alt='Page Not Found' style={ styles.img } />
          <h1>Page Not Found</h1>
          <br />
          <Link to='/' className='btn btn-default'>Go Home</Link>
        </div>
      </div>
    </Page>
  );

}

PageNotFound.contextTypes = {
  setStatus: PropTypes.func
}

export default PageNotFound
