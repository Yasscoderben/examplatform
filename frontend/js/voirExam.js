const examens = JSON.parse(localStorage.getItem("examens")) || [];
    const grid = document.getElementById("examensGrid");
    const emptyMessage = document.getElementById("emptyMessage");

    if (examens.length === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
      examens.forEach((examen, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <h3>${examen.nom}</h3>
          <p><strong>Matière:</strong> ${examen.matiere}</p>
          <p><strong>Niveau:</strong> ${examen.niveau}</p>
          <p><strong>Date:</strong> ${examen.date}</p>
          <p><strong>Durée:</strong> ${examen.duree} min</p>
          <p><strong>Questions:</strong> ${examen.questions.length}</p>
          <button onclick="window.location.href='ExamDetails.html?id=${index}'">voir l'exam </button>
        `;
        grid.appendChild(div);
      });
      function retour() {
      window.location.href = "auth.html";
    }
      
    }