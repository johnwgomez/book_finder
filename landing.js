//code for the landing page and quote picker

const BookApi = "AIzaSyAF346xBtlIrylYJvEP8dIP_L4581GQkOY";
const quoteApi = "ZdLWT6DldrWkI5DPZO9Dbw==XN3uwMFhiiv2ZNHy";
const quoteGenerator = "https://api.api-ninjas.com/v1/quotes?category=";
const bookSearch = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
const searchInput = document.getElementById("searchInput");
const dropDownMenuButton = document.getElementById("dropdownDefaultButton");
const dropDownMenu = document.getElementById("dropdown");
const quoteCategories = document.querySelectorAll("a");
const quoteDiv = document.getElementById("quote");

document.addEventListener("submit", function (event) {
  //gets api information about the book searched
  //can add dropdown menu to search the parameter after the q= to search by author, title, etc
  event.preventDefault();
  fetch(`${bookSearch}${searchInput.value}&key=${BookApi}`)
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
      window.location.href = "results.html";
    });
});

dropDownMenuButton.addEventListener("click", function () {
  if (dropDownMenu.className === "visible") {
    dropDownMenu.className = "hidden";
  } else {
    dropDownMenu.className = "visible";
  }
});

quoteCategories.forEach((category) => {
  category.addEventListener("click", function () {
    category = category.innerHTML.toLowerCase();
    let fullURL = `${quoteGenerator}${category}`;
    fetch(fullURL, {
      method: "GET",
      headers: {
        "X-Api-Key": quoteApi,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
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

    dropDownMenu.className = "hidden";
  });
});
