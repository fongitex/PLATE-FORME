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
const CLIENT_ID = "TA_CLIENT_ID";  // Remplace avec ton Client ID
const API_KEY = "TA_CLE_API";  // Remplace avec ta clé API
const SCOPES = "https://www.googleapis.com/auth/drive.file";

let tokenClient;
let accessToken = null;

// Fonction pour l'authentification Google
function initAuth() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
            accessToken = tokenResponse.access_token;
            document.getElementById("uploadBtn").disabled = false;
            alert("Connecté avec succès !");
            afficherFichiers();
        }
    });
}

// Connexion Google
document.getElementById("loginBtn").addEventListener("click", () => {
    tokenClient.requestAccessToken();
});

// Fonction pour uploader un fichier
async function uploadFile() {
    const fileInput = document.getElementById("fileInput").files[0];
    if (!fileInput || !accessToken) {
        alert("Sélectionne un fichier et connecte-toi !");
        return;
    }

    const metadata = {
        name: fileInput.name,
        mimeType: fileInput.type,
    };

    const formData = new FormData();
    formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    formData.append("file", fileInput);

    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
    });

    const result = await response.json();
    if (result.id) {
        alert("Fichier uploadé avec succès !");
        afficherFichiers();
    } else {
        alert("Erreur d'upload !");
        console.error(result);
    }
}

// Bouton upload
document.getElementById("uploadBtn").addEventListener("click", uploadFile);

// Fonction pour lister les fichiers sur Google Drive
async function afficherFichiers() {
    if (!accessToken) return;

    const response = await fetch("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    const data = await response.json();
    let fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    data.files.forEach(file => {
        let li = document.createElement("li");
        li.innerHTML = `<a href="https://drive.google.com/file/d/${file.id}/view" target="_blank">${file.name}</a>`;
        fileList.appendChild(li);
    });
}
