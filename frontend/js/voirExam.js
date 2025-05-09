function retour() {
  window.location.href = "auth.html";
}

window.onload = () => {
  fetch("http://localhost:5000/api/exams")
    .then(res => res.json())
    .then(exams => {
      const grid = document.getElementById("examensGrid");
      const emptyMsg = document.getElementById("emptyMessage");

      if (exams.length === 0) {
        emptyMsg.style.display = "block";
        return;
      }

      emptyMsg.style.display = "none"; // hide the "aucun exam" message

      exams.forEach(exam => {
        const card = document.createElement("div");
        card.className = "exam-card";
        card.innerHTML = `
          <h3>${exam.name}</h3>
          <p><strong>Matière:</strong> ${exam.subject}</p>
          <p><strong>Durée:</strong> ${exam.duration} min</p>
          <p><strong>Type:</strong> ${exam.questionType}</p>
          <p><strong>Description:</strong> ${exam.description || "Aucune description"}</p>
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erreur lors du chargement des examens:", err);
      document.getElementById("emptyMessage").textContent = "Erreur lors du chargement.";
    });
};
