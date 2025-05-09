function enregistrerTemporairement() {
  const examen = {
    name: document.getElementById('nomExamen').value,
    subject: document.getElementById('matiere').value,
    duration: document.getElementById('duree').value,
    questionType: document.getElementById('questionType').value,
    description: document.getElementById('description').value,
  };

  for (let key in examen) {
    if (!examen[key]) {
      alert(`Veuillez remplir le champ: ${key}`);
      return;
    }
  }

  fetch("http://localhost:5000/api/exams/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(examen)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erreur serveur");
      return res.json();
    })
    .then(data => {
      const examId = data.examId;
      alert(`Examen créé avec succès ! Maintenant ajoutez les questions.`);
      window.location.href = `AjouterQ.html?examId=${examId}`;
    })
    .catch(err => {
      console.error("Erreur création examen :", err);
      alert("Erreur lors de la création de l'examen.");
    });
}
