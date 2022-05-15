const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBTN = document.getElementById("read");
const toggleBTN = document.getElementById("toggle");
const closeBTN = document.getElementById("close");

const dataArr = [
  {
    image: "./img/hurt.jpg",
    text: "כואב לי",
  },
  {
    image: "./img/tired.jpg",
    text: "בא לי לישון",
  },
  {
    image: "./img/food.jpg",
    text: "בא לי אוכל",
  },
  {
    image: "./img/drink.jpg",
    text: "בא לי שתיה",
  },

  {
    image: "./img/scared.jpg",
    text: "מפחיד",
  },
  {
    image: "./img/sad.jpg",
    text: "מעציב",
  },
  {
    image: "./img/angry.jpg",
    text: "מעצבן",
  },
  {
    image: "./img/happy.jpg",
    text: "משמח",
  },
  {
    image: "./img/grandma.jpg",
    text: "תביאו אותי אצל סבתא",
  },
  {
    image: "./img/school.jpg",
    text: "תביאו אותי לבית הספר",
  },
  {
    image: "./img/home.jpg",
    text: "תביאו אותי הביתה",
  },
  {
    image: "./img/outside.jpg",
    text: "תביאו אותי החוצה",
  },
];

dataArr.forEach(createBox);

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  const { image, text } = item;
  // instead of using item.image & item.text

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="info heb-page">${text}</p> 
  `;

  //speak event

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add an active effect
    box.classList.add("active-heb");
    setTimeout(() => box.classList.remove("active-heb"), 600);
  });

  main.appendChild(box);
}

// Init speech Synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);

// Toggle Text Box
toggleBTN.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);

// Close button
closeBTN.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

// Change voice
voicesSelect.addEventListener("change", setVoice);

// Read text button
readBTN.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
