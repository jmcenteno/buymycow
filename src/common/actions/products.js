import * as firebase from 'firebase';

export const PRODUCTS_GET_START = 'PRODUCTS_GET_START';
export const PRODUCTS_GET_ERROR = 'PRODUCTS_GET_ERROR';
export const PRODUCTS_GET_SUCCESS = 'PRODUCTS_GET_SUCCESS';

export function start(type) {
  return { type };
}

export function handleResponse(type, data) {
  return {
    type,
    data
  };
}

export function getProducts() {
  return function (dispatch) {
    
    dispatch(start(PRODUCTS_GET_START));

    firebase.database().ref('/products')
      .once('value',
        (snapshot) => {

          const data = [];

          snapshot.forEach(item => {
            data.push({
              key: item.key,
              ...item.val()
            })
          });
          
          dispatch(handleResponse(PRODUCTS_GET_SUCCESS, data));

        },
        (error) => dispatch(handleResponse(PRODUCTS_GET_ERROR, error))
      );

  };
}
