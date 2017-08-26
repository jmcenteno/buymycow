import firebase from 'firebase';

import { getRemainingTime } from './services/utils';

// Ideally, this could be done with a cron job
export function checkProductStatus() {

  // check the end date of each product and update its status
  setInterval(() => {
    
    firebase.database().ref('/products')
      .once('value', (snapshot) => {
        
        snapshot.forEach((item) => {
          
          const product = item.val();
          const remainingTime = getRemainingTime(product.endDate);

          if (!remainingTime.difference) {

            console.log(`updating product ${item.key}`);

            firebase.database().ref(`/products/${item.key}/sold`)
              .set(true)
              .then(() => console.log(`Product ${item.key} was updated`));

          }

        });

      });

  }, 1000 * 60);

}