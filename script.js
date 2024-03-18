// ========== Resource ==========
const submitBook = document.querySelector("#form-book");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const year = document.querySelector("#year");
const isComplete = document.querySelector("#is-complete");
const finished = document.querySelector("#finished-reading");
const notFinished = document.querySelector("#not-finished-reading");
const main = document.querySelector("main");
const editBook = document.querySelector("#edit-book");
const formEdit = document.querySelector("#form-edit");
const editTitle = document.querySelector("#edit-title");
const editAuthor = document.querySelector("#edit-author");
const editYear = document.querySelector("#edit-year");

// ========== Config Local Storage ==========
const setStorage = () => {
  if (localStorage.getItem("books") === null) {
    localStorage.setItem("books", "[]");
  }
};
setStorage();

// ========== Event Submit Book ==========
submitBook.addEventListener("submit", function (e) {
  e.preventDefault();
  addBook(title.value, author.value, year.value, isComplete.checked);
  finished.innerHTML = renderBook(true);
  notFinished.innerHTML = renderBook(false);
  renderDefault();
  clearInput();
});

// ========== Event Load ==========
window.addEventListener("load", function () {
  if (localStorage.getItem("books") !== null) {
    finished.innerHTML = renderBook(true);
    notFinished.innerHTML = renderBook(false);
    renderDefault();
  }
});

// ========== Event Delete & Switch ==========
main.addEventListener("click", function (e) {
  // ========== Event Delete ==========
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  const id = e.target.parentElement.parentElement.parentElement.id;
  if (e.target.classList.contains("fa-trash-can")) {
    const newSB = storageBooks.filter((book) => book.id !== Number(id));
    localStorage.setItem("books", JSON.stringify(newSB));
    finished.innerHTML = renderBook(true);
    notFinished.innerHTML = renderBook(false);
    renderDefault();
  }
  // ========== Event Switch ==========
  if (e.target.classList.contains("fa-shuffle")) {
    const newSB = storageBooks.map((book) => {
      if (book.id === Number(id)) {
        book.isComplete = !book.isComplete;
      }
      return book;
    });
    localStorage.setItem("books", JSON.stringify(newSB));
    finished.innerHTML = renderBook(true);
    notFinished.innerHTML = renderBook(false);
    renderDefault();
  }
  // ========== Event Edit ==========
  if (e.target.classList.contains("fa-pen-to-square")) {
    editBook.classList.add("active");
    storageBooks.map((book) => {
      if (book.id === Number(id)) {
        editTitle.value = book.title;
        editAuthor.value = book.author;
        editYear.value = book.year;
      }
    });
    editBook.addEventListener("click", function (e) {
      if (e.target.classList.contains("fa-xmark")) {
        this.classList.remove("active");
      }
      if (e.target === editBook) {
        this.classList.remove("active");
      }
      if (e.target.classList.contains("edit-btn")) {
        this.classList.remove("active");
      }
      formEdit.addEventListener("submit", function (e) {
        e.preventDefault();
        const newSB = storageBooks.map((book) => {
          if (book.id === Number(id)) {
            book.title = editTitle.value;
            book.author = editAuthor.value;
            book.year = editYear.value;
          }
          return book;
        });
        localStorage.setItem("books", JSON.stringify(newSB));
        finished.innerHTML = renderBook(true);
        notFinished.innerHTML = renderBook(false);
      });
    });
  }
});

// ========== Function addBook ==========
const addBook = (title, author, year, isComplete) => {
  const book = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
  const storageBooks = JSON.parse(localStorage.getItem("books"));
  storageBooks.push(book);
  localStorage.setItem("books", JSON.stringify(storageBooks));
};

// ========== Function escapeHTML ==========
const escapeHtml = (_) => {
  return _.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
};

// ========== Function clearInput ==========
const renderBook = (status) => {
  const books = JSON.parse(localStorage.getItem("books"));
  let html = "";
  books.forEach((book, i) => {
    if ((status && book.isComplete) || (!status && !book.isComplete)) {
      html += /*html*/ `
        <tr id="${book.id}">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year}</td>
          <td class="buttons">
            <button class="switch-btn"><i class="fa-solid fa-shuffle fa-2xl"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can fa-2xl"></i></button>
            <button class="edit"><i class="fa-solid fa-pen-to-square fa-2xl"></i></button>
          </td>
        </tr>
      `;
    }
  });
  return html;
};

// ========== Function clearInput ==========
const renderDefault = () => {
  const html = /*html*/ `
  <tr>
    <td colspan="4" class="empty">The Bookshelf is Empty</td>
  </tr>
  `;
  if (localStorage.getItem("books") === "[]") {
    finished.innerHTML = html;
    notFinished.innerHTML = html;
  } else if (finished.innerHTML === "") {
    finished.innerHTML = html;
  } else if (notFinished.innerHTML === "") {
    notFinished.innerHTML = html;
  }
};

// ========== Function clearInput ==========
const clearInput = () => {
  title.value = "";
  author.value = "";
  year.value = "";
};
