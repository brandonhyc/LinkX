import React from 'react';
import './App.css';
import AppHeader from './layout/Header'
import Main from './layout/Main'

import { Layout } from 'antd';

function App() {
  return (
    <div className="App">
      <Layout>
        <AppHeader className="header" />
        <Main />
      </Layout>
    </div>
  );
}

export default App;
