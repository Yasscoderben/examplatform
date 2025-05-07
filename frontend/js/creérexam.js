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

    localStorage.setItem("tempExamen", JSON.stringify(examen));
    window.location.href = "AjouterQ.html";
  }