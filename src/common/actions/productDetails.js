import * as firebase from 'firebase';

export const PRODUCT_DETAILS_GET_START = 'PRODUCT_DETAILS_GET_START';
export const PRODUCT_DETAILS_GET_ERROR = 'PRODUCT_DETAILS_GET_ERROR';
export const PRODUCT_DETAILS_GET_SUCCESS = 'PRODUCT_DETAILS_GET_SUCCESS';

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
      .once('value',
        (snapshot) => {

          const data = snapshot.val();

          dispatch(handleResponse(PRODUCT_DETAILS_GET_SUCCESS, data));

        },
        (error) => dispatch(handleResponse(PRODUCT_DETAILS_GET_ERROR, error))
      );

  };
}
