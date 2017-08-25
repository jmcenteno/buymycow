import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/productDetails';
import { setUser } from '../../../actions/user'; 
import ProductDetails from './ProductDetails';

const mapStateToProps = (state) => {
  return {
    product: state.getIn(['productDetails', 'product']),
    bidHistory: state.getIn(['productDetails', 'bids']),
    createBidError: state.getIn(['productDetails', 'createBid']).get('error'),
    currentUser: state.getIn(['user', 'currentUser'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    Object.assign(actions, { setUser }),
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
