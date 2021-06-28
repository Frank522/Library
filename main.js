let myLibrary = [];
const collection = document.querySelector('#collection');
const form = document.querySelector('#bookForm');
const submit = document.querySelector('button');
const titleTB = document.querySelector('form #title');
const authorTB = document.querySelector('form #author');
const pagesTB = document.querySelector('form #pageCount');
const haveReadCB = document.querySelector('form #haveRead');
const openFormBtn = document.querySelector('button#openForm');

openFormBtn.addEventListener('click', toggleForm);
const newBook = new Book('Infinite Jest', 'David Foster Wallace', 1191, true);
myLibrary.push(newBook);
addItemToCollection(newBook);

function Book(title, author, pages, haveRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.haveRead = haveRead
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.haveRead ? ", have read" : ", not read yet");
    }
}


function addBookToLibrary() {
    let haveRead = haveReadCB.text == 'on' ? true : false;
    let newBook = new Book(titleTB.value, authorTB.value, pagesTB.value, haveRead);
    newBook.haveRead = false;
    myLibrary.push(newBook);
    addItemToCollection(newBook);
    return false;
}

function addItemToCollection(book){
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.setAttribute('data', myLibrary.length - 1);
    let list = document.createElement('ul');
    list.appendChild(createListElement('Book Number', 'number', book));
    list.appendChild(createListElement('Title', 'title,', book));
    list.appendChild(createListElement('Author', 'author,', book));
    list.appendChild(createListElement('Pages', 'pageCount', book));
    list.appendChild(createListElement('Have I Read This?', 'haveRead', book));
    list.appendChild(createListElement('Remove Book', 'remove', book));
    bookDiv.appendChild(list);
    collection.appendChild(bookDiv);
}

function createListElement(text, classValue, book){
    let item = document.createElement('li');
    item.innerHTML = "<strong>" + text + ": </strong>"
    item.classList.add(classValue);
    let button = document.createElement('button');
    switch(text){
        case 'Book Number':
            item.innerHTML += myLibrary.length;
            break;
        case 'Title':
            item.innerHTML += book.title;
            break;
        case 'Author':
            item.innerHTML += book.author;
            break;
        case 'Pages':
            item.innerHTML += book.pages;
            break;
        case 'Have I Read This?':
            button.classList.add('toggleRead');
            button.innerText = book.haveRead ? 'yes' : 'no';
            item.appendChild(button);
            button.addEventListener('click', toggleRead);
            break;
        case 'Remove Book' :
            button.classList.add('removeBook');
            button.innerText = text;
            item.appendChild(button);
            button.addEventListener('click', removeBook)
            break;
    }
    return item;
}

function toggleRead(){
    let id = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data'));
    myLibrary[id].haveRead = !myLibrary[id].haveRead;
    this.innerText = myLibrary[id].haveRead ? 'yes' : 'no';
}

function toggleForm() {
    form.style.display = form.style.display == 'none' ? 'inline-block' : 'none';
}

function removeBook(){
    //remove the desired book from myLibrary
    let id = parseInt(this.parentElement.parentElement.parentElement.getAttribute('data'));
    myLibrary[id] = undefined;
    
    //removes book from collection in DOM
    books = Array.from(document.querySelectorAll(".book"));
    for(book in books){
        if(book.getAttribute('data') == id){
            collection.removeChild(book);
        }
    }
}

