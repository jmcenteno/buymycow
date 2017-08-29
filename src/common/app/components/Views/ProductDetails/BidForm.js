import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validation from 'react-validation';
import Validator from 'validator';

import { FormError } from '../../Global';

Object.assign(Validation.rules, {
  // Key name maps the rule 
  required: {
    // Function to validate value 
    // NOTE: value might be a number -> force to string 
    rule: (value) => {
      return value.toString().trim();
    },
    // Function to return hint 
    // You may use current value to inject it in some way to the hint 
    hint: (value) => {
      return (
        <FormError message='This field is required.' />
      );
    }
  },
  min: {
    rule: (value, components) => {
      return (value >= components.amount.props.min);
    },
    hint: (value) => {
      return (
        <FormError message='Invalid bid amount.' />
      );
    }
  },
  numeric: {
    rule: (value) => {
      return Validator.isNumeric(value.toString());
    },
    hint: (value) => {
      return (
        <FormError message='Invalid bid amount.' />
      );
    }
  },
  alphanumeric: {
    rule: (value) => {
      return Validator.isAlphanumeric(value);
    },
    hint: (value) => {
      return (
        <FormError message='Invalid username.' />
      );
    }
  }
});

export default class BidForm extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    bids: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    error: PropTypes.object,
    onSetUser: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      user: '',
      amount: 0
    }

    this.setState = this.setState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {

    e.preventDefault();

    const { product, onSubmit } = this.props;
    const { username, amount } = this.form.components;
    const bid = {
      user: username.state.value,
      amount: amount.state.value,
      date: (new Date()).toISOString()
    }

    onSubmit(bid, product.toJS());

  }

  render() {

    const { product, bids, user, error, onSetUser } = this.props;

    const currentPrice = (
      bids.size ?
        bids.get(0).amount :
        product.get('initialPrice')
    );

    return (
      <Validation.components.Form 
				ref={ (c) => { this.form = c } }
				onSubmit={ (e) => this.handleSubmit(e) }>

        {
          error ?
            <div className='alert alert-danger'>
              <h4>Error</h4>
              { error.get('message') }
            </div> :
            null
        }

        <div className='form-group'>
          <label className='control-label'>Username</label>
          <Validation.components.Input 
            type='text' 
            value={ user }
            name='username'
            className='form-control' 
            placeholder='Enter your username'
            onChange={ (e) => onSetUser(e.target.value) }
            errorContainerClassName='has-error'
            validations={ ['required', 'alphanumeric'] } 
          />
        </div>
        
        <div className='form-group'>
          <label className='control-label'>Bid Amount</label>
          <div className='row'>
            <div className='col-sm-7'>
              <Validation.components.Input 
                type='number'
                name='amount'
                id='amountControl'
                value={ Number.parseInt(currentPrice, 10) + 1 }
                step={ 1 }
                min={ Number.parseInt(currentPrice, 10) + 1 }
                className='form-control'
                placeholder='Enter Amount'
                aria-describedby='amountControl'
                errorContainerClassName='has-error'
                validations={ ['numeric', 'required', 'min'] }
              />
            </div>
          </div>
        </div>
        
        <br />

        <Validation.components.Button 
          type='submit' 
          className='btn btn-primary'>
          Place Your Bid!
        </Validation.components.Button>

      </Validation.components.Form>
    );

  }

}
