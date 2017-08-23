import React from 'react';

const Footer = () => {

  const year = (new Date()).getFullYear();

  return (
    <footer className='footer'>
      <div className='container-fluid text-center'>
        <p>&copy; {year} BuyMyCow - All rights reserved.</p>
      </div>
    </footer>
  );

}

export default Footer;
