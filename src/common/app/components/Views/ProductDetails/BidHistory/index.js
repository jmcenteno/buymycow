import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Numeral from 'numeral';

const BiddingHistory = ({ bids }) => {

  const component = (
    <div>
      {
        !bids.get('data').size ?
          <p>No bids have been placed yet.</p> :
          <table className='table'>
            <thead>
              <tr>
                <th>User</th>
                <th>Amount</th>
                <th className='text-right'>Date</th>
              </tr>
            </thead>
            <tbody>
              {
                bids.get('data').map((item) => {
                  return (
                    <tr key={ `bid-${item.key}` }>
                      <td>{ item.user }</td>
                      <td>{ Numeral(item.amount).format('$0,0') }</td>
                      <td className='text-right'>
                        { moment(item.date).format('M/D/YYYY') }
                        <br />
                        { moment(item.date).format('h:MM:SS A') }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
      }    
    </div>
  );

  return component;

}

BiddingHistory.propTypes = {
  bids: PropTypes.object.isRequired
}

export default BiddingHistory;
