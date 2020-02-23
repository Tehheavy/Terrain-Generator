import React, { useRef, useEffect ,useState} from "react";
import SimplexNoise from "simplex-noise"
import './TwoDimensional.css'




function TwoDimensional() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [seed,setSeed]=useState(413)
  // const [index,setIndex]=({x:0,y:0})
  var x=0;
  var y=0;
  const canvas = useRef(null);
  const canvas2 = useRef(null);
  const canvas3 = useRef(null);
  const canvas4 = useRef(null);
  const handleWidthChange = (e) => {
    if(e.target.value<=500)
      setWidth(e.target.value);
      else
      setWidth(500);
  };

  const handleHeightChange = (e) => {
    if(e.target.value<=500)
    setHeight(e.target.value);
    else
    setHeight(500);
  };

  var globalID;

  const handleSeedChange = (e) => {
          setSeed(e.target.value);
  };
   const draw= async(x,y,color)=>{
    const context = canvas.current.getContext("2d");
    setTimeout(function() {
      // console.log("drawing")
      context.fillStyle = "rgb("+color+","+color+","+color+")";
      context.fillRect(x*4, y*4, 4, 4);
    }, 1);
  }
  const repeat=(e)=>{
    const context = canvas.current.getContext("2d");
    if(y<(height/4-1))
    {
      const simplex = new SimplexNoise(seed);
      let value2d =simplex.noise2D(x, y);
      let color = value2d*128+128
      context.fillStyle = "rgb("+color+","+color+","+color+")";
      context.fillRect(x*4, y*4, 4, 4);
      y=y+1;
    }
    else if(y===(height/4-1)&&x<(width/4-1)){
      const simplex = new SimplexNoise(seed);
      let value2d =simplex.noise2D(x, y);
      let color = value2d*128+128
      context.fillStyle = "rgb("+color+","+color+","+color+")";
      context.fillRect(x*4, y*4, 4, 4);

      y=0;
      x=x+1;
    }
    else if(y===(height/4-1)&&x===(width/4-1)){
      //stop
      x=0;
      y=0;
      cancelAnimationFrame(globalID);
    }
    globalID = requestAnimationFrame(repeat);
  }

  const handleClickGenerate= async (e)=>{
    const context = canvas.current.getContext("2d");
    const context2 = canvas.current.getContext("2d");
    context.save();
    context.fillStyle = "rgb(255,20,20)";
    context.fillRect(90, 90, 50, 50);
    context.strokeStyle = "black";
    const simplex = new SimplexNoise(seed);
    // value2d = simplex.noise2D(width, height);
    // console.log(value2d)
    // console.log(value2d*128+128)
    for(let i=0;i<width;i++){
      for(let j=0;j<height;j++){
        // setInterval(function, milliseconds, param1, param2, ...)
        let value2d =simplex.noise2D(i*0.01, j*0.01);
        let color = value2d*128+128
        // context.fillStyle = "rgb("+color+","+color+","+color+")";
        // context.fillRect(i, j, 1, 1);

          context.fillStyle = "rgb("+color+","+color+","+color+")";
          context.fillRect(i, j, 1, 1);
        context.strokeStyle = "black";

        // draw(i,j,color)
        // setInterval(function, milliseconds, param1, param2, ...)
        // let value2d =simplex.noise2D(i, j);
        // let color = value2d*128+128
        // context.fillStyle = "rgb("+color+","+color+","+color+")";
        // context.fillRect(i, j, 1, 1);
        // context.stroke();
        
        
      }
    }
    console.log("end")  
  }

  const handleClickGenerate2= async (e)=>{
   
    globalID = requestAnimationFrame(repeat);
  }

  const handleClickGenerate3= async (e)=>{
    const context2 = canvas2.current.getContext("2d");
    context2.save();
    context2.strokeStyle = "black";
    const simplex = new SimplexNoise(seed);
    // value2d = simplex.noise2D(width, height);
    // console.log(value2d)
    // console.log(value2d*128+128)
    for(let i=0;i<width;i++){
      for(let j=0;j<height;j++){
        // setInterval(function, milliseconds, param1, param2, ...)
        let value2d =simplex.noise2D(i*0.01, j*0.01);
        value2d=(value2d*3)*(value2d+0.5) //-0.5 -- 0.5 * (-0.5 -- 1.5) min =-0.25, max=0.75
        let color = value2d*128+128
        // context.fillStyle = "rgb("+color+","+color+","+color+")";
        // context.fillRect(i, j, 1, 1);

          context2.fillStyle = "rgb("+color+","+color+","+color+")";
          context2.fillRect(i*1, j*1, 1, 1);

        context2.strokeStyle = "black";

        // draw(i,j,color)
        // setInterval(function, milliseconds, param1, param2, ...)
        // let value2d =simplex.noise2D(i, j);
        // let color = value2d*128+128
        // context.fillStyle = "rgb("+color+","+color+","+color+")";
        // context.fillRect(i, j, 1, 1);
        // context.stroke();
        
        
      }
    }
    console.log("end")  
  }
  const handleClickGenerate4= async (e)=>{
    const context3 = canvas3.current.getContext("2d");
    const context4 = canvas4.current.getContext("2d");
    context3.save();
    context3.strokeStyle = "black";
    context4.save();
    context4.strokeStyle = "black";
    const simplex = new SimplexNoise(seed);
    // value2d = simplex.noise2D(width, height);
    // console.log(value2d)
    // console.log(value2d*128+128)
    for(let i=0;i<width/4;i++){
      let value2d =simplex.noise2D(i*0.01, 0);
      value2d=(value2d*0.5)*(value2d+0.5)+value2d*0.3 //-0.5 -- 0.5 * (-0.5 -- 1.5) min =-0.25 -0.4, max=0.75 +0.4
     let color = value2d*128+128
     console.log(color,"color ",value2d)
     context3.fillStyle = "rgb("+color+","+color+","+color+")";
     context3.fillRect(i*4, height/2, 4, 4);
    }
    for(let i=0;i<width;i++){
      let value2d =simplex.noise2D(i*0.01, 0);
      let value2d2=simplex.noise2D((i-1)*0.01, 0);;

      let color = value2d*128+128
      console.log(color,"color ",value2d)
      context4.fillStyle = "black";
      for(let j=height/2+color*0.1;j<height;j++){
        context4.fillRect(i, j, 1, 1);
        
      }
    }
    console.log("end")  
  }

  useEffect(() => {
    const context = canvas.current.getContext("2d");
    const context2 = canvas2.current.getContext("2d");
    const context3 = canvas3.current.getContext("2d");
    const context4 = canvas4.current.getContext("2d");

    context.save();
    // context.scale(pixelRatio, pixelRatio);
    context.fillStyle = "hsl(0, 0%, 95%)";
    context.fillRect(0, 0, width, height);

    context2.save();
    // context.scale(pixelRatio, pixelRatio);
    context2.fillStyle = "hsl(0, 0%, 95%)";
    context2.fillRect(0, 0, width, height);

    context3.save();
    // context.scale(pixelRatio, pixelRatio);
    context3.fillStyle = "hsl(0, 0%, 95%)";
    context3.fillRect(0, 0, width, height);

    context4.save();
    // context.scale(pixelRatio, pixelRatio);
    context4.fillStyle = "hsl(0, 0%, 95%)";
    context4.fillRect(0, 0, width, height);

  });

  return (
    <div className="TwoD">
      <div className="Canvas">
          Simplex noise:
         <canvas ref={canvas} width={width} height={height}/>
         <br></br>
         Simplex noise adjusted:
         <canvas ref={canvas2} width={width} height={height}/>
         <br></br>
         Simplex noise 1d:
         <canvas ref={canvas3} width={width} height={height}/>
         <br></br>
         simplex noise Result terrain:
         <canvas ref={canvas4} width={width} height={height}/>
      </div>
      <div className="Modifiers">
        Seed:<input type="text" value={seed} onChange={e=>handleSeedChange(e)} />
        Width:<input type="text" value={width} onChange={e=>handleWidthChange(e)} />
        Height:<input type="text" value={height} onChange={e=>handleHeightChange(e)} />
        <button onClick={e=>{handleClickGenerate();
          handleClickGenerate3(e);
          handleClickGenerate4(e)}}>GENERATE</button>
      </div>
    </div>
  );
}

export default TwoDimensional;
