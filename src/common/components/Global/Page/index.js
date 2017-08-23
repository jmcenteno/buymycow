import React from 'react';
import PropTypes from 'prop-types';

const Page = ({ children, ...rest }) => {
  return (
    <div className='page' {...rest}>
      <div className='container'>
        {children}
      </div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default Page;
