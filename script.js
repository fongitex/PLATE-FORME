function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username === "SADDIKI" && password === "Geanah") {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("uploadContainer").style.display = "block";
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
}

function uploadFile(event) {
    event.preventDefault();

    var fileInput = document.getElementById("fileInput");
    var fileName = fileInput.files[0].name;
    var fileLink = URL.createObjectURL(fileInput.files[0]);

    var importPassword = prompt("Entrez le mot de passe pour importer le fichier:");

    if (importPassword === "OCP@2025") {
        var table = document.getElementById("fileTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.rows.length);
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.textContent = fileName;
        cell2.innerHTML = `<a href="${fileLink}" target="_blank">Télécharger</a>`;
        cell3.innerHTML = `<button onclick="deleteFile(this)">Supprimer</button>`;

        fileInput.value = '';
    } else {
        alert("Mot de passe incorrect. L'importation est annulée.");
    }
}

function deleteFile(button) {
    var deletePassword = prompt("Entrez le mot de passe pour supprimer ce fichier:");

    if (deletePassword === "OCP@2025") {
        var row = button.parentElement.parentElement;
        row.parentNode.removeChild(row);
    } else {
        alert("Mot de passe incorrect. Action non autorisée.");
    }
}
