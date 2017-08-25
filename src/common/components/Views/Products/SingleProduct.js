import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getRemainingTime } from '../../../services/utils';
import genericImg from '../../../../img/no-img.png';

const styles = {
  panel: {
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

const SingleProduct = ({ product }) => {

  const remainingTime = getRemainingTime(product.endDate);

  return (
    <div className='panel panel-default'>
      <div className='panel-heading text-center'>
        <h3 className='panel-title'>{product.name}</h3>
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
          src={product.picture || genericImg} 
          className='img-responsive' 
          alt={product.name}
          style={styles.img}
        />
        <p className='lead'>{ `${remainingTime.difference} ${remainingTime.interval} left` }</p>
        <Link to={`/products/${product.key}`} className='btn btn-primary'>View Details</Link>
      </div>
    </div>
  );

}

SingleProduct.propTypes = {
  product: PropTypes.object.isRequired
}

export default SingleProduct;
