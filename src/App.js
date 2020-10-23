import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import Repackaging_Form from './Repackaging_Form/Repackaging_Form';
import Repackaging_Data from './Repackaging_Form/Repackaging_Data';
import LoginForm from './LoginForm/LoginForm';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
        <Route path="/admin" component={LoginForm} />
        <Route path="/repackaging_data" component={Repackaging_Data} />
        <Route path="/repackaging_form" component={Repackaging_Form} />
        <Redirect from="/" to="/admin" exact />
        </Switch>
        
      </div>
    );
  }
  
}

export default App;
