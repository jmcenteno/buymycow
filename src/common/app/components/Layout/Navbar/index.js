import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { APP_NAME } from '../../../config/app';

const styles = {
  activeNavLink: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}

export default class Navbar extends Component {

  constructor() {
    super();

    this.state = {
      collapsed: true
    };

    this.setState = this.setState.bind(this);

  }

  render() {

    const { collapsed } = this.state;
   
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button
              className='navbar-toggle collapsed'
              type='button'
              aria-controls='navbarSupportedContent' 
              aria-expanded='false' aria-label='Toggle Navigation'
              onClick={ () => this.setState({ collapsed: !collapsed }) }>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className='navbar-brand' to='/'>
              <strong>{ APP_NAME }</strong>
            </Link>
          </div>
          <div className={ `collapse navbar-collapse ${ !collapsed ? 'show' : '' }` } id='navbarSupportedContent'>
            <ul className='nav navbar-nav'>
              <li>
                <NavLink to='/products' activeStyle={ styles.activeNavLink }>Products</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}
