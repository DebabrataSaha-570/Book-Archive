const bookContainer = document.getElementById('books-container')

// get search value from input field 

const getInputValue = () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value;

    searchField.value = '';
    return searchValue;
}

// load data from api 

const loadBookData = () => {
    const searchResult = getInputValue();

    bookContainer.innerHTML = `
    <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `
    const url = `https://openlibrary.org/search.json?q=${searchResult}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBookData(data.docs))

}

// display data to website 
const displayBookData = (books) => {
    console.log(books)
    bookContainer.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML =
            `
        <div class="card h-100" >
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top card-image " alt="image..">
                    <div class="card-body">
                        <h5 class="card-title text-center">${book.title}</h5>
                        <p class="card-text"> <span> Author name: </span> ${book.author_name}</p>
                        <p class="card-text"> <span> First Publish year: </span> ${book.first_publish_year}</p>
                    </div>
                </div>
        `
        bookContainer.appendChild(div)
    })
}
