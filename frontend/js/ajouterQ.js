
const examId = new URLSearchParams(window.location.search).get("examId");
const choicesContainer = document.getElementById("choices-container");
let choixCount = 0;

window.onload = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/exams/${examId}/full`);
    const data = await res.json();
    const type = data.exam.questionType;

    if (type === "QCM") {
      document.getElementById("qcm-fields").classList.remove("hidden");
      document.getElementById("open-fields").classList.add("hidden");
    } else {
      document.getElementById("qcm-fields").classList.add("hidden");
      document.getElementById("open-fields").classList.remove("hidden");
    }
  } catch (err) {
    alert("Erreur lors du chargement de l'examen.");
    console.error(err);
  }
};

function ajouterChoix() {
  const key = String.fromCharCode(65 + choixCount); // A, B, C, D...

  const wrapper = document.createElement("div");
  wrapper.className = "choix-item";

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "bonneReponse";
  radio.value = key;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Choix ${key}`;
  input.className = "choix-input";
  input.setAttribute("data-key", key);

  wrapper.appendChild(radio);
  wrapper.appendChild(input);
  choicesContainer.appendChild(wrapper);

  choixCount++;
}

function ajouterQuestion() {
  const type = document.getElementById("qcm-fields").classList.contains("hidden") ? "open" : "QCM";
  const media = document.getElementById("mediaFile").files[0];

  if (type === "QCM") {
    const texte = document.getElementById("questionText").value.trim();
    const bonneRadio = document.querySelector("input[name='bonneReponse']:checked");
    const choixInputs = document.querySelectorAll(".choix-input");

    if (!texte || !bonneRadio || choixInputs.length < 2) {
      return alert("Veuillez remplir tous les champs QCM correctement.");
    }

    const choix = {};
    choixInputs.forEach(input => {
      const key = input.getAttribute("data-key");
      const val = input.value.trim();
      if (key && val) choix[key] = val;
    });

    const questionData = {
      type: "QCM",
      texte,
      choix,
      bonneReponse: bonneRadio.value,
      media: media ? media.name : null
    };

    envoyerQuestion(questionData);
  } else {
    const texte = document.getElementById("questionTextOpen").value.trim();
    const reponseAttendue = document.getElementById("expectedAnswer").value.trim();

    if (!texte || !reponseAttendue) {
      return alert("Veuillez remplir la question ouverte et sa réponse attendue.");
    }

    const questionData = {
      type: "open",
      texte,
      reponseAttendue,
      media: media ? media.name : null
    };

    envoyerQuestion(questionData);
  }
}

function envoyerQuestion(questionData) {
  fetch(`http://localhost:5000/api/exams/${examId}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions: [questionData] })
  })
    .then(res => res.json())
    .then(() => {
      alert("Question ajoutée !");
      clearForm();
    })
    .catch(err => {
      console.error(err);
      alert("Erreur lors de l'ajout de la question.");
    });
}

function clearForm() {
  document.getElementById("questionText").value = "";
  document.getElementById("questionTextOpen").value = "";
  document.getElementById("expectedAnswer").value = "";
  document.getElementById("mediaFile").value = "";
  choicesContainer.innerHTML = "";
  choixCount = 0;
}

function validerExamen() {
  window.location.href = `PasserExam.html?examId=${examId}`;
}