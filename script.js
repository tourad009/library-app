const myLibrary = [];

// Constructor
function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages);
    newBook.status = status;
    myLibrary.push(newBook);
}

function displayBooksInTable() {
    const noBackground = document.querySelector(".no-book");
    const table = document.querySelector("table");
    if (myLibrary.length > 0) {
        noBackground.style.display = "none";
        table.style.display = "table";
        const tableBody = document.querySelector(".library tbody"); // Sélectionner le tbody
        tableBody.innerHTML = ""; // Vider le tableau avant d'ajouter les livres

        myLibrary.forEach((book, index) => {
            // Créer une nouvelle ligne
            const row = document.createElement("tr");

            // Créer & ajouter des cellules de données pour chaque livre
            const titleCell = document.createElement("td");
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement("td");
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const pagesCell = document.createElement("td");
            pagesCell.textContent = book.pages;
            row.appendChild(pagesCell);

            const readStatusCell = document.createElement("td");

            const readBtn = document.createElement("button");
            readBtn.style.fontSize = "13px";
            readBtn.style.color = "#fff";
            readBtn.style.backgroundColor = "#03C03C";

            // Initialiser l'état du bouton selon le statut du livre
            if (book.status === "read") {
                readBtn.style.backgroundColor = "#03C03C";
                readBtn.textContent = "Read";
            } else {
                readBtn.style.backgroundColor = "#FFBF00";
                readBtn.textContent = "Not read yet";
            }

            function toggleReadBtn() {
                if (readBtn.textContent === "Read") {
                    readBtn.style.backgroundColor = "#FFBF00";
                    readBtn.textContent = "Not read yet";
                }
                else if (readBtn.textContent === "Not read yet") {
                    readBtn.style.backgroundColor = "#03C03C";
                    readBtn.textContent = "Read";
                }
            }

            readBtn.addEventListener("click", toggleReadBtn);

            readStatusCell.appendChild(readBtn);
            row.appendChild(readStatusCell);

            const deleteCell = document.createElement("td");

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.style.backgroundColor = "#ED1B24";
            deleteBtn.style.fontSize = "13px";
            deleteBtn.style.color = "#fff";

            deleteBtn.addEventListener("click", () => {
                row.remove();
                myLibrary.splice(index, 1);
                displayBooksInTable();
            })

            deleteCell.appendChild(deleteBtn);

            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        })
    } else {
        noBackground.style.display = "flex"; // Afficher le fond "no book"
        table.style.display = "none"; // Masquer le tableau
    }
}

const newBookBtn = document.querySelector(".add-book");
const formDialog = document.querySelector(".form-dialog");
const cancelBtn = document.querySelector(".cancel-btn");
const wrapper = document.querySelector(".wrapper");

newBookBtn.addEventListener("click", () => formDialog.showModal());

cancelBtn.addEventListener('click', () => formDialog.close());

formDialog.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
        formDialog.close();
    }
});


const fieldElements = document.querySelectorAll(".field-element"); // Je récupère une NodeList
const validateBtn = document.querySelector(".validate-btn");
const warningMessage = document.querySelector(".warning-msg");

validateBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    let allFieldsFilled = true; // Variable pour vérifier si tous les champs sont remplis

    fieldElements.forEach((element) => {
        if (element.value === "") { // Vérifie la valeur des champs
            allFieldsFilled = false; // Si un champ est vide, change la variable
        }
    });

    if (!allFieldsFilled) {
        warningMessage.style.display = "block"; // Affiche le message d'avertissement
    } else {
        warningMessage.style.display = "none"; // Cache le message d'avertissement

        // Récupère l'état du radio button sélectionné (read ou not-read)
        const selectedStatus = document.querySelector('input[name="read-state"]:checked').value;
        
        // Ajoute le livre uniquement si tous les champs sont remplis
        addBookToLibrary(fieldElements[1].value, fieldElements[0].value, fieldElements[2].value, selectedStatus); // Title Author Pages
        displayBooksInTable();

        // Réinitialiser les champs après l'ajout
        fieldElements.forEach((element) => {
            element.value = ""; // Réinitialise chaque champ
        });
    }

    formDialog.close(); // Ferme le formulaire une fois l'opération réussie
});
