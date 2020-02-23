import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import SimplexNoise from "simplex-noise"
import './Three.css'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { Camera } from "three";
class ThreeDMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {value: props.seed};
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight , 0.1, 10000 );
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.loader = new THREE.TextureLoader();
    this.loader.setPath('textures/');

    this.handleChange = this.handleChange.bind(this);
    this.animate=this.animate.bind(this)
  }
  handleChange(event) {
    this.setState({value: event.target.value});
   this.forceUpdate()
  }
  componentDidUpdate(prevProps){
    // this.setState({value:this.props.seed})
    if (this.props.seed !== prevProps.seed) {
      this.setState({value:this.props.seed})
      console.log('test'+this.state.value)
      while(this.scene.children.length > 0){ 
        this.scene.remove(this.scene.children[0]); 
    }
      
        this.componentDidMount()
        
    }
  }
   animate() {
    requestAnimationFrame( this.animate );
  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;
  this.controls.update();
  this.renderer.render( this.scene,this.camera );
  };
  componentDidMount(value) {
    const blocksize=20;

    console.log("RENDERER")
    console.log("test"+this.texture)
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( this.renderer.domElement );


  var geometry = new THREE.BoxGeometry( blocksize, blocksize, blocksize );
  let tmesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color:12345678 }));
  tmesh.updateMatrix();
  // this.scene.add( tmesh );
  var totalGeom = new THREE.Geometry();
  var GeomGreen = new THREE.Geometry();
  var GeomYellow = new THREE.Geometry();
  var GeomBlue = new THREE.Geometry();
  totalGeom.merge( tmesh.geometry, tmesh.matrix );
  var materials=[]
  var materialsGreen=[]
  var materialsYellow=[]
  var materialsBlue=[]
  var all={materials:[],geometries:{}};
  // this.scene.add( totalGeom );
  
  
  // var material = new THREE.MeshBasicMaterial( { map: this.texture } );
  // var cube = new THREE.Mesh( geometry, this.material );
  // this.scene.add( cube );
  //   // for(let i=0;i<5;i++){
    //     //     let cubet=new THREE.Mesh( geometry, material );
    //     //     cubet.position.x=i*2
    //     //     scene.add( cubet );
    
    //     // }
    //     // adding cubes
    const simplex = new SimplexNoise(this.state.value);
    
    var max=0;
    for(let i=-25;i<25/1;i++){
      for(let j=-25;j<25/1;j++){
        let value2d =simplex.noise2D(i*0.05, j*0.05);
        let color = value2d*128+128
        //  console.log("color is",color)
        
        let tempmat;
          tempmat=new THREE.MeshBasicMaterial( { color: "rgb("+0+","+0+","+150+")",vertexColors: THREE.VertexColors} );
          // if(all.materials[Math.floor(color)]===undefined){
          //   all.materials[Math.floor(color)]=[];
          //   all.materials[Math.floor(color)].push(tempmat.clone())
          // }
          // else{
          //   all.materials[Math.floor(color)].push(tempmat.clone())
          // }
          
          let cubet=new THREE.Mesh( geometry, tempmat );
          cubet.position.x=i*blocksize
          cubet.position.z=j*blocksize
          if(max<Math.floor(color))
          max=Math.floor(color);
          cubet.position.y=Math.floor(Math.floor(color)/38)*blocksize
          materialsBlue.push(tempmat.clone())
          cubet.updateMatrix();
          GeomBlue.merge( cubet.geometry, cubet.matrix,materials.length);
          // console.log(Math.floor(color)+" pre")
          if(all.geometries[Math.floor(color)]===undefined){
            // console.log(Math.floor(color)+" undefined")
            // console.log(Math.floor(color))
            all.geometries[Math.floor(color)]=new THREE.Geometry();
            all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix);
          }
          else{
            all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix);
          }

      }
    }
    //https://discourse.threejs.org/t/problem-in-merging-multiple-objects-into-one/5154
    // var total = new THREE.Mesh(totalGeom,materials);//new THREE.MeshBasicMaterial( { color:12345678 })        THIS IS LAG


    console.log(Object.keys(all.geometries),"this is all",max) //Object.keys(all.geometries)[i]
    console.log(all.geometries)
    for(let i=0;i<=max;i++){
      let check=Object.keys(all.geometries)[i];
      let tempcolor;
      if(check!==undefined)
        tempcolor=Object.keys(all.geometries)[check];
      if(tempcolor)
      console.log(tempcolor+" "+i+" "+all.geometries[i])
      let resColor;
        if(tempcolor<100)
        {
          resColor=new THREE.Mesh(all.geometries[i],new THREE.MeshBasicMaterial({ color: "rgb("+0+","+Math.floor(Math.floor(tempcolor)/2)+","+Math.floor(tempcolor)+")" }))
        }
        else if(tempcolor>=100&&tempcolor<=110)
        {
          
          resColor=new THREE.Mesh(all.geometries[i],new THREE.MeshBasicMaterial({ color: "rgb("+144+","+144+","+0+")" }))
        }
        else
        {
          resColor=new THREE.Mesh(all.geometries[i],new THREE.MeshBasicMaterial({color:"rgb("+0+","+Math.floor(Math.floor(tempcolor))+","+0+")"}))
        }

      this.scene.add(resColor)
    }
    // var green=new THREE.Mesh(GeomGreen,new THREE.MeshBasicMaterial( { color:0x00ff00 }) )
    // var yellow=new THREE.Mesh(GeomYellow,new THREE.MeshBasicMaterial( { color:0xffff00 }) )
    var blue=new THREE.Mesh(GeomBlue,new THREE.MeshBasicMaterial( { color:0x0000ff }) )
    // this.scene.add(green)
    // this.scene.add(yellow)
    // this.scene.add(blue)
      // this.scene.add(total);
    
    this.camera.position.set( -2000, 2000, -2000  );
    this.controls.autoRotate=true
    this.controls.update();
    // this.renderer.compile(this.scene,this.camera);
    // this.scene.traverse(obj => obj.frustumCulled = false);
    this.animate();
  }
  init(){
    
  }
  render() {
    return (
      <div>
          <div>
          </div>
          <div className="ThreeDMobile" ref={ref => (this.mount = ref)} />
      </div>
    )
  }
}

