const examId = new URLSearchParams(window.location.search).get("examId");
const examForm = document.getElementById("examForm");
let duration = 0;

window.onload = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/exams/${examId}/full`);
    const data = await res.json();

    console.log("BACKEND DATA:", data);
    console.log("QUESTIONS FROM BACKEND:", data.questions);

    showExam(data.exam, data.questions);
    startTimer(data.exam.duration);
  } catch (err) {
    alert("Erreur lors du chargement de l'examen.");
    console.error(err);
  }
};

function showExam(exam, questions) {
  document.querySelector("h2").textContent = exam.name;
  document.getElementById("timer").textContent = `Temps restant : ${exam.duration}:00`;
  duration = exam.duration;

  if (!questions.length) {
    examForm.innerHTML += "<p>Aucune question trouvée.</p>";
    return;
  }

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";

    const p = document.createElement("p");
    p.innerHTML = `<strong>${i + 1}. ${q.text}</strong>`;
    div.appendChild(p);

    // Optional media display
    if (q.media_url) {
      const ext = q.media_url.split('.').pop().toLowerCase();
      let media;
      if (["jpg", "jpeg", "png"].includes(ext)) {
        media = document.createElement("img");
        media.src = `/uploads/${q.media_url}`;
        media.width = 200;
      } else if (ext === "mp3") {
        media = document.createElement("audio");
        media.src = `/uploads/${q.media_url}`;
        media.controls = true;
      } else if (ext === "mp4") {
        media = document.createElement("video");
        media.src = `/uploads/${q.media_url}`;
        media.controls = true;
        media.width = 300;
      }
      if (media) div.appendChild(media);
    }

    // Render QCM
    if (q.type === "QCM") {
      let choix;
      try {
        choix = typeof q.choices === "string" ? JSON.parse(q.choices) : q.choices;
      } catch (err) {
        console.warn("Erreur parsing choix for question:", q.id, err);
        choix = {};
      }

      for (let key in choix) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `question_${q.id}`;
        input.value = key;
        label.appendChild(input);
        label.append(` ${choix[key]}`);
        div.appendChild(label);
        div.appendChild(document.createElement("br"));
      }
    }

    // Render open question
    else if (q.type === "open") {
      const textarea = document.createElement("textarea");
      textarea.name = `question_${q.id}`;
      textarea.rows = 3;
      div.appendChild(textarea);
    }

    examForm.appendChild(div);
  });

  // Add submit button
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Soumettre l'examen";
  submitBtn.type = "button";
  submitBtn.onclick = submitExam;
  examForm.appendChild(submitBtn);
}

function startTimer(minutes) {
  let totalSeconds = minutes * 60;
  const timerEl = document.getElementById("timer");

  const interval = setInterval(() => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    timerEl.textContent = `Temps restant : ${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    totalSeconds--;

    if (totalSeconds < 0) {
      clearInterval(interval);
      submitExam();
    }
  }, 1000);
}

function submitExam() {
  const inputs = examForm.elements;
  const answers = [];

  for (let input of inputs) {
    if (input.name.startsWith("question_")) {
      const qId = input.name.split("_")[1];

      if (input.type === "radio" && input.checked) {
        answers.push({ questionId: qId, answer: input.value });
      } else if (input.tagName === "TEXTAREA") {
        answers.push({ questionId: qId, answer: input.value.trim() });
      }
    }
  }

  const userId = localStorage.getItem("userId") || "anonymous"; // fallback if needed

  fetch(`http://localhost:5000/api/exams/${examId}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers, userId })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("lastScore", data.score);
      localStorage.setItem("lastTotal", data.total);
      alert(`Votre score : ${data.score}/${data.total}`);
      window.location.href = "resultat.html";
    })
    .catch(err => {
      alert("Erreur lors de la soumission.");
      console.error(err);
    });
}
