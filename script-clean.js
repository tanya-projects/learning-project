"use strict";

//// 
//// Click on random color
//// blue color goes to right and user will see button
//// Button - CHANGE COLOR and check box with include button
//// if check box is not checked then change only background color
//// if check box is selected then change random button color and background
//// Click on set color
//// violet color goes to left and user will see 3 input field and button change
//// if input field is valid number (0-255) then change background color accorfingly, if not - alert

////// MAIN VARIABLES
const randomHalf = document.querySelector(".blue--half");
const setHalf = document.querySelector(".violet--half");
const backBtn = document.querySelector(".back");
const body = document.querySelector("body");

///// RANDOM SECTION VARIABLES
const chooseRandomColorBtn = document.querySelector(".btn--random");
const randomWindow = document.querySelector(".random--window");
const randomChangeBtn = document.querySelector(".btn--change");
const rgbRandom = document.querySelector(".result-rgb");
const checkBoxRandom = document.getElementById('include-choose')

///// SET SECTION VARIABLES
const setColorWindow = document.querySelector(".setcolor--window");
const changeToSetBtn = document.querySelector(".change-to-set");
const setRGBinputs = [document.getElementById("input--rgb-red"),document.getElementById("input--rgb-green"),document.getElementById("input--rgb-blue")]
const chooseSetColorBtn = document.querySelector(".btn--set");

//// INITIAL COLOR VARIABLES
const initialRandom = 'rgb(170,199,255)'
const initialRandomBtn = 'rgb(55,116,233)'
const initialSet = 'rgb(115,96,144)'

//// INITIAL VARIABLES STORE IN DOM
randomWindow.style.zIndex = setColorWindow.style.zIndex = 90
backBtn.style.opacity = 0
randomHalf.style.opacity = setHalf.style.opacity = 100
setHalf.style.transform = randomHalf.style.transform = 'translateX(0%)'
randomWindow.style.opacity = setColorWindow.style.opacity = 0

//// FUNCTIONS
const moveHalf = function (half, where) {
  return (half.style.transform = `translateX(${where}%)`);
};

const randomRGBColor = function (style, text) {
  let r, g, b;
  r = Math.floor(Math.random() * 255 + 1);
  g = Math.floor(Math.random() * 255 + 1);
  b = Math.floor(Math.random() * 255 + 1);

  // Set random color to background
  style.style.backgroundColor = `rgb(${r},${g},${b})`;
  // set rgb color to text if need
  if (text) {
    text.textContent = `RGB (${r}, ${g}, ${b})`;
  } else return
};

const backSetting = function (move, opacity0, opacity100) {
  moveHalf(move, 0);
  opacity0.style.opacity = 0;
  opacity100.style.opacity = 100;
  backBtn.style.opacity = 0;
};

const setZIndex = function (more, less) {
  more.style.zIndex = Number(less.style.zIndex) + 1;
};

const randomInitial= function () {
  randomHalf.style.backgroundColor = initialRandom;
    randomChangeBtn.style.backgroundColor = initialRandomBtn;
    rgbRandom.textContent = 'RGB (170, 199, 255)';
    checkBoxRandom.checked = false
}
const backBtnClicked = function() {
  if (randomWindow.style.opacity === "100") {
    backSetting(setHalf, randomWindow, randomHalf);
    randomInitial();
  } else if (setColorWindow.style.opacity === "100") {
    backSetting(randomHalf, setColorWindow, setHalf);
    setHalf.style.backgroundColor = initialSet;
setRGBinputs.forEach((s) => s.value = '')
  }
}
// Choose option
const chooseOption = function (
  clickedHalf,
  oppositeHalf,
  clickedWindow, oppositeWindow,
) {
  let color, translateX;
  clickedHalf === randomHalf
    ? (color = "var(--main-blue)")
    : (color = "var(--main-violet)");
  //// change background color of body
  body.style.backgroundColor = String(color);
  //// remove opposite half
  clickedHalf === randomHalf ? (translateX = 100) : (translateX = -100);
  moveHalf(oppositeHalf, translateX);
  //// hide clicked half
  clickedHalf.style.opacity = 0;
  //// open window and show BACK btn
  clickedWindow.style.opacity = backBtn.style.opacity = 100;
  //// set z-index
  setZIndex(clickedWindow, oppositeWindow);
  // clickedWindow.classList.remove('hidden')
};

// Option on main menu
const chooseRandomColor = function () {
  chooseOption(randomHalf, setHalf, randomWindow, setColorWindow);
}
const chooseSetColor = function(){
  chooseOption(setHalf, randomHalf, setColorWindow, randomWindow);
}

// Click for changing background color randomly
const clickRandomBtn = function() {
  randomRGBColor(body, rgbRandom);
  if (checkBoxRandom.checked) {
    randomRGBColor(randomChangeBtn)} 
}


const changeSetColorBtn = function() {
  // check inputs for uses valid numbers
  let checkInputs = 1;
  setRGBinputs.forEach(inp => {
    if(inp.value === ''|| isNaN(inp.value) || inp.value>255 || inp.value <0) {checkInputs = null} else return
  })
  if(checkInputs===1) {
    body.style.backgroundColor = `rgb(${setRGBinputs[0].value},${setRGBinputs[1].value},${setRGBinputs[2].value})`;
  } else alert ('Please, input only valid numbers (between 0 - 255)')
}


////// RANDOM COLOR CLICK
//// Click on Random Color
chooseRandomColorBtn.addEventListener("click", function() {
  chooseRandomColor();
});

// Click X to mark/unmark checkbox BEFORE CHANGE COLOR
document.addEventListener('keydown', function(e) {
  if(randomWindow.style.opacity === '100' && e.key === 'x') {
    checkBoxRandom.checked ? checkBoxRandom.checked=false : checkBoxRandom.checked=true
  }})
// Click on Change color (Random)
randomChangeBtn.addEventListener("click", clickRandomBtn);

////// SET BUTTON CLICK
// CLICK ON SET COLOR
chooseSetColorBtn.addEventListener("click", chooseSetColor);

// Click on change to set color
changeToSetBtn.addEventListener("click", changeSetColorBtn);

// BACK BUTTON
backBtn.addEventListener("click", backBtnClicked)