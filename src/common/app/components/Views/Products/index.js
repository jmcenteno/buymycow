import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { getProducts } from '../../../actions/products';
import { setPageTitle } from '../../../actions/page';
import Products from './Products';

const mapStateToProps = (state) => {
  return {
    loading: state.getIn(['products', 'loading']),
    error: state.getIn(['products', 'error']),
    products: state.getIn(['products', 'data'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    getProducts,
    setPageTitle
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
