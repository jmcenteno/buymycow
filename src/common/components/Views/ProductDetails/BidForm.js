import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validation from 'react-validation';

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
      return <span className="help-block text-danger">This field is required.</span>
    }
  },
  min: {
    rule: (value, components) => {
      return value >= components.amount.props.min
    },
    hint: (value) => {
      return null;
    }
  }
});

export default class BidForm extends Component {

  static propTypes = {
    product: PropTypes.object.isRequired,
    amount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
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

  validateForm() {

  }

  handleSubmit(e) {

    e.preventDefault();

    const { product, onSubmit } = this.props;
    const { username, amount } = this.form.components;
    const bid = {
      user: username.state.value,
      amount: amount.state.value,
    }

    onSubmit(bid, product.toJS());

  }

  render() {

    const { amount } = this.props;

    //console.log(this.form.getErrors())

    return (
      <Validation.components.Form 
				ref={(c) => { this.form = c }} 
				onSubmit={(e) => this.handleSubmit(e)}>
        
        <div className='form-group'>
          <label className='control-label'>Username</label>
          <Validation.components.Input 
            type='text' 
            value={''}
            name='username'
            className='form-control' 
            placeholder='Enter your username'
            errorContainerClassName='has-error'
						validations={ ['required'] } 
          />
        </div>
        
        <div className={`form-group ${``}`}>
          <label className='control-label'>Amount</label>
          <div className='row'>
            <div className='col-sm-6'>
              <Validation.components.Input 
                type='number'
                name='amount'
                id='amountControl'
                value={ Number.parseInt(amount, 10) + 1 }
                step={ 1 }
                min={ Number.parseInt(amount, 10) + 1 }
                className='form-control'
                placeholder='Enter Amount'
                aria-describedby='amountControl'
                errorContainerClassName='has-error'
                validations={ ['required', 'min'] }
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
