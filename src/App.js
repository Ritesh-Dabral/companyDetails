import React from 'react';
import Searchbar from './components/searchbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Result from './components/result'
import Error from './components/error'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Searchbar} />
        <Route exact path="/result" component={Result} />
        <Route exact path="*" component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
