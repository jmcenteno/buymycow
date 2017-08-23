import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../../actions/products';
import Products from './Products';

const mapStateToProps = (state) => {
  return {
    loading: state.getIn(['products', 'loading']),
    error: state.getIn(['products', 'error']),
    products: state.getIn(['products', 'data'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    actions,
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
