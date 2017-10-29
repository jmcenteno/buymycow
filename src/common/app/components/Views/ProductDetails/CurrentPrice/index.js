import React from 'react';
import PropTypes from 'prop-types';
import Numeral from 'numeral';

const CurrentPrice = ({ product, bids }) => {

  const currentPrice = (
    bids.size ?
      bids.get(0).amount :
      product.get('initialPrice')
  );

  return (
    <div>
      <small style={ { fontSize: '45%' } }>
        { `${product.getIn(['data', 'sold']) ? 'Sold' : 'Current'} Price` }
      </small>
      <br />
      <strong>{ Numeral(currentPrice).format('$0,0') }</strong>
    </div>
  );

}

CurrentPrice.propTypes = {
  product: PropTypes.object.isRequired,
  bids: PropTypes.object.isRequired
}

export default CurrentPrice;
