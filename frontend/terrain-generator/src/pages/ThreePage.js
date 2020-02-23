import React, { useRef, useEffect ,useState} from "react";
import ThreeD from './ThreeD'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function ThreePage() {

    const [seed, setSeed] = useState(300);

    const handleChange = (e) => {
        if(e.charCode==13){
            console.log("enter pressed")
            e.preventDefault();
            setSeed(e.target.value);
            
        } 
      };
  return (
    <div>
         seed:<input type="text" onKeyPress={e=>handleChange(e)} />
         <ThreeD seed={seed}></ThreeD>
    </div>
  );
}

export default ThreePage;
