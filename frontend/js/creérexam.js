function enregistrerTemporairement() {
  const examen = {
    nom: document.getElementById('nomExamen').value,
    matiere: document.getElementById('matiere').value,
    duree: document.getElementById('duree').value,
    questionType: document.getElementById('questionType').value,
    description: document.getElementById('description').value,
  };

  for (let key in examen) {
    if (!examen[key]) {
      alert(`Veuillez remplir le champ: ${key}`);
      return;
    }
  }

  // ✅ Send to backend
  fetch("http://localhost:5000/api/exams/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(examen)
  })
    .then(res => res.json())
    .then(data => {
      alert(`Examen créé avec succès !\nVoici le lien pour y accéder :\n${data.examLink}`);
      // Save examId to reuse in ajouterQ page
      localStorage.setItem("examId", data.examId);
      localStorage.setItem("tempExamen", JSON.stringify(examen));
      window.location.href = "AjouterQ.html";
    })
    .catch(err => {
      console.error("Erreur création examen :", err);
      alert("Erreur lors de la création de l'examen.");
    });
}
