import React from 'react';
import logo from './logo.svg';
import './App.css';
import TwoDimensional from './pages/TwoDimensional'
import ThreeD from './pages/ThreeD'
import ThreePage from './pages/ThreePage'
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
        <ul>
         <li>
                <Link to="/">Home Page</Link>
         </li>
         <li>
                <Link to="/3d">3d</Link>
         </li>
          <li>
                <Link to="/2d">2d</Link>
         </li>
      </ul>
          <div>
            <Route path="/2d" component={TwoDimensional} />
           <Route path="/3d" component={ThreePage} />
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
