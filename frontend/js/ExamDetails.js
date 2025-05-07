const examens = JSON.parse(localStorage.getItem("examens")) || [];
    const dernierExamen = examens[examens.length - 1];

    const container = document.getElementById("examenDetails");

    if (dernierExamen) {
      container.innerHTML = `
        <div class="info"><span>Nom:</span> ${dernierExamen.nom}</div>
        <div class="info"><span>Matière:</span> ${dernierExamen.matiere}</div>
        <div class="info"><span>Niveau:</span> ${dernierExamen.niveau}</div>
        <div class="info"><span>Date:</span> ${dernierExamen.date}</div>
        <div class="info"><span>Durée:</span> ${dernierExamen.duree} min</div>
        <div class="info"><span>Type:</span> ${dernierExamen.type}</div>
        <div class="info"><span>Mode:</span> ${dernierExamen.mode}</div>
        <div class="info"><span>Description:</span> ${dernierExamen.description}</div>
        <div class="info"><span>Propriétaire:</span> ${dernierExamen.proprietaire}</div>
        <hr>
        <h3 style="color:#004080;">Questions:</h3>
      `;

      dernierExamen.questions.forEach((q, index) => {
        container.innerHTML += `
          <div class="question-block">
            <h4>Question ${index + 1}</h4>
            <p>${q.texte}</p>
            <p><strong>A:</strong> ${q.choix.A}</p>
            <p><strong>B:</strong> ${q.choix.B}</p>
            <p><strong>C:</strong> ${q.choix.C}</p>
            <p><strong>D:</strong> ${q.choix.D}</p>
            <p><strong>Bonne réponse:</strong> ${q.bonneReponse}</p>
          </div>
        `;
      });
    } else {
      container.innerHTML = "<p>Aucun examen trouvé.</p>";
    }

    function retourDashboard() {
      window.location.href = "voirExam.html";
    }