let inputString = "This is the start";
let index = 0;
let textDelay = 100;
let backgroundImage;

function preload() {
 backgroundImage = loadImage('winne.png');
}

function setup() {
  createCanvas(400, 400);
  background(backgroundImage);
  textSize(22);
  const button = createButton('Generate Response');
  button.mousePressed(getTextFromAPI);
  const inputText = createInput('Enter your text here');
  inputText.input(function() {
    inputString = inputText.value();
  });
}

function draw() {
  background(backgroundImage);
  let displayString = "";
  let words = inputString.split(" ");
  let currentLine = "";
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (textWidth(currentLine + word) < width - 50) {
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
    let y = (height + lineHeight) / 2 + lineHeight * i;
    text(lineText, 50, y);
  }
}

let interval;
async function getTextFromAPI() {
  console.log("ello" + inputString);
  const response = await fetch("http://localhost:3000/generate", 
  {method: "post", body:{text: inputString}});
  const data = await response.json();
  console.log(data);
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
