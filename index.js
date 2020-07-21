let container = document.getElementById("container");

let onScreenCVS = document.getElementById("onScreen");
let onScreenCTX = onScreenCVS.getContext("2d");

let source = onScreenCVS.toDataURL();

let offScreenCVS = document.createElement('canvas');
let offScreenCTX = offScreenCVS.getContext("2d");
  offScreenCVS.width = 100;
  offScreenCVS.height = 100;
  offScreenCTX.imageSmoothingEnabled = false;

let rangeSlider = document.getElementById("sliderInput");
let output = document.getElementById("demo");

output.innerHTML = rangeSlider.value;

rangeSlider.oninput = function() {
  rangeSlider.max = window.innerWidth;
  output.innerHTML = this.value;
  let img = new Image;
  img.onload = () => {
    onScreenCVS.width = this.value;
    onScreenCVS.height = this.value;
    onScreenCTX.imageSmoothingEnabled = false;
    onScreenCTX.drawImage(img,0,0,onScreenCVS.width,onScreenCVS.height)
  }
  img.src = source;
} 

onScreenCVS.addEventListener('mousemove', handleMouseMove);
onScreenCVS.addEventListener('mousedown', handleMouseDown);
onScreenCVS.addEventListener('mouseup', handleMouseUp);

let clicked = false;

function handleMouseMove(e) {
    if (clicked === true) {
        draw(e)
    }
}

function handleMouseDown(e) {
    clicked = true;
    draw(e)
}

function handleMouseUp(e) {
    clicked = false;
}

function draw(e) {
    let ratio = onScreenCVS.width/offScreenCVS.width;
    offScreenCTX.fillStyle = "#FF0000";
    offScreenCTX.fillRect(Math.floor(e.offsetX/ratio),Math.floor(e.offsetY/ratio),1,1)
    console.log(ratio)
    source = offScreenCVS.toDataURL();
    let img = new Image;
    img.onload = () => {
      onScreenCTX.imageSmoothingEnabled = false;
      onScreenCTX.drawImage(img,0,0,onScreenCVS.width,onScreenCVS.height)
    }
    img.src = source;
}

const heightOutput = document.querySelector('#height');
const widthOutput = document.querySelector('#width');

function reportWindowSize() {
  heightOutput.textContent = window.innerHeight;
  widthOutput.textContent = window.innerWidth;
  let baseDimension = window.innerHeight;
  window.innerHeight > window.innerWidth ? baseDimension = window.innerWidth : baseDimension = window.innerHeight;
//   let img = new Image;
//   img.onload = () => {
//     onScreenCVS.width = baseDimension*0.8;
//     onScreenCVS.height = baseDimension*0.8;
//     onScreenCTX.imageSmoothingEnabled = false;
//     onScreenCTX.drawImage(img,0,0,onScreenCVS.width,onScreenCVS.height)
//   }
//   img.src = source;
}

window.onresize = reportWindowSize;