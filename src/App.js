import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Footer from './components/Footer'

import NavBar from './components/NavBar'
import Homepage from './components/pages/Homepage'
import Register from './components/pages/Register'


function App() {
  return (
    <div className="App">

      <NavBar />
      
      <div className="main">

        <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/register" exact component={Register} />
        </Switch>

      </div>

      <Footer />

    </div>
  );
}

export default App;
