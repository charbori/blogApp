import React, { useState, useEffect } from "react"
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { Profile } from 'components';

function App() {
  return (
    <Router>
      <header>
        <Link to="/profile">
            <button>Profile</button>
        </Link>
      </header>
      <hr />
      <main>
        <Switch>
          <Route path="/profile" component={Profile} />
        </Switch>
      </main>
    </Router>
);
}

export default App;
