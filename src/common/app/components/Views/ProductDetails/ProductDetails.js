import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Page, PageHeader, Spinner } from '../../Global';
import genericImg from '../../../../assets/img/no-img.png';
import BidHistory from './BidHistory';
import CurrentPrice from './CurrentPrice';
import RemainingTime from './RemainingTime';
import HighestBidder from './HighestBidder';
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
    bidHistory: PropTypes.object.isRequired,
    currentUser: PropTypes.string.isRequired,
    createBidError: PropTypes.object
  }

  componentDidMount() {

    const { key } = this.props.match.params;
    
    this.props.getProductDetails(key);
    this.props.getBidHistory(key);

  }

  componentWillReceiveProps(newProps) {

    if (newProps.product.get('error')) {
      this.props.history.replace('/404');
    }

  }

  render() {

    const { product, bidHistory, createBidError, currentUser } = this.props;

    if (product.get('loading') || bidHistory.get('loading')) {
      
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
        {
          product.get('data') ?
            <article>
              <PageHeader title={ product.getIn(['data', 'name']) } />
              <div className='row'>
                <div className='col-md-8'>

                  <div className='row'>
                    <div className='col-sm-6'>

                      <div className='h1 visible-xs' style={ styles.currentPrice }>
                        <CurrentPrice
                          product={ product.get('data') }
                          bids={ bidHistory.get('data') }
                        />
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
                          <CurrentPrice
                            product={ product.get('data') }
                            bids={ bidHistory.get('data') }
                          />
                        </div>
                        <RemainingTime product={ product.get('data') } />
                      </section>

                      <br />
                      
                      {
                        !product.getIn(['data', 'sold']) ?
                          <section>
                            <BidForm 
                              product={ product.get('data') }
                              bids={ bidHistory.get('data') }
                              user={ currentUser }
                              error={ createBidError }
                              onSetUser={ this.props.setUser }
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
                        <HighestBidder bid={ bidHistory.getIn(['data', 0]) } /> :
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
