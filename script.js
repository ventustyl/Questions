const questions = [
  {
    question:
      "Quel langage de programmation a été créé par Dennis Ritchie en 1972 ?",
    choices: ["Cobol", "C", "Python", "Language des Schtoumfs"],
    correctIndex: 1,
  },
  {
    question:
      "Quel est le nom du premier ordinateur électronique, construit en 1946 ?",
    choices: ["ENIAC", "EDVAC", "UNIVAC", "Terminator"],
    correctIndex: 0,
  },
  {
    question: "Qu'est-ce que l'algorithme de recherche Google ?",
    choices: ["PageRank", "GoogleBot", "Bing", "Jus de cerveau"],
    correctIndex: 0,
  },
  {
    question:
      "Quel langage de programmation a été créé par Yukihiro Matsumoto ?",
    choices: ["Ruby", "Javascript", "Python", "Java"],
    correctIndex: 0,
  },
  {
    question:
      "Quel système d'exploitation a été développé par Linus Torvalds ?",
    choices: ["Windows", "macOS", "Android", "Linux"],
    correctIndex: 3,
  },
  {
    question:
      "Quel est le protocole utilisé pour transférer des fichiers sur le web?",
    choices: ["HTTP", "FTP", "SMTP", "Protocole de transfert de pizzas"],
    correctIndex: 1,
  },
  {
    question:
      "Quelle est la principale utilisation du langage de programmation SQL ?",
    choices: [
      "Gestion de base de données",
      "Développement web",
      "Calcul scientifique",
      "Rédaction de romans",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Quelle entreprise a développé le langage de programmation Java ?",
    choices: ["Microsoft", "Apple", "Sun Microsystems", "Pieds Nickelés Inc"],
    correctIndex: 2,
  },
  {
    question: "Quelle est la principale différence entre IPv4 et IPv6 ?",
    choices: [
      "Taille de l'adresse IP",
      "Vitesse de connexion",
      "Sécurité",
      "Goût de la pizza",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Quel est le nom du superordinateur développé par IBM qui a joué au jeu 'Jeopardy!' ?",
    choices: ["Deep Blue", "Watson", "AlphaGo", "Super Skynet"],
    correctIndex: 1,
  },
  {
    question:
      "Quelle est la principale utilisation du langage de programmation R?",
    choices: [
      "Développement web",
      "Calcul scientifique",
      "Intelligence Artificielle",
      "Création de memes",
    ],
    correctIndex: 1,
  },
  {
    question:
      "Quel est le nom du langage de balisage utilisé pour structurer le contenu d'une page web ?",
    choices: ["HTML", "CSS", "JavaScript", "Gâteau au chocolat"],
    correctIndex: 0,
  },
  {
    question:
      "Quel est le nom de l'unité de mesure de la capacité de stockage des disques durs ?",
    choices: ["Byte", "Bit", "Nibble", "Croissant"],
    correctIndex: 0,
  },
  {
    question:
      "Quelle technologie est utilisée pour créer des images 3D dans les navigateurs web ?",
    choices: ["WebGL", "HTML 5", "CSS 3 ", "Peinture à l'huile"],
    correctIndex: 0,
  },
  {
    question: "Quel est le nom de l'inventeur de la machine à écrire ?",
    choices: [
      "Christopher Latham Sholes",
      "Charles Babbage",
      "Herman Hollerith",
      "Chapelier Fou",
    ],
    correctIndex: 0,
  },
  {
    question: "Quelle est la vitesse de la lumière dans la fibre optique ?",
    choices: ["300 000 km/s", "225 000 km/s", "200 000 km/s", "1 ecargot/s"],
    correctIndex: 1,
  },
  {
    question: "Quel est le nom du format d'image sans perte de qualité ?",
    choices: ["JPEG", "GIF", "PNG", "Format dinosaure"],
    correctIndex: 2,
  },
  {
    question:
      "Quel est le nom du célèbre test d'intelligence artificielle proposé par Alan Turing ?",
    choices: [
      "Le test de Turing",
      "Le test de Farnworth",
      "Le test de Voight-Kampff",
      "Le test des petits pois",
    ],
    correctIndex: 0,
  },
  {
    question:
      "Quel est le nom du réseau de neurones développé par Google pour la reconnaissance d'image ?",
    choices: ["Inception", "ResNet", "VGG", "PicassoNet"],
    correctIndex: 0,
  },
  {
    question: "Qui est le fondateur de l'entreprise SpaceX ?",
    choices: ["Jess Beezos", "Richard Branson", "Elon Musk", "Buzz l'Eclair"],
    correctIndex: 2,
  },
  // Ajoutez d'autres questions ici
];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const progressElement = document.getElementById("progress");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = `Question ${currentQuestionIndex + 1}/${
    questions.length
  }: ${question.question}`;

  choicesElement.innerHTML = "";
  question.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("label");
    choiceElement.innerHTML = `
            <input type="radio" name="choice" value="${index}">
            ${choice}
        `;
    choicesElement.appendChild(choiceElement);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Valider";
  submitButton.addEventListener("click", validateAnswer);
  choicesElement.appendChild(submitButton);

  updateProgress();
}

function validateAnswer() {
  const selectedRadio = document.querySelector('input[name="choice"]:checked');
  if (selectedRadio) {
    const selectedIndex = parseInt(selectedRadio.value);
    checkAnswer(selectedIndex);
  }
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  if (selectedIndex === question.correctIndex) {
    score += 1;
  } else {
    score = Math.max(score - 1, 0);
  }

  currentQuestionIndex += 1;
  updateProgress();
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function updateProgress() {
  const progressPercent = (currentQuestionIndex / questions.length) * 100;
  progressElement.style.width = `${progressPercent}%`;
}

function showScore() {
  questionElement.textContent = `Votre score est de ${score}/${questions.length}`;

  choicesElement.innerHTML = "";

  const restartButton = document.createElement("button");
  restartButton.textContent = "Rejouer";
  restartButton.addEventListener("click", restartQuiz);
  choicesElement.appendChild(restartButton);

  progressElement.style.width = "100%";
}

function startQuiz() {
  document.querySelector(".intro").style.display = "none"; // Cacher l'introduction
  document.getElementById("questionnaire").style.display = "block"; // Afficher le questionnaire
  showQuestion();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.querySelector(".intro").style.display = "block"; // Afficher l'introduction
  document.getElementById("questionnaire").style.display = "none"; // Cacher le questionnaire
}
