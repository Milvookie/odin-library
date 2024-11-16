const myLibrary = []

function Library() {
    this.htmlElement = document.querySelector('.books-list')
    this.list = [];

    this.addBook = function(book) {
        this.list.push(book)
    }

    this.getBookIndex = function(book) {
        return this.list.findIndex((element) => element.title == book.title) 
    }

    this.displayBook = function(book) {
        const html = `
        <div class="book-item" id="book-${this.getBookIndex(book)}">
                ${book.html()}
                  <div>
                  <button class="delete-book" onclick="deleteBook(${this.getBookIndex(book)})" data-book-index=${this.getBookIndex(book)}>delete</button>
                  </div>        
            </div>
        `
        this.htmlElement.innerHTML += html; 
    }

    this.deleteBook = function(book) {
        const element = document.getElementById(book.id)  
        myLibrary.splice(this.getBookIndex(book), 1)
        element.remove()
    }

    this.updateHTML = function() {
        console.log(this.list);
        
    }
}

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = title.replace(/\s+/g, '');

    this.getIndex = function () {
        return myLibrary.findIndex((element) => element.title == this.title) 
    }
    this.html = function() {
        return `
        <div>
                    <h4 class="book-title">${this.title}</h4>
                    <p class="book-author">${this.author}</p>
                </div>
                <div>
                    <p>Status</p>
                    <div>
                    <label class="switch">
                      <input type="checkbox" ${this.read ? 'checked' : ''}>
                      <span class="slider"></span>
                    </label> <span>${this.read ? 'Read' : 'Not read'}</span>
                    </div>
                  </div>
        `
    }
    this.getHtml = function () {
        return `
            <div class="book-item" id=${this.id}>
                <div>
                    <h4 class="book-title">${this.title}</h4>
                    <p class="book-author">${this.author}</p>
                </div>
                <div>
                    <p>Status</p>
                    <div>
                    <label class="switch">
                      <input type="checkbox" ${this.read ? 'checked' : ''}>
                      <span class="slider"></span>
                    </label> <span>${this.read ? 'Read' : 'Not read'}</span>
                    </div>
                  </div>

                  <div>
                  <button class="delete-book" onclick="deleteBook(${this.id})" data-book-index=${this.getIndex()}>delete</button>
                  </div>        
            </div>
        `
    }

    this.deleteBook = function() {
        const element = document.getElementById(this.id)  
        myLibrary.splice(this.getIndex(), 1)
        element.remove()
    }
}

const library = new Library()

const newBook = new Book('The Hobbit', 'J.R.R. Tolkien', false)
const harryPotter = new Book('Harry Potter and the Goblet of Fire', 'JK Rowling', true)
const h2g2 = new Book('HitchHicker Guide To The Galaxy', 'Douglas Adam', true)

library.addBook(newBook)
library.addBook(harryPotter)
library.displayBook(newBook)
library.displayBook(harryPotter)

//console.log(library.displayBook(newBook));

myLibrary.push(newBook, harryPotter, h2g2)

function displayLogs() {
    const htmlDivLibrary = document.querySelector('.books-list')
    const libraryLog = document.querySelector('.library-log')
    const bookEl = document.querySelectorAll('.book-item')
}

function addBookToLibrary() {
    const htmlDivLibrary = document.querySelector('.books-list')
    const bookEl = document.querySelectorAll('.book-item')
    
    for (let i = bookEl.length; i < myLibrary.length; i++) {
        const element = myLibrary[i];
        htmlDivLibrary.innerHTML += element.getHtml()
        console.log(element.getIndex());
    }
}

addBookToLibrary()

const addBookBtn = document.getElementById('add-book')
const closeFormBtn = document.getElementById('close-form')

addBookBtn.addEventListener('click', displayForm)
closeFormBtn.addEventListener('click', displayForm)

function displayForm() {
    const formEl = document.querySelector('div.add-form')
    const isDivShown = window.getComputedStyle(formEl).getPropertyValue('display')
    if (isDivShown == 'block') {
        formEl.style.display = 'none'
    } else {
        formEl.style.display = 'block'
    }
}

function createBook(book) {
    myLibrary.push(new Book(book.get('title'), book.get('author'), book.get('read') == 'true' ? true : false))
    addBookToLibrary()
}

//FORM EVENT
const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    createBook(formData)
    document.querySelector('div.add-form').style.display = 'none'
})

// const deleteBook = document.querySelectorAll('.delete-book')
// console.log(deleteBook);

function deleteBook(index) {
    const element = document.getElementById('book-' + index)  
    myLibrary.splice(index, 1)
    element.remove()
}

function updateHTML(index) {
    console.log(index);
    const bookEl = document.querySelectorAll('.book-item')
    for (let i = index; i < bookEl.length; i++) {
        const element = bookEl[i];
        console.log(element);
        console.log(element.id);
    }
}


