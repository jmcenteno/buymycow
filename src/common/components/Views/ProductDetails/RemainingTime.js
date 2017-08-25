import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getRemainingTime } from '../../../services/utils';

const RemainingTime = ({ product }) => {

  const time = getRemainingTime(product.get('endDate'));

  return (
    <div>
      <p>
        { `${time.difference} ${time.interval} left` }
      </p>
      <p>
        End Date: { moment(new Date(product.get('endDate'))).format('M/D/YYYY') }
      </p>
    </div>
  );
}

RemainingTime.propTypes = {
  product: PropTypes.object.isRequired
}

export default RemainingTime;
