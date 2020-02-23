import React from 'react';
import logo from './logo.svg';
import './App.css';
import TwoDimensional from './pages/TwoDimensional'
import ThreeD from './pages/ThreeD'
import ThreePage from './pages/ThreePage'
import ThreePageMobile from './pages/ThreePageMobile'
import Navbar from './components/navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Router>
          <div>
          <Route path="/" component={Navbar} />
            <Route path="/2d" component={TwoDimensional} />
           <Route path="/3d" component={ThreePage} />
           <Route path="/3dMobile" component={ThreePageMobile} />
            {/* <Route path="/users" component={Users} />
            <Route path="/contact" component={Contact} /> */}
          </div>
       </Router>
        {/* <TwoDimensional></TwoDimensional> */}
      </header>
    </div>
  );
}

export default App;
