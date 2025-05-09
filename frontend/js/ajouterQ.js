const examId = new URLSearchParams(window.location.search).get("examId");
const choicesContainer = document.getElementById("choices-container");
let choixCount = 0;

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
  const texte = document.getElementById("questionText").value.trim();
  const media = document.getElementById("mediaFile").files[0];
  const bonneRadio = document.querySelector("input[name='bonneReponse']:checked");

  if (!texte) return alert("Veuillez écrire la question.");
  if (!bonneRadio) return alert("Sélectionnez la bonne réponse.");

  const bonneReponse = bonneRadio.value;
  const choixInputs = document.querySelectorAll(".choix-input");

  const choix = {};
  choixInputs.forEach(input => {
    const key = input.getAttribute("data-key");
    const val = input.value.trim();
    if (key && val) choix[key] = val;
  });

  if (Object.keys(choix).length < 2) return alert("Ajoutez au moins 2 choix.");

  const questionData = {
    type: "QCM",
    texte,
    choix,
    bonneReponse,
    media: media ? media.name : null
  };

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
  document.getElementById("mediaFile").value = "";
  choicesContainer.innerHTML = "";
  choixCount = 0;
}

function validerExamen() {
  window.location.href = `PasserExam.html?examId=${examId}`;
}
