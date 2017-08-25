import React from 'react';
import PropTypes from 'prop-types';

const HighestBidder = ({ bid }) => {
  return (
    <div className='well wel-sm'>
      <div className='h4' style={ { marginTop: 0 } }>
        Highest Bidder
      </div>
      <div>
        User: <strong>{ bid.user }</strong>
      </div>
      <div>
        Amount: <strong>{ `$${bid.amount}` }</strong>
      </div>
    </div>
  );
}

HighestBidder.propTypes = {
  bid: PropTypes.object.isRequired
}

export default HighestBidder;
