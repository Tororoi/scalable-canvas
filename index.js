let container = document.getElementById("container");

let onScreenCVS = document.getElementById("onScreen");
let onScreenCTX = onScreenCVS.getContext("2d");

let source = onScreenCVS.toDataURL();

let offScreenCVS = document.createElement('canvas');
let offScreenCTX = offScreenCVS.getContext("2d");
  offScreenCVS.width = 100;
  offScreenCVS.height = 100;
  offScreenCTX.imageSmoothingEnabled = false;
  offScreenCTX.fillRect(10,10,20,20);

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

onScreenCVS.addEventListener('click', handleClick)

function handleClick(e) {
  // onScreenCVS.style.background = "blue";
  onScreenCTX.fillStyle = "#FF0000";
  onScreenCTX.fillRect(e.offsetX-15,e.offsetY-15,30,30)
  offScreenCTX.fillStyle = "#FF0000";
  offScreenCTX.fillRect(e.offsetX-15,e.offsetY-15,30,30)
  source = onScreenCVS.toDataURL();
}