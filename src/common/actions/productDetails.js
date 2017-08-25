import * as firebase from 'firebase';

import { getRemainingTime } from '../services/utils';

export const PRODUCT_DETAILS_GET_START = 'PRODUCT_DETAILS_GET_START';
export const PRODUCT_DETAILS_GET_ERROR = 'PRODUCT_DETAILS_GET_ERROR';
export const PRODUCT_DETAILS_GET_SUCCESS = 'PRODUCT_DETAILS_GET_SUCCESS';

export const BID_HISTORY_GET_START = 'BID_HISTORY_GET_START';
export const BID_HISTORY_GET_ERROR = 'BID_HISTORY_GET_ERROR';
export const BID_HISTORY_GET_SUCCESS = 'BID_HISTORY_GET_SUCCESS';

export const BID_CREATE_START = 'BID_CREATE_START';
export const BID_CREATE_ERROR = 'BID_CREATE_ERROR';
export const BID_CREATE_SUCCESS = 'BID_CREATE_SUCCESS';

export function start(type) {
  return { type };
}

export function handleResponse(type, data) {
  return {
    type,
    data
  };
}

export function getProductDetails(key) {
  return function (dispatch) {
    
    dispatch(start(PRODUCT_DETAILS_GET_START));

    firebase.database().ref(`/products/${key}`)
      .on('value',
        (snapshot) => {

          if (!snapshot.val()) {

            dispatch(handleResponse(PRODUCT_DETAILS_GET_ERROR, { message: 'not found' }));

          } else {

            const data = { key, ...snapshot.val() };
            
            dispatch(handleResponse(PRODUCT_DETAILS_GET_SUCCESS, data));

          }

        },
        (error) => dispatch(handleResponse(PRODUCT_DETAILS_GET_ERROR, error))
      );

  };
}

export function getBidHistory(key) {
  return function (dispatch) {

    dispatch(start(BID_HISTORY_GET_START));
    
    firebase.database().ref(`/bids/${key}`)
      .on('value',
        (snapshot) => {

          const data = [];
          
          snapshot.forEach(item => {
            data.push({
              key: item.key,
              ...item.val()
            })
          });

          data.sort((a, b) => a.amount - b.amount);
          data.reverse();

          dispatch(handleResponse(BID_HISTORY_GET_SUCCESS, data));

        },
        (error) => dispatch(handleResponse(BID_HISTORY_GET_ERROR, error))
      );

  }
}

export function createBid(bid, product) {
  return function (dispatch) {

    dispatch(start(BID_CREATE_START));

    // get a collection of bid placed on a product
    const ref = firebase.database().ref(`/bids/${product.key}`);

    ref.once('value', (snapshot) => {
      
      const remainingTime = getRemainingTime(product.endDate);
      
      if (remainingTime.difference && !product.sold) {
        
        ref.push(bid, (error) => {
          
          if (error) {
          
            dispatch(handleResponse(BID_CREATE_ERROR, {
              message: 'Your bid cannot be placed at this time. Please try again later.'
            }));
          
          } else {
          
            dispatch(handleResponse(BID_CREATE_SUCCESS, null));
          
          }

        });

      } else {
        
        dispatch(handleResponse(BID_CREATE_ERROR, {
          message: 'This auction is no longer active'
        }));

      }

    });
      
  };
}
