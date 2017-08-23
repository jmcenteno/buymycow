import React from 'react';

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
    <footer className='footer' style={styles.footer}>
      <div className='container-fluid text-center'>
        <p style={styles.p}>&copy; {year} BuyMyCow - All rights reserved.</p>
      </div>
    </footer>
  );

}

export default Footer;
