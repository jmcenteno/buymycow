import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import { Page, PageHeader, Spinner } from '../../Global';

const styles = {}

export default class Products extends Component {

  componentDidMount() {
    const { key } = this.props.match.params;
    this.props.getProductDetails(key);
  }

  render() {

    const { product } = this.props;
    
    return (
      <Page>
        {
          product.get('loading') ?
            <div>
              <PageHeader title='Products' />
              <Row>
                <Col sm={4}>

                </Col>
              </Row>
            </div> :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Spinner />
            </div>
        }
      </Page>
    );
  }

}
