const answers = JSON.parse(localStorage.getItem("examAnswers")) || {};

    let score = 0;
    if (answers.q1 === "Rabat") score++;
    if (answers.q2 === "Jbel Toubkal") score++;
    if (answers.q3 === "Dirham") score++;
    if (answers.q4 === "1956") score++;

    const resultatText = `
      Vous avez obtenu <strong>${score}/4</strong><br>
      ${score === 4 ? "Excellent travail !" :
        score === 3 ? "Bon effort !" :
        "Continuez à réviser !"}
    `;

    document.getElementById("resultat").innerHTML = resultatText;
    