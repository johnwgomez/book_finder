//code for the index page to show results

const savedBooks = localStorage.getItem("savedBooks");

const savedBooksArray = JSON.parse(savedBooks) || [];

const resultsDiv = document.getElementById("results");

const clearButton = document.getElementById("clear");


for (const book of savedBooksArray) {
    //created the save button for the books
    const saveButton = document.createElement("button");
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
    
}
//added a if statement to clear the localstorage and by doing so clearing the page and we can do this by adding a button that says "Clear Search Results"

clearButton.addEventListener('click', function(event){
    event.preventDefault()
    localStorage.removeItem("savedBooks");
    location.reload();
    const noBooks = document.createElement('p')
    noBooks.className='font-serif text-xl antialiased text-gray-400/0'
    noBooks.textContent='Oops! Search for a Book'
    resultsDiv.appendChild(noBooks)
    
})
    
   

//Todo: add function to the save button so we can save books into another array 

//Todo: 