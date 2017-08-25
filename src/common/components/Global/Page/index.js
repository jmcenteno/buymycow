import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  page: {
    padding: '16px 0 50px',
    marginBottom: -50,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    height: '100%'
  }
}

const Page = ({ children }) => {
  return (
    <div className='page' style={ styles.page }>
      <div className='container' style={ styles.container }>
        { children }
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
