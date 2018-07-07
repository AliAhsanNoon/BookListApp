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
// class Book {
//     constructor(title, author, isbn) {
//       this.title = title;
//       this.author = author;
//       this.isbn = isbn;
//     }
//   }
  
//   class UI {
//     addBookToList(book) {
//       const list = document.getElementById('book-list');
//       // Create tr element
//       const row = document.createElement('tr');
//       // Insert cols
//       row.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.isbn}</td>
//         <td><a href="#" class="delete">X<a></td>
//       `;
    
//       list.appendChild(row);
//     }
  
//     showAlert(message, className) {
//       // Create div
//       const div = document.createElement('div');
//       // Add classes
//       div.className = `alert ${className}`;
//       // Add text
//       div.appendChild(document.createTextNode(message));
//       // Get parent
//       const container = document.querySelector('.container');
//       // Get form
//       const form = document.querySelector('#book-form');
//       // Insert alert
//       container.insertBefore(div, form);
  
//       // Timeout after 3 sec
//       setTimeout(function(){
//         document.querySelector('.alert').remove();
//       }, 3000);
//     }
  
//     deleteBook(target) {
//       if(target.className === 'delete') {
//         target.parentElement.parentElement.remove();
//       }
//     }
  
//     clearFields() {
//       document.getElementById('title').value = '';
//       document.getElementById('author').value = '';
//       document.getElementById('isbn').value = '';
//     }
//   }
  
//   // Local Storage Class
//   class Store {
//     static getBooks() {
//       let books;
//       if(localStorage.getItem('books') === null) {
//         books = [];
//       } else {
//         books = JSON.parse(localStorage.getItem('books'));
//       }
  
//       return books;
//     }
  
//     static displayBooks() {
//       const books = Store.getBooks();
  
//       books.forEach(function(book){
//         const ui  = new UI;
  
//         // Add book to UI
//         ui.addBookToList(book);
//       });
//     }
  
//     static addBook(book) {
//       const books = Store.getBooks();
  
//       books.push(book);
  
//       localStorage.setItem('books', JSON.stringify(books));
//     }
  
//     static removeBook(isbn) {
//       const books = Store.getBooks();
  
//       books.forEach(function(book, index){
//        if(book.isbn === isbn) {
//         books.splice(index, 1);
//        }
//       });
  
//       localStorage.setItem('books', JSON.stringify(books));
//     }
//   }
  
//   // DOM Load Event
//   document.addEventListener('DOMContentLoaded', Store.displayBooks);
  
//   // Event Listener for add book
//   document.getElementById('book-form').addEventListener('submit', function(e){
//     // Get form values
//     const title = document.getElementById('title').value,
//           author = document.getElementById('author').value,
//           isbn = document.getElementById('isbn').value
  
//     // Instantiate book
//     const book = new Book(title, author, isbn);
  
//     // Instantiate UI
//     const ui = new UI();
  
//     console.log(ui);
  
//     // Validate
//     if(title === '' || author === '' || isbn === '') {
//       // Error alert
//       ui.showAlert('Please fill in all fields', 'error');
//     } else {
//       // Add book to list
//       ui.addBookToList(book);
  
//       // Add to LS
//       Store.addBook(book);
  
//       // Show success
//       ui.showAlert('Book Added!', 'success');
    
//       // Clear fields
//       ui.clearFields();
//     }
  
//     e.preventDefault();
//   });
  
//   // Event Listener for delete
//   document.getElementById('book-list').addEventListener('click', function(e){
  
//     // Instantiate UI
//     const ui = new UI();
  
//     // Delete book
//     ui.deleteBook(e.target);
  
//     // Remove from LS
//     Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
//     // Show message
//     ui.showAlert('Book Removed!', 'success');
  
//     e.preventDefault();
//   });