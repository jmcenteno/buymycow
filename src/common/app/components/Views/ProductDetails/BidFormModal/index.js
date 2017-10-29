import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

const styles = {
  panel: {
    container: {
      margin: 0,
      border: 'none'
    },
    heading: {
      display: 'flex',
      flexDirection: 'row'
    },
    title: {
      flex: 'auto'
    }
  }
};

export default class BidFormModal extends Component {

  constructor(props) {
    
    super();

    this.state = {
      show: props.show
    };

    this.setState = this.setState.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

  }

  componentWillReceiveProps(newProps) {

    this.setState({ show: newProps.show });

  }

  open() {

    this.setState({ show: true });
  }

  close() {

    this.setState({ show: false });

  }

  render() {

    const { children } = this.props;

    return (
      <Modal bsSize='small' show={ this.state.show } onHide={ this.close }>
        <div className='panel panel-default' style={ styles.panel.container }>
          <div className='panel-heading' style={ styles.panel.heading }>
            <h4 className='modal-title' style={ styles.panel.title }>Place Your Bid</h4>
            <button type='button' className='close' aria-label='Close' onClick={ this.close }>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='panel-body'>
            { children }
          </div>
        </div>
      </Modal>
    );

  }

}
