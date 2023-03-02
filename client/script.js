let inputString = " ";
let textBoxText = " ";
let index = 0;
let textDelay = 100;
let backgroundImage;

//loads bg image
function preload() {
 backgroundImage = loadImage('winne.png');
}

function setup() {
  createCanvas(400, 400);
  background(backgroundImage);
  textSize(18);
  const button = createButton('Generate Meme');
  button.mousePressed(getTextFromAPI);
  const inputText = createInput('');
  inputText.input(function() {
    inputString = inputText.value();
    
  });
}

function draw() {
  background(backgroundImage);
    //top font more normal
    textFont('Helvetica');
    let textBoxTextY = textAscent() + 10; // 10 is a padding
    text(textBoxText, 170, textBoxTextY+40);
    
    //Split and draw long strings as multiple lines
    let displayString = "";
    let words = inputString.split(" ");
    let currentLine = "";
    textFont('Brush Script MT');
    
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (textWidth(currentLine + word) < width - 170) {
        currentLine += word + " ";
      } else {
        displayString += currentLine + "\n";
        currentLine = word + " ";
      }
    }
    displayString += currentLine;
    let lines = displayString.split("\n");
    let lineHeight = textAscent() + textDescent();
    for (let i = 0; i < lines.length; i++) {
      let lineText = lines[i];
      let y = (height + lineHeight) / 3 + lineHeight * i;
      //textAlign(LEFT, CENTER);
      text(lineText, 170, y+130);
    }
  }

let interval;
async function getTextFromAPI() {
  console.log("ello" + inputString);
  //display orginal input on top
  textBoxText = inputString;
  const response = await fetch("http://localhost:3000/generate", 
  {method: "post", body:{text: inputString}});
  const data = await response.json();
  console.log(data);
  //AI generation on bottom
  inputString = data.text;
  
  textDelay = Math.floor(Math.random() * 200) + 50;
  clearInterval(interval);
  index = 0;
  interval = setInterval(function() {
    index++;
    if (index > inputString.length) {
      clearInterval(interval);
    }
  }, textDelay);
}
