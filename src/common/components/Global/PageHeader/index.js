import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <header className='page-header'>
      <h1 className='display-4'>
        {title}
        {
          subtitle ?
            <span>
              <br />
              <small>{subtitle}</small>
            </span> :
            null
        }
      </h1>
      { children }
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default PageHeader;
