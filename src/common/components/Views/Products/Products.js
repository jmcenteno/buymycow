import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Page, PageHeader } from '../../Global';
import ProductGrid from './ProductGrid';

const styles = {}

export default class Products extends Component {

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    console.log(this.props.products.toJS())
    return (
      <Page>
        <PageHeader title='Products' />
        <ProductGrid products={this.props.products.toJS()} />
      </Page>
    );
  }

}
