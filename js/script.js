// get search value from input field 

const getInputValue = () => {
    const searchField = document.getElementById('search-field')
    const searchValue = searchField.value;
    return searchValue;
    // console.log(searchValue)
}

// load data from api 

const loadBookData = () => {
    const searchResult = getInputValue();
    const url = `https://openlibrary.org/search.json?q=${searchResult}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.docs))

}


