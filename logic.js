//code for the index page to show results
const bookSearch = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
//selects elements by id 
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const clearButton = document.getElementById("clear");
const favoriteButton = document.getElementById('save')
const favoritePage = document.getElementById('favorites')

//gets the search results that are saved into the localStorage
const savedBooks = localStorage.getItem("savedBooks");

//parses the search results or creates an empty array if the results dont exist
const savedBooksArray = JSON.parse(savedBooks) || [];

// gets only the book api value from the local storage that is saved when the user submits it
const bookApiValue = localStorage.getItem('bookApi')

//sets a string for later use on the url 
const bookApi = 'api';




document.addEventListener("submit", function (event) {
    //gets api information about the book searched
    //can add dropdown menu to search the parameter after the q= to search by author, title, etc
    event.preventDefault();
    //uses bookApi value that is from the localStorage to set the value of the string by doing so we put the api into the url
    fetch(`${bookSearch}${searchInput.value}&key=${bookApi.value = bookApiValue}`)
      .then((response) => response.json())
      .then((data) => {
          //getting saved books from local storage
        const savedBooks = localStorage.getItem("savedBooks");
        //parsing to make an array
        const savedBooksArray = JSON.parse(savedBooks) || [];
  
        for (const item of data.items) {
          const book = {};
          book.title = item.volumeInfo.title;
          book.author = item.volumeInfo.authors[0];
          book.description = item.volumeInfo.description;
          book.image = item.volumeInfo.imageLinks.thumbnail;
          book.link = item.volumeInfo.previewLink;
          book.pageCount = item.volumeInfo.pageCount;
          book.publishedDate = item.volumeInfo.publishedDate;
          book.publisher = item.volumeInfo.publisher;
          book.rating = item.volumeInfo.averageRating;
          book.categories = item.volumeInfo.categories;
          book.isbn = item.volumeInfo.industryIdentifiers[0].identifier;
          //adds a new book to the array of saved books
          savedBooksArray.push(book);
        }
        
        console.log(savedBooksArray);
        // saves the books array to the local storage
        localStorage.setItem("savedBooks", JSON.stringify(savedBooksArray));
      });

  });
  

