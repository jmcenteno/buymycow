import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getRemainingTime } from '../../../services/utils';
import genericImg from '../../../../assets/img/no-img.png';

const styles = {
  panel: {
    heading: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    body: {
      overflow: 'hidden'
    }
  },
  img: {
    marginBottom: 16
  },
  sold: {
    container: {
      position: 'relative'
    },
    content: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top: -60,
      left: -70,
      width: 120,
      height: 100,
      padding: 8,
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: '1.2em'
    }
  }
}

export default class SingleProduct extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    const { product } = props;
    
    this.remainingTime = getRemainingTime(product.endDate);

  }

  componentWillMount() {
    
    this.timer = setInterval(() => {
      
      const { product } = this.props;

      this.remainingTime = getRemainingTime(product.endDate);

    }, 1000);

  }

  componentWillUnmount() {

    clearInterval(this.timer);

  }
  
  render() {
    
    const { product } = this.props;

    return (
      <div className='panel panel-default'>
        <div className='panel-heading text-center' style={ styles.panel.heading }>
          <h3 className='panel-title'>{ product.name }</h3>
        </div>
        <div className='panel-body text-center' style={ styles.panel.body }>
          {
            product.sold ?
              <div style={ styles.sold.container }>
                <div className='bg-danger' style={ styles.sold.content }>
                  <strong>Sold</strong>
                </div>
              </div>
              :
              null
          }
          <img 
            src={ product.picture || genericImg } 
            className='img-responsive' 
            alt={ product.name }
            style={ styles.img }
          />
          <p className='lead'>
            {
              this.remainingTime.difference ?
                `${this.remainingTime.difference} ${this.remainingTime.interval} left` :
                'Time\'s Up!'
            }
          </p>
          <Link to={ `/products/${product.key}` } className='btn btn-primary'>View Details</Link>
        </div>
      </div>
    );

  }

}
