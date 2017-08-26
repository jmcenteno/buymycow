import React, { Component } from 'react';

import { Page, PageHeader, Spinner } from '../../Global';
import ProductGrid from './ProductGrid';

const styles = {
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
}

export default class Products extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {

    const { loading, products } = this.props;

    if (loading) {
      return (
        <Page>
          <div style={ styles.spinner }>
            <Spinner />
          </div>
        </Page>
      );
    }

    return (
      <Page>
        <PageHeader title='Products' />
        {
          products.size ?
            <ProductGrid products={ products } /> :
            <p>There are no products</p>
        }
      </Page>
    );
    
  }

}
