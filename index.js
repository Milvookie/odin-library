class Library {
    constructor() {
        this.el = document.querySelector('.books-list')
        this.list = []
    }

    addBook(book) {
        this.list.push(book)
        this.el.innerHTML += book.getHtml()
    }

    getIndex(id) {
        return this.list.findIndex((element) => element.id == id)
    }

    addEvent() {

        this.list.forEach((item) => {

            const btn = document.querySelector('button[data-book-index="' + item.id + '"]')

            const toggleSwitch = document.querySelector('div#' + item.id + ' div div label.switch input')

            toggleSwitch.addEventListener('change', (e) => {
                item.toggleSwitch()
                this.displayLog()
            })


            btn.addEventListener('click', (e) => {
                const element = document.getElementById(item.id)
                const index = this.getIndex(item.id)
                this.list.splice(index, 1)
                element.remove()
                this.displayLog()
            })

        })
    }

    displayLog() {
        const libraryLog = document.querySelector('.library-log')
        const data = this.list
        document.querySelector('.library-log .books-count .data').innerText = this.list.length

        const bookRead = data.reduce(function (acc, item) {
            if (item.read) {
                acc++
            }
            return acc
        }, 0)

        const bookNotRead = data.reduce(function (acc, item) {
            if (!item.read) {
                acc++
            }
            return acc
        }, 0)

        if (bookRead + bookNotRead == this.list.length) {
            document.querySelector('.library-log .books-read.yes .data').innerText = bookRead
            document.querySelector('.library-log .books-read.no .data').innerText = bookNotRead
        } else {
            console.log('THIS MESSAGE SHOULD NEVER LOG')
        }
    }
}

class Book {
    constructor(title, author, read) {
        this.title = title
        this.author = author
        this.read = read
        this.id = title.replace(/\s+/g, '')
    }

    toggleSwitch() {
        this.read = !this.read
    }

    getHtml() {
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
              <button class="delete-book" data-book-index=${this.id}>delete</button>
              </div>        
        </div>
    `
    }
}

const library = new Library()

function addBookToLibrary(book) {
    library.addBook(book)
    library.addEvent()
    library.displayLog()
}


//DUMMY DATA
const newBook = new Book('The Hobbit', 'J.R.R. Tolkien', false)
const harryPotter = new Book('Harry Potter and the Goblet of Fire', 'JK Rowling', true)
const h2g2 = new Book('HitchHicker Guide To The Galaxy', 'Douglas Adam', true)

function init() {
    library.addBook(newBook)
    library.addBook(harryPotter)
    library.addBook(h2g2)
    library.addEvent()
    library.displayLog()
}

init()

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

//FORM EVENT
const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    createBook(formData)
    document.querySelector('div.add-form').style.display = 'none'
})

function createBook(obj) {
    let book = new Book(obj.get('title'), obj.get('author'), obj.get('read') == 'true' ? true : false)
    addBookToLibrary(book)
}