export default ThreeDMobile;
// var max=0;
// for(let i=-75;i<100/1;i++){
//   for(let j=-75;j<100/1;j++){
//     let value2d =simplex.noise2D(i*0.01, j*0.01);
//     let color = value2d*128+128
//     //  console.log("color is",color)
    
//     let tempmat;
//     if(color<100)//water
//     {
//       tempmat=new THREE.MeshBasicMaterial( { color: "rgb("+0+","+0+","+150+")",vertexColors: THREE.VertexColors} );
//       if(all.materials[Math.floor(color)]===undefined){
//         all.materials[Math.floor(color)]=[];
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
//       else{
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
      
//       let cubet=new THREE.Mesh( geometry, tempmat );
//       cubet.position.x=i*1
//       cubet.position.z=j*1
//       if(max<Math.floor(color))
//       max=Math.floor(color);
//       cubet.position.y=Math.floor(Math.floor(color)/8)*1
//       materialsBlue.push(tempmat.clone())
//       cubet.updateMatrix();
//       GeomBlue.merge( cubet.geometry, cubet.matrix,materials.length);
//       if(all.geometries[Math.floor(color)]===undefined){
//         all.geometries[Math.floor(color)]=new THREE.Geometry();
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
//       else{
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
      
      
//     }
//     else if(color>=100&&color<=110)//sand
//     {
      
//       tempmat=new THREE.MeshBasicMaterial( { color: "rgb("+144+","+144+","+0+")",vertexColors: THREE.VertexColors } );
      
//       if(all.materials[Math.floor(color)]===undefined){
//         all.materials[Math.floor(color)]=[];
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
//       else{
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
      

//       let cubet=new THREE.Mesh( geometry, tempmat );
//       cubet.position.x=i*1
//       cubet.position.z=j*1
//       if(max<Math.floor(color))
//       max=Math.floor(color);
//       cubet.position.y=Math.floor(Math.floor(color)/8)*1
//       materialsYellow.push(tempmat.clone())
//       cubet.updateMatrix();
//       GeomYellow.merge( cubet.geometry, cubet.matrix,materials.length);
//       if(all.geometries[Math.floor(color)]===undefined){
//         all.geometries[Math.floor(color)]=new THREE.Geometry();
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
//       else{
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
//     }
//     else
//     {
//       tempmat=new THREE.MeshBasicMaterial( {color:"rgb("+0+","+150+","+0+")",vertexColors: THREE.VertexColors} );
//       if(all.materials[Math.floor(color)]===undefined){
//         all.materials[Math.floor(color)]=[];
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
//       else{
//         all.materials[Math.floor(color)].push(tempmat.clone())
//       }
      
//       let cubet=new THREE.Mesh( geometry, tempmat );
//       cubet.position.x=i*1
//       cubet.position.z=j*1
//       if(max<Math.floor(Math.floor(color)))
//       max=Math.floor(Math.floor(color));
//       cubet.position.y=Math.floor(Math.floor(color)/8)*1
//       materialsGreen.push(tempmat.clone())
//       cubet.updateMatrix();
//       GeomGreen.merge( cubet.geometry, cubet.matrix,materials.length);
//       if(all.geometries[Math.floor(color)]===undefined){
//         all.geometries[Math.floor(color)]=new THREE.Geometry();
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
//       else{
//         all.geometries[Math.floor(color)].merge( cubet.geometry, cubet.matrix,materials.length);
//       }
//     }
//     // if(color<100)
//     // {
      
//     //   tempmat=new THREE.MeshBasicMaterial( { color: "rgb("+0+","+Math.floor(Math.floor(color)/2)+","+Math.floor(color)+")" } );
//     // }
//     // else if(color>=100&&color<=110)
//     // {
      
//     //   tempmat=new THREE.MeshBasicMaterial( { color: "rgb("+144+","+144+","+0+")" } );
//     // }
//     // else
//     // {
//     //   tempmat=new THREE.MeshBasicMaterial( {color:"rgb("+0+","+Math.floor(Math.floor(color))+","+0+")"} );
      
//     // }

//     // let cubet=new THREE.Mesh( geometry, tempmat );
//     // cubet.position.x=i*1
//     // cubet.position.z=j*1
//     // if(max<Math.floor(color))
//     // max=Math.floor(color);
//     // cubet.position.y=Math.floor(Math.floor(color)/8)*1
//     // materials.push(tempmat.clone())
//     // cubet.updateMatrix();
//     // totalGeom.merge( cubet.geometry, cubet.matrix,materials.length-3);
    
//     // this.scene.add( cubet );
    
//   }
// }
