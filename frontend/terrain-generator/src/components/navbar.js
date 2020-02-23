import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './navbar.css'

function Navbar() {
  return (
    <div className="Navbar">
      <ul>
         <li>
                <Link to="/3d">3d</Link>
         </li>
         <li>
                <Link to="/2d">2d</Link>
         </li>

      </ul>
    </div>
  );
}
//react router
export default Navbar;
