class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook(book) {
        const row = document.createElement('tr');
        const list = document.getElementById('book-list');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class="remove" href="#">X</a></td>
        `;
        list.appendChild(row);
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, form);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    removeBook(target) {
        if (target.className === 'remove') {
            target.parentElement.parentElement.remove();
        }
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            ui.addBookList(book);
        });
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){}

}
document.addEventListener('DOMContentLoaded', Store.displayBooks);
document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please Fill in all the fields', 'error');
    }
    else {
        ui.addBook(book);
        Store.addBook(book);
        ui.showAlert('Book Added Successfully', 'success');
        ui.clearForm();
    }
    e.preventDefault();
});


document.querySelector('#book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.removeBook(e.target);
    ui.showAlert('Book Removed Successfully', 'success');
    e.preventDefault();
});