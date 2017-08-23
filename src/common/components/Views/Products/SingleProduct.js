import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import genericImg from '../../../../img/no-img.png';

const SingleProduct = ({ product, ...rest }) => {
  return (
    <div className='panel panel-default'>
      <div className='panel-heading text-center'>
        <h3 className='panel-title'>{product.name}</h3>
      </div>
      <div className='panel-body text-center'>
        <img 
          src={product.picture || genericImg} 
          className='img-responsive' 
          alt=''
        />
        <p className='lead'>{product.price || 'N/A'}</p>
        <Link to={`/products/${product.key}`} className='btn btn-primary'>Start Bidding</Link>
      </div>
    </div>
  );
}

export default SingleProduct;
