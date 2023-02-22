let inputString = "SUFFER";
let index = 0;
let textDelay = 100;

function setup() {
  createCanvas(400, 400);
  textSize(32);
  const button = createButton('Generate Text');
  button.mousePressed(getTextFromAPI);
  userinput = createInput('WHY');
  userinput.changed(getTextFromAPI);
}

function draw() {
  background(255);
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
  console.log("Hello");
  const userinput = document.querySelector('input').value;
  
  const response = await fetch("http://localhost:3000/generate", 
  {method: "post", body: {text: userinput}});
  console.log("Hello2");
  const data = await response.json();
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