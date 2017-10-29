import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { getRemainingTime } from '../../../../services/utils';

export default class RemainingTime extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { product } = props;
    
    this.remainingTime = getRemainingTime(product.get('endDate'));

  }

  componentWillMount() {

    this.timer = setInterval(() => {
      
      const { product } = this.props;

      this.remainingTime = getRemainingTime(product.get('endDate'));

    }, 1000);

  }

  componentWillUnmount() {

    clearInterval(this.timer);

  }
  
  render() {
    
    const { product } = this.props;
    const { difference, interval } = this.remainingTime;
    const endDate = moment(new Date(product.get('endDate'))).format('M/D/YYYY');

    return (
      <div>
        <p className='lead'>
          {
            difference ?
              `${difference} ${interval} left` :
              'Time\'s Up!'
          }
        </p>
        <p>
          End Date: { endDate }
        </p>
      </div>
    );

  }

}
