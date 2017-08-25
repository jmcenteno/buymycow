import React from 'react';
import PropTypes from 'prop-types';

import { paginate } from '../../../services/utils';
import SingleProduct from './SingleProduct';

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
