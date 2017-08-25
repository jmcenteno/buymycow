import React from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';

import FirebaseConfig from './config/firebase';
import Routes from './routes';
import Layout from './components/Layout';
import { checkProductStatus } from './cron';

firebase.initializeApp(FirebaseConfig);

checkProductStatus();

const App = () => (
  <Layout>
    <Route path='/' component={ Routes } />
  </Layout>
);

export default App;
