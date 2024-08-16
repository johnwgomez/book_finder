//code for the landing page and quote picker
//select elements to be used on the script
const modalForm = document.getElementById('modelConfirm');
const BookApi = document.getElementById('bookApi')
const quoteApi = document.getElementById('quoteApi')
const searchInput = document.getElementById("searchInput");
const dropDownMenuButton = document.getElementById("dropdownDefaultButton");
const dropDownMenu = document.getElementById("dropdown");
const quoteCategories = document.querySelectorAll("a");
const quoteDiv = document.getElementById("quote");
const indexPage = document.getElementById('indexPage');
const submitKey = document.getElementById('submitKey');
const favoritesButton = document.getElementById('favoritesButton');

//urls to be populated with user searches and api keys
const quoteGenerator = "https://api.api-ninjas.com/v1/quotes?category=";
const bookSearch = "https://www.googleapis.com/books/v1/volumes?q=intitle:";

const savedQuoteApi = localStorage.getItem('quoteApi');


// gets book api from storage and saves it into the hideModal const
const hideModal = localStorage.getItem('bookApi');

//These are used for the search field modal
const searchModal = document.getElementById("searchModal")
const closeButton = document.getElementById("close-modal-btn")



// adds an event listener to the favorites button to take to the favorites page
favoritesButton.addEventListener('click', function(){
  window.location.href = "favorites.html"
})

// on page load the modal pops up by using a timeout function
setTimeout(function(){
  //sets the classname of the modal to visible
  modalForm.className = 'visible'
  //checks if the hideModal const is equal to true and if it is hides the modal
  if(hideModal){
    modalForm.className= 'hidden'
    // if the first statement is not true displays the modal and gives styling to it
  }else if(modalForm.className === 'visible'){
    modalForm.className ='absolute visible z-50 inset-0 bg-gray-900 overflow-y-auto h-full w-full px-4 fixed pin'
  }


}, 100)

//adds event listener for the submit key
submitKey.addEventListener('click', function(){
  //checks if the values of the api field are null or undefined if so renders the modal again
  if(!BookApi.value && !quoteApi.value){
    alert("Please Enter the Api Keys to proceed!")
    modalForm.className = 'absolute visible z-50 inset-0 bg-gray-900 overflow-y-auto h-full w-full px-4 fixed pin'

 //hides the modal and sets the values of input fields to local storage
  }else {
  localStorage.setItem('bookApi', BookApi.value)
  localStorage.setItem('quoteApi', quoteApi.value)
  modalForm.className='hidden'
  }

  
  

})






//adds event listener for whenver the users submits a search term
document.addEventListener("submit", function (event) {
  //gets api information about the book searched
  event.preventDefault();

  // Modal will warn users if they enter a blank search  
if (searchInput.value === ''){
  event.preventDefault();
  searchModal.className = "visible";
}

closeButton.addEventListener('click', function(){

  searchModal.className = "hidden";
})

  fetch(`${bookSearch}${searchInput.value}&key=${BookApi.value}`)
    .then((response) => response.json())
    .then((data) => {
      //getting saved books from local storage
      const savedBooks = localStorage.getItem("savedBooks");
      //parsing to make an array
      const savedBooksArray = JSON.parse(savedBooks) || [];
      //a for loop to set the object with every parameter from the api
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
      // redirects to the results page
      window.location.href = "results.html";
    });
});


//when the button is clicked a dropdown menu is shown to choose the category of quotes
dropDownMenuButton.addEventListener("click", function () {
  //conditional check for when to display the menu
  if (dropDownMenu.className === "visible") {
    dropDownMenu.className = "hidden";
  } else {
    dropDownMenu.className = "visible";
  }
});


//based on whats clicked to the menu adds a category to the url and then addss the value of the api 
quoteCategories.forEach((category) => {
  category.addEventListener("click", function () {
    category = category.innerHTML.toLowerCase();
    let fullURL = `${quoteGenerator}${category}`;
    fetch(fullURL, {
      method: "GET",
      headers: {
        "X-Api-Key": quoteApi.value = savedQuoteApi, //give it the value of the string saved in the local storage
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      //based on the data it creates an element that will render the quote on the page
      .then((data) => {
        console.log(data);
        const quoteEl = document.createElement("h3");
        quoteEl.className =
          " font-bold tracking-tight text-gray-900 sm:text-6xl";
        quoteEl.innerHTML = data[0].quote;
        quoteDiv.appendChild(quoteEl);
        const authorEl = document.createElement("h4");
        authorEl.className = " mt-5 font-semibold text-gray-800 sm:text-4xl";
        authorEl.innerHTML = data[0].author;
        quoteDiv.appendChild(authorEl);
      });

      
//hides the menu when everything is done
    dropDownMenu.className = "hidden";
  });
});


