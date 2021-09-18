const bookContainer = document.getElementById('books-container')
const searchResultContainer = document.getElementById('search-result-container')
const noResultContainer = document.getElementById('no-result')

// get search value from input field 

const getInputValue = () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value;
    console.log('search value', searchValue.length)

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
    searchResultContainer.innerHTML = '';
    noResultContainer.innerHTML = '';

    if (searchResult.length > 0) {
        const url = `https://openlibrary.org/search.json?q=${searchResult}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookData(data.docs))
            .catch(err => console.log(err))
    }
    else {
        alert('please write something to display')
        bookContainer.innerHTML = '';
    }

}

// display data to website 
const displayBookData = (books) => {

    if (books.length === 0) {
        noResultContainer.innerHTML = `
        <p> No result found </p>
        `
    }


    searchResultContainer.innerHTML = `
    <p> showing first ${books.length / 2} items of ${books.length} </p>
    `

    console.log(books.length, books)
    bookContainer.textContent = '';
    books.slice(0, `${books.length / 2}`).forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML =
            `
        <div class="card h-100" >
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top card-image " alt="image..">
                    <div class="card-body">
                        <h5 class="card-title text-center">${book.title}</h5>

                        <p class="card-text"> <span> Author name: </span> ${book.author_name ? book.author_name : 'Not available'}</p>
                        <p class="card-text"> <span> First Publish year: </span> ${book.first_publish_year ? book.first_publish_year : 'Not available'}</p>
                    </div>
                </div>
        `
        bookContainer.appendChild(div)
    })
}