for (const book of savedBooksArray) {
    
    //created the save button for the books
    const saveButton = document.createElement("button");
    saveButton.id = 'save';
    saveButton.className = "rounded px-4 py-2 bg-indigo-900 text-white font-bold"
    saveButton.textContent = "Save Book"
    // created a button div to move the button on the list element
    const buttonDiv = document.createElement("div")
    buttonDiv.className = "w-1/2 p-4 mx-auto text-center";
    buttonDiv.appendChild(saveButton)

    //creates a list for the books
    const bookList = document.createElement("ul");

    //this is the list item for each book
    const bookItem = document.createElement("li");

    //creates another div inside the results div
    const bookDiv = document.createElement("div");
    bookDiv.className = "border-4 rounded mt-4 border-indigo-500 inline-block "
    
    //this is the title of the book
    const title = document.createElement("h2");
    title.className= "text-2xl font-bold tracking-tight text-gray-900 m-2"
    title.textContent = book.title;

    //creates an element for the author then sets the text to the authors name
    const author = document.createElement("h3");
    author.className = "text-2xl italic tracking-tight text-gray-600 m-2"
    author.textContent = book.author;

    //creates a p tag for the description and sets the text content from the data in the storage
    const description = document.createElement("p");
    description.className = 'h-40 overflow-scroll scroll-smooth border-4 rounded border-indigo-300 m-2'
    description.textContent = book.description;

    // this div was create to store the info about the book and move them inside the other div
    const bookElementsDiv = document.createElement('div');
    bookElementsDiv.className="relative -mt-40 py-40"

    //creates an image element and sets its source from the image on the data
    const image = document.createElement("img");
    image.src = book.image;
    image.className = 'absolute left-1'
    // this div was created to move the info elements on the right side of the bookDiv and its appended to the bookElementsDiv
    const infoDiv = document.createElement("div");
    infoDiv.className = 'absolute right-0 space-y-2';

    //create link element
    const link = document.createElement("a");
    //gets the link from the data in the storage and then sets is to the element to redirect to that link
    link.href = book.link;
    link.className = "rounded px-4 py-2 bg-indigo-900 text-white font-bold"
    link.textContent = "Preview";
    //create p tag and then get the description from the data and set the content of the element from the description
    const pageCount = document.createElement("p");
    pageCount.textContent = `Pages: ${book.pageCount}`;
    // creates p tag and sets the content to teh published date from the storage
    const publishedDate = document.createElement("p");
    publishedDate.textContent = `Published: ${book.publishedDate}`;
    //creates p tag adn sets the content of it from the storage
    const publisher = document.createElement("p");
    publisher.textContent = `Publisher: ${book.publisher}`;
    //creates the p tag and gets the rating from the storage
    const rating = document.createElement("p");
    rating.textContent = `Rating: ${book.rating}`;
    //creates a p tag and sets the content to the categories from the data
    const categories = document.createElement("p");
    categories.textContent = `Categories: ${book.categories}`;
    //creates a p tag for the ISBN of the book
    const isbn = document.createElement("p");
    isbn.textContent = `ISBN: ${book.isbn}`;
    // append title, author amd description to the main div
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(description);
    //append image to the second nested div which is bookElementsDiv
    bookElementsDiv.appendChild(image);
    //appends the info for the book to the third nested div which is infoDiv
    infoDiv.appendChild(link);
    infoDiv.appendChild(pageCount);
    infoDiv.appendChild(publishedDate);
    infoDiv.appendChild(publisher);
    infoDiv.appendChild(rating);
    infoDiv.appendChild(categories);
    infoDiv.appendChild(isbn);
    //appends infoDiv to bookElementsDiv
    bookElementsDiv.appendChild(infoDiv)
    //append the second div to the main div
    bookDiv.appendChild(bookElementsDiv)
    //append buttonDiv to the main div
    bookDiv.appendChild(buttonDiv);
    //append the div to the list item
    bookItem.appendChild(bookDiv);
    //appends the list item to the bookList
    bookList.appendChild(bookItem);
    //appends the bookList to the results div
    resultsDiv.appendChild(bookList);


    
    
//adds an event listener for the save button to save books into another array
    saveButton.addEventListener('click', function(event){
        //gets the favorite books from the localStorage
        const favoriteBooks = localStorage.getItem('favoriteBooks');
        //parses or sets an empty array
        const favoriteBooksArray = JSON.parse(favoriteBooks) || [];
        event.preventDefault();
        
        //gets the book that matches the text content of the element with the title of the book object from the array
        //Mia the Sub TA helped us for this line of code 
        const savedBook = savedBooksArray.find(book => book.title ===title.textContent)
        //checks for duplicates in the favoriteBooks array
        const duplicates = favoriteBooksArray.find(book => book.title.trim().toLowerCase() === title.textContent.trim().toLowerCase())
        
        //if not duplicates they will be added to the favorite books array
        if(!duplicates){
            favoriteBooksArray.push(savedBook)
        }
        
        //sets the favorite books array into the localStorage
        localStorage.setItem('favoriteBooks',JSON.stringify(favoriteBooksArray))

    })


    
    
    
}
//check if array is not empty and if not delete the savedBooks which are the search results
if(savedBooksArray){
    localStorage.removeItem('savedBooks');
}

//added an eventlistener to clear the localstorage and by doing so clearing the page

clearButton.addEventListener('click', function(event){
    event.preventDefault()
    resultsDiv.innerHTML = ''
    
})


//event listener to redirect to Favorite Books page

favoritePage.addEventListener('click', function(event){
    event.preventDefault();
    window.location.href = 'favorites.html'
})






    


//Todo: add the function of the api for the search again 

//Todo: add a function that whenever a search is performed again to delete localStorage and replace it with another localStorage


