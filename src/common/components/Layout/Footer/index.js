import React from 'react';

import { APP_NAME } from '../../../config/app';

const styles = {
  footer: {
    padding: 16
  },
  p: {
    margin: 0
  }
}

const Footer = () => {

  const year = (new Date()).getFullYear();

  return (
    <footer className='footer' style={ styles.footer }>
      <div className='container-fluid text-center'>
        <p style={ styles.p }>&copy; { year } { APP_NAME } - All rights reserved.</p>
      </div>
    </footer>
  );

}

export default Footer;
