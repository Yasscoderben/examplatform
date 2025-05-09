let examen = JSON.parse(localStorage.getItem("tempExamen"));
let questions = [];
let compteur = 0;
let isQCM = examen.questionType === "QCM";
let choiceCount = 0;

window.onload = () => {
  document.getElementById("statutAjout").textContent =
    `0 / ? questions ajoutées pour "${examen.nom}"`;

  if (isQCM) {
    document.getElementById("qcm-fields").classList.remove("hidden");
    document.getElementById("open-fields").classList.add("hidden");
    ajouterChoix();
    ajouterChoix();
  } else {
    document.getElementById("qcm-fields").classList.add("hidden");
    document.getElementById("open-fields").classList.remove("hidden");
  }
};

function ajouterChoix() {
  const container = document.getElementById("choices-container");
  const id = `choix${choiceCount}`;

  const div = document.createElement("div");
  div.classList.add("choix-row");
  div.innerHTML = `
    <input type="text" id="${id}" placeholder="Choix ${choiceCount + 1}" required>
    <input type="radio" name="correct" value="${id}"> Bonne réponse
  `;
  container.appendChild(div);
  choiceCount++;
}

function ajouterQuestion() {
  const mediaInput = document.getElementById("mediaFile");
  const media = mediaInput && mediaInput.files.length > 0
    ? mediaInput.files[0].name
    : null;

  if (isQCM) {
    const qText = document.getElementById("questionText").value.trim();
    const inputs = document.querySelectorAll("#choices-container input[type='text']");
    const radios = document.querySelectorAll("#choices-container input[type='radio']");

    let choix = {};
    let bonneReponse = null;

    inputs.forEach((input) => {
      if (input.value.trim()) {
        choix[input.id] = input.value.trim();
      }
    });

    radios.forEach(radio => {
      if (radio.checked) bonneReponse = radio.value;
    });

    if (!qText || Object.keys(choix).length < 2 || !bonneReponse) {
      alert("Veuillez remplir correctement la question QCM.");
      return;
    }

    const question = {
      type: "QCM",
      texte: qText,
      choix: JSON.stringify(choix),
      bonneReponse,
      media
    };

    questions.push(question);

    document.getElementById("questionText").value = "";
    document.getElementById("choices-container").innerHTML = "";
    document.getElementById("mediaFile").value = "";
    choiceCount = 0;
    ajouterChoix();
    ajouterChoix();

  } else {
    const qText = document.getElementById("questionTextOpen").value.trim();
    const answer = document.getElementById("expectedAnswer").value.trim();

    if (!qText || !answer) {
      alert("Veuillez remplir tous les champs de la question ouverte.");
      return;
    }

    const question = {
      type: "open",
      texte: qText,
      reponseAttendue: answer,
      media
    };

    questions.push(question);
    document.getElementById("questionTextOpen").value = "";
    document.getElementById("expectedAnswer").value = "";
    document.getElementById("mediaFile").value = "";
  }

  compteur++;
  document.getElementById("statutAjout").textContent =
    `${compteur} questions ajoutées pour "${examen.nom}"`;
}

function validerExamen() {
  if (questions.length === 0) {
    alert("Ajoutez au moins une question.");
    return;
  }

  const examId = localStorage.getItem("examId");

  fetch(`http://localhost:5000/api/exams/${examId}/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questions })
  })
    .then(res => res.json())
    .then(data => {
      alert("Toutes les questions ont été enregistrées !");
      window.location.href = "voirExam.HTML";
    })
    .catch(err => {
      console.error("Erreur:", err);
      alert("Erreur lors de l'enregistrement.");
    });
}
