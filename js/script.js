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

    // spinner 
    bookContainer.innerHTML = `

    <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>

    `

    searchResultContainer.textContent = '';

    noResultContainer.textContent = '';

    if (searchResult.length > 0) {
        const url = `https://openlibrary.org/search.json?q=${searchResult}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookData(data.docs))
            .catch(err => console.log(err))
    }
    else {

        // swal js alert 

        swal('please write something to display!!!')

        bookContainer.textContent = '';
    }

}

// display data to website 
const displayBookData = (books) => {

    // search item not found 
    if (books.length === 0) {
        noResultContainer.innerHTML = `
        <p class="text-center text-danger"> No result found </p>
        `
        searchResultContainer.textContent = '';
    }

    // search result summary 
    else if (books.length > 0) {

        searchResultContainer.innerHTML = `
    <p class="text-center text-success "> showing first ${books.length / 2} items of ${books.length} </p>
    `
    }

    // console.log(books.length, books)
    bookContainer.textContent = '';

    // showing all the books 
    books.slice(0, `${books.length / 2}`).forEach(book => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML =
            `
        <div class="card h-100 " >
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top card-image  " alt="image..">
                    <div class="card-body cardBodyColor ">
                        <h5 class="card-title text-center">${book.title}</h5>

                        <p class="card-text text-center"> <span> Author name: </span> ${book.author_name ? book.author_name : 'Not available'}</p>
                        <p class="card-text text-center"> <span> First Publish year: </span> ${book.first_publish_year ? book.first_publish_year : 'Not available'}</p>
                    </div>
                </div>
        `
        bookContainer.appendChild(div)
    })
}
