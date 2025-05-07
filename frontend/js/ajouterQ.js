let examen = JSON.parse(localStorage.getItem("tempExamen"));
    let questions = [];
    let compteur = 0;
    let isQCM = examen.questionType === "QCM";

    document.getElementById("statutAjout").textContent =
      `0 / ${examen.nbQuestions} questions ajoutées pour "${examen.nom}"`;

    window.onload = () => {
      if (isQCM) {
        document.getElementById("qcm-fields").classList.remove("hidden");
        document.getElementById("open-fields").classList.add("hidden");
      } else {
        document.getElementById("qcm-fields").classList.add("hidden");
        document.getElementById("open-fields").classList.remove("hidden");
      }
    };

    function ajouterQuestion() {
      if (isQCM) {
        const qText = document.getElementById("questionText").value.trim();
        const choixA = document.getElementById("choixA").value.trim();
        const choixB = document.getElementById("choixB").value.trim();
        const choixC = document.getElementById("choixC").value.trim();
        const choixD = document.getElementById("choixD").value.trim();
        const bonne = document.getElementById("bonneReponse").value.trim().toUpperCase();

        if (!qText || !choixA || !choixB || !choixC || !choixD || !['A', 'B', 'C', 'D'].includes(bonne)) {
          alert("Veuillez remplir tous les champs QCM correctement.");
          return;
        }

        const question = {
          type: "QCM",
          texte: qText,
          choix: { A: choixA, B: choixB, C: choixC, D: choixD },
          bonneReponse: bonne
        };

        questions.push(question);

        document.getElementById("questionText").value = "";
        document.getElementById("choixA").value = "";
        document.getElementById("choixB").value = "";
        document.getElementById("choixC").value = "";
        document.getElementById("choixD").value = "";
        document.getElementById("bonneReponse").value = "";
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
          reponseAttendue: answer
        };

        questions.push(question);

        document.getElementById("questionTextOpen").value = "";
        document.getElementById("expectedAnswer").value = "";
      }

      compteur++;
      document.getElementById("statutAjout").textContent =
        `${compteur} / ${examen.nbQuestions} questions ajoutées pour "${examen.nom}"`;

      if (compteur === parseInt(examen.nbQuestions)) {
        examen.questions = questions;

        let examens = JSON.parse(localStorage.getItem("examens")) || [];
        examens.push(examen);
        localStorage.removeItem("tempExamen");
        localStorage.setItem("examens", JSON.stringify(examens));

        alert("Toutes les questions ont été ajoutées avec succès !");
        window.location.href = "voirExam.HTML";
      }
    }