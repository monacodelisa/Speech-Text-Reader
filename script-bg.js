const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBTN = document.getElementById("read");
const toggleBTN = document.getElementById("toggle");
const closeBTN = document.getElementById("close");

const dataArr = [
  {
    image: "./img/drink.jpg",
    text: "Жадно ми е",
  },
  {
    image: "./img/food.jpg",
    text: "Гладно ми е",
  },
  {
    image: "./img/tired.jpg",
    text: "Изморено ми е",
  },
  {
    image: "./img/hurt.jpg",
    text: "Боли ме",
  },
  {
    image: "./img/happy.jpg",
    text: "Радвам се",
  },
  {
    image: "./img/angry.jpg",
    text: "Ядосвам се",
  },
  {
    image: "./img/sad.jpg",
    text: "Тъжно ми е",
  },
  {
    image: "./img/scared.jpg",
    text: "Страх ме е",
  },
  {
    image: "./img/outside.jpg",
    text: "Искам навън",
  },
  {
    image: "./img/home.jpg",
    text: "Искам вкъщи",
  },
  {
    image: "./img/school.jpg",
    text: "Искам на училище",
  },
  {
    image: "./img/grandma.jpg",
    text: "Искам при Баба",
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
    <p class="info bg-page">${text}</p> 
  `;

  //speak event

  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    // Add an active effect
    box.classList.add("active-bg");
    setTimeout(() => box.classList.remove("active-bg"), 600);
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
