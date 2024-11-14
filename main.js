const myLibrary = []

function Book(title, author, pagesNumber, read) {
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${author}, ${this.pagesNumber} pages, ${this.read}`
    }
}

const newBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
const harryPotter = new Book('Harry Potter and the Goblet of Fire', 'JK Rowling', 326, 'read it')
const h2g2 = new Book('HitchHicker Guide To The Galaxy', 'Douglas Adam', 453, 'read it')
myLibrary.push(newBook, harryPotter, h2g2)

function addBookToLibrary() {
    const htmlDivLibrary = document.querySelector('.books-list')
    // htmlDivLibrary.innerHTML += html

    for (let i = 0; i < myLibrary.length; i++) {
        const element = myLibrary[i];
        const html = `            
        <div class="book-item">
            <h4 class="book-title">${element.title}</h4>
            <p class="book-author">${element.author}</p>
            <p class="pages-number">${element.pagesNumber} pages</p>
            <p class="book-read">${element.read}</p>
        </div>`
        htmlDivLibrary.innerHTML += html
    }
}

addBookToLibrary()

const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('submitted');
    const formData = new FormData(form)
    console.log(formData);
})
