let container = document.getElementById("container");

let onScreenCVS = document.getElementById("onScreen");
let onScreenCTX = onScreenCVS.getContext("2d");

let rangeScale = 1;
let baseDimension;
let rect = onScreenCVS.parentNode.getBoundingClientRect();
    rect.height > rect.width ? baseDimension = rect.width : baseDimension = rect.height;
    onScreenCVS.width = baseDimension;
    onScreenCVS.height = baseDimension;

console.log(baseDimension)


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
  output.innerHTML = this.value;
  rangeScale = this.value;
//   let img = new Image;
//   img.onload = () => {
//     onScreenCVS.width = baseDimension*rangeScale;
//     onScreenCVS.height = baseDimension*rangeScale;
//     onScreenCTX.imageSmoothingEnabled = false;
//     onScreenCTX.drawImage(img,0,0,onScreenCVS.width,onScreenCVS.height)
//   }
//   img.src = source;
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

// const heightOutput = document.querySelector('#height');
// const widthOutput = document.querySelector('#width');

function flexCanvasSize() {
    rect = onScreenCVS.parentNode.getBoundingClientRect();
    rect.height > rect.width ? baseDimension = rect.width : baseDimension = rect.height;

    let img = new Image;
    img.onload = () => {        
        onScreenCVS.width = baseDimension;
        onScreenCVS.height = baseDimension;
        onScreenCTX.imageSmoothingEnabled = false;
        onScreenCTX.drawImage(img,0,0,onScreenCVS.width,onScreenCVS.height)
    }
    img.src = source;
}

window.onresize = flexCanvasSize;