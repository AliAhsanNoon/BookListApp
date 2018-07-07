// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructors
function UI() { }

// Add Book to UI
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
   `;
    list.appendChild(row);
};

// Show Alert Messages

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    setTimeout(function () { document.querySelector('.alert').remove(); }, 3000);
};

// Remove Books from List
UI.prototype.removeBookFromList = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};
// Clear Fields

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    // Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please Fill in all the fields', 'error');
    }
    else {
        ui.addBookToList(book);
        ui.showAlert('Book Added Successfully', 'success');
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Delegation => Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.removeBookFromList(e.target);
    ui.showAlert('Book Removed', 'success');
    e.preventDefault();
});