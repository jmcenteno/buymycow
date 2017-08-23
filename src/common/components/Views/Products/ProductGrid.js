import React from 'react';
import PropTypes from 'prop-types';

import SingleProduct from './SingleProduct';

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

const ProductGrid = ({ products, ...rest }) => {
  
  const rows = paginate(products || []);
  
  return (
    <div>
      {
        rows.map((row, i) => {
          return (
            <div className='row' key={i}>
              {
                row.map((product, i) => {
                  return (
                    <div className='col-sm-4' key={i}>
                      <SingleProduct product={product} />
                    </div>
                  );
                })
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
