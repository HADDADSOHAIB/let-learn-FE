import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Signup from '../../pages/signup/Signup';
import Flash from '../flash/Flash';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
        <Flash />
      </div>
      <Switch>
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
