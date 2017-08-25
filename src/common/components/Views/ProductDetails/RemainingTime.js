import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getRemainingTime } from '../../../services/utils';

const RemainingTime = ({ product }) => {
  console.log(product)

  const time = getRemainingTime(product.get('endDate'));

  return (
    <div>
      <p>
        { `${time.difference} ${time.interval} left` }
      </p>
      <p>
        End Date: { moment(product.get('endDate')).format('MM/DD/YYYY') }
      </p>
    </div>
  );
}

RemainingTime.propTypes = {
  product: PropTypes.object.isRequired
}

export default RemainingTime;
