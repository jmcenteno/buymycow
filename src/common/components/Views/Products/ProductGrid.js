import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import genericImg from '../../../../img/no-img.png';

function paginate(arr) {
  
  const pages = [];
  let page = [];

  arr.forEach((item, i) => {

    page.push(item);

    if ((i + 1) % 3 === 0 || (i + 1) >= arr.length) {
      pages.push(page);
      page = [];
    }

  });

  return pages;

}

const buildColumns = (product, i) => {
  return (
    <div className='col-sm-4' key={i}>
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
    </div>
  );
}

const ProductGrid = ({ products, ...rest }) => {
  
  const rows = paginate(products || []);
  
  return (
    <div>
      {
        rows.map((row, i) => {
          return (
            <div className='row' key={i}>
              {
                row.map(buildColumns)
              }
            </div>
          );
        })
      }
    </div>
  );

}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProductGrid;
