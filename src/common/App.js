import React from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';

import FirebaseConfig from './config/firebase';
import Routes from './routes';
import Layout from './components/Layout';

firebase.initializeApp(FirebaseConfig);

const App = () => (
  <Layout>
    <Route path='/' component={ Routes } />
  </Layout>
);

export default App;
