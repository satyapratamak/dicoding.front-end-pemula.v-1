let addBtn = document.querySelector("#add-btn");
let bookTitle = document.getElementById("book-title");
let author = document.getElementById("author");
let year = document.getElementById("year");
const isCompletes = document.querySelectorAll('input[name="is-complete"]');
let selectedIsComplete = true;


addBtn.addEventListener("click", (e) => {
    if (bookTitle.value == "" || author.value == "" || year.value == "") {
        return alert("Please add Book Title, Book Author and Year");

    } else {

        for (const isComplete of isCompletes) {
            if (isComplete.checked) {

                if (isComplete.value == "true") {
                    selectedIsComplete = true;
                } else {
                    selectedIsComplete = false;
                }

                break;
            }
        }

        let books = localStorage.getItem("books");

        if (books == null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }

        let myBookObj = {
            id: (new Date()).getTime(),
            title: bookTitle.value,
            author: author.value,
            year: year.value,
            isComplete: selectedIsComplete
        }

        booksObj.push(myBookObj);

        localStorage.setItem("books", JSON.stringify(booksObj));

        bookTitle.value = "";
        author.value = "";
        year.value = "";
        selectedIsComplete = true;

    }


});

let showBooks = () => {
    let books = localStorage.getItem("books");

    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }

    let html = "";
    let htmlNotComplete = "";

    booksObj.forEach((element, index) => {
        if (element.isComplete) {
            html += `
        
                <div id="complete-book">
                    <p class="complete-book-counter">BOOK - ${index + 1}</p>
                    <h3 class="complete-book-title">${element.title}</h3>
                    <p class="complete-book-author">${element.author}</p>
                    <p class="complete-book-year">${element.year}</p>
                    <button id="db-${element.id}" onClick="deleteBook(${element.id})" class="complete-book-btn"> DELETE BOOK </button>
                    <button id="eb-${element.id}" onClick="editBook(${element.id})" class="complete-book-btn edit-btn"> BACA ULANG </button>
                </div>
            `;

        } else {
            htmlNotComplete += `        
                <div id="not-complete-book">
                    <p class="complete-book-counter">BOOK - ${index + 1}</p>
                    <h3 class="complete-book-title">${element.title}</h3>
                    <p class="complete-book-author">${element.author}</p>
                    <p class="complete-book-year">${element.year}</p>
                    <button id="db-${element.id}" onClick="deleteBook(${element.id})" class="complete-book-btn"> DELETE BOOK </button>
                    <button id="eb-${element.id}" onClick="editBook(${element.id})" class="complete-book-btn edit-btn-1"> SELESAI BACA </button>
                </div>
            `;
        }
    });

    let completeBooksElmt = document.getElementById("complete-books");
    let notCompleteBooksElmt = document.getElementById("not-complete-books");

    if (booksObj.length != 0) {
        completeBooksElmt.innerHTML = html;
        notCompleteBooksElmt.innerHTML = htmlNotComplete;

    } else {
        completeBooksElmt.innerHTML = "No Books Yet! Please Add Book using form above..";
        notCompleteBooksElmt.innerHTML = "No Books Yet! Please Add Book using form above..";
    }



}



let deleteBook = (id) => {
    let confirmDel = confirm("Are you sure you want to delete this book?");

    if (confirmDel == true) {
        let books = localStorage.getItem("books");
        if (books == null) {
            booksObj = [];
        } else {
            booksObj = JSON.parse(books);
        }
        booksObj.splice(id, 1);
        localStorage.setItem("books", JSON.stringify(booksObj));
        showBooks();
    }
}

showBooks();



let editBook = (id) => {
    let books = localStorage.getItem("books");

    if (books == null) {
        booksObj = [];
    } else {
        booksObj = JSON.parse(books);
    }

    booksObj.forEach((element, index) => {
        if (element.id == id) {
            element.isComplete = !element.isComplete;
        }
    });
    localStorage.setItem("books", JSON.stringify(booksObj));
    showBooks();


}