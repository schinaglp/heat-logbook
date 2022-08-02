import React from 'react';
import Content from './components/Content'

import './custom.css'

const App = () => {

  const apiKeys = require('./config.js');

  return (
    // <Layout>
    //  <Route exact path='/' component={Home} />
    //  <Route path='/counter' component={Counter} />
    //  <Route path='/fetch-data' component={FetchData} />
    //  <Route path='/TaskManager' component={TaskManager} />
    // </Layout> 

    <Content apiKeys={apiKeys.config} />
  );
  
}

export default App