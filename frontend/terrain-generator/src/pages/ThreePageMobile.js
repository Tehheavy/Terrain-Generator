import React, { useRef, useEffect ,useState} from "react";
import ThreeDMobile from './ThreeDMobile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function ThreePageMobile() {

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
         <ThreeDMobile seed={seed}></ThreeDMobile>
    </div>
  );
}

export default ThreePageMobile;
