// Fonction pour vérifier le mot de passe et afficher la plateforme
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "SADDIKI" && password === "Geanah") {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("uploadContainer").style.display = "block";
        loadFiles(); // Charger les fichiers existants
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

// Fonction pour importer un fichier
function uploadFile(event) {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    var fileInput = document.getElementById("fileInput");
    var fileName = fileInput.files[0].name; // Récupère le nom du fichier
    var fileLink = URL.createObjectURL(fileInput.files[0]); // Crée un lien pour le fichier téléchargé

    // Demande le mot de passe pour importer
    var importPassword = prompt("Entrez le mot de passe pour importer le fichier:");

    if (importPassword === "OCP@2025") {
        // Ajoute une nouvelle ligne dans le tableau
        var table = document.getElementById("fileTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.textContent = fileName;
        cell2.innerHTML = `<a href="${fileLink}" target="_blank">Télécharger</a>`;
        cell3.innerHTML = `<button onclick="deleteFile(this)">Supprimer</button>`;

        // Sauvegarde le fichier dans localStorage
        saveFile(fileName, fileLink);

        // Réinitialise le champ de fichier
        fileInput.value = '';
    } else {
        alert("Mot de passe incorrect. L'importation est annulée.");
    }
}

// Fonction pour sauvegarder les fichiers dans localStorage
function saveFile(fileName, fileLink) {
    var files = JSON.parse(localStorage.getItem("files")) || [];
    files.push({ name: fileName, link: fileLink });
    localStorage.setItem("files", JSON.stringify(files));
}

// Fonction pour charger les fichiers depuis localStorage
function loadFiles() {
    var files = JSON.parse(localStorage.getItem("files")) || [];
    var table = document.getElementById("fileTable").getElementsByTagName('tbody')[0];

    files.forEach(function(file) {
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.textContent = file.name;
        cell2.innerHTML = `<a href="${file.link}" target="_blank">Télécharger</a>`;
        cell3.innerHTML = `<button onclick="deleteFile(this)">Supprimer</button>`;
    });
}

// Fonction pour supprimer un fichier du tableau
function deleteFile(button) {
    var deletePassword = prompt("Entrez le mot de passe pour supprimer ce fichier:");

    if (deletePassword === "OCP@2025") {
        var row = button.parentElement.parentElement;
        var fileName = row.cells[0].textContent;
        
        // Supprime le fichier du localStorage
        var files = JSON.parse(localStorage.getItem("files")) || [];
        files = files.filter(file => file.name !== fileName);
        localStorage.setItem("files", JSON.stringify(files));

        // Supprime la ligne du tableau
        row.parentNode.removeChild(row);
    } else {
        alert("Mot de passe incorrect. Action non autorisée.");
    }
}
