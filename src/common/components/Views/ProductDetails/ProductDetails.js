import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Page, PageHeader, Spinner } from '../../Global';
import { getRemainingTime } from '../../../services/utils';
import genericImg from '../../../../img/no-img.png';
import BidHistory from './BidHistory';
import BidForm from './BidForm';

const styles = {
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  currentPrice: {
    marginBottom: 32
  },
  productImage: {
    marginBottom: 32
  },
  bidHistory: {
    section: {
      marginTop: 32
    },
    panelBody: {
      maxHeight: 300,
      overflowY: 'auto'
    }
  },
  sold: {
    container: {
      position: 'relative'
    },
    content: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      transform: 'rotate(-45deg)',
      position: 'absolute',
      top: -40,
      left: -60,
      width: 140,
      height: 100,
      padding: 8,
      color: '#fff',
      textTransform: 'uppercase',
      fontSize: '1.2em'
    }
  }
}

export default class Products extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    bidHistory: PropTypes.object.isRequired
  }

  componentDidMount() {

    const { key } = this.props.match.params;
    
    this.props.getProductDetails(key);
    this.props.getBidHistory(key);

  }

  componentWillReceiveProps(newProps) {

    console.log(this.props)

    if (newProps.product.get('error')) {
      this.props.history.replace('/404');
    }

  }

  render() {

    const { product, bidHistory } = this.props;

    if (product.get('loading') || bidHistory.get('loading')) {
      
      return (
        <Page>
          <div style={ styles.spinner }>
            <Spinner />
          </div>
        </Page>
      );

    }

    const currentPrice = (
      bidHistory.get('data').size ?
        bidHistory.getIn(['data', 0]).amount :
        product.getIn(['data', 'initialPrice'])
    );

    const remainingTime = getRemainingTime(product.getIn(['data', 'endDate']));
    
    return (
      <Page>
        {
          product.get('data') ?
            <article>
              <PageHeader title={ product.getIn(['data', 'name']) } />
              <div className='row'>
                <div className='col-md-8'>

                  <div className='row'>
                    <div className='col-sm-6'>

                      <div className='h1 visible-xs' style={ styles.currentPrice }>
                        <small style={ { fontSize: '45%' } }>{ `${product.getIn(['data', 'sold']) ? 'Sold' : 'Current'} Price` }</small>
                        <br />
                        <strong>{ `$${currentPrice}` }</strong>
                      </div>
                      
                      <aside style={ { overflow: 'hidden' } }>
                        {
                          product.getIn(['data', 'sold']) ?    
                            <div style={ styles.sold.container }>
                              <div className='bg-danger text-center' style={ styles.sold.content }>
                                <strong>Sold</strong>
                              </div>
                            </div> :
                            null
                        }
                        <img 
                          src={ product.get('picture') || genericImg } 
                          className='img-responsive'
                          alt={ product.getIn(['data', 'name']) }
                          style={ styles.productImage }
                        />
                      </aside>

                    </div>
                    <div className='col-sm-6'>

                      <section>
                        <div className='h1 hidden-xs' style={ styles.currentPrice }>
                          <small style={ { fontSize: '45%' } }>{ `${product.getIn(['data', 'sold']) ? 'Sold' : 'Current'} Price` }</small>
                          <br />
                          <strong>{ `$${currentPrice}` }</strong>
                        </div>
                        <p>
                          { `${remainingTime.difference} ${remainingTime.interval} left` }
                        </p>
                        <p>
                          End Date: { moment(product.getIn(['data', 'endDate'])).format('MM/DD/YYYY') }
                        </p>
                      </section>

                      <br />
                      
                      {
                        !product.getIn(['data', 'sold']) ?
                          <section>
                            <BidForm 
                              product={ product.get('data') }
                              amount={ currentPrice } 
                              onSubmit={ this.props.createBid }
                            />
                          </section> :
                          null
                      }

                    </div>
                  </div>

                </div>
                <div className='col-md-4'>

                  <section style={ styles.bidHistory.section }>
                    {
                      bidHistory.get('data').size ?
                        <div className='well wel-sm'>
                          <div className='h4' style={ { marginTop: 0 } }>
                            Highest Bidder
                          </div>
                          <div>
                            User: <strong>{ bidHistory.getIn(['data', 0]).user }</strong>
                          </div>
                          <div>
                            Amount: <strong>{ `$${bidHistory.getIn(['data', 0]).amount}` }</strong>
                          </div>
                        </div> :
                        null
                    }
                    <div className='panel panel-default'>
                      <div className='panel-heading'>
                        <h4 className='panel-title'>Bid History</h4>
                      </div>
                      <div className='panel-body' style={ styles.bidHistory.panelBody }>
                        <BidHistory bids={ bidHistory } onPriceChange={ () => {} } />
                      </div>
                    </div>
                  </section>

                </div>
              </div>
            </article> :
            null
        }
      </Page>
    );
  }

}
