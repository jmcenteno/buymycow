import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/productDetails';
import ProductDetails from './ProductDetails';

const mapStateToProps = (state) => {
  return {
    product: state.getIn(['productDetails', 'product']),
    bidHistory: state.getIn(['productDetails', 'bids'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    actions,
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
