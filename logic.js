//code for the index page to show results

const savedBooks = localStorage.getItem("savedBooks");

const savedBooksArray = JSON.parse(savedBooks) || [];

const resultsDiv = document.getElementById("results");

for (const book of savedBooksArray) {
    const bookList = document.createElement("ul");
    const bookItem = document.createElement("li");
    const bookDiv = document.createElement("div");
    bookDiv.className = "book";
    const title = document.createElement("h2");
    title.textContent = book.title;
    const author = document.createElement("h3");
    author.textContent = book.author;
    const description = document.createElement("p");
    description.textContent = book.description;
    const image = document.createElement("img");
    image.src = book.image;
    const link = document.createElement("a");
    link.href = book.link;
    link.textContent = "Preview";
    const pageCount = document.createElement("p");
    pageCount.textContent = `Pages: ${book.pageCount}`;
    const publishedDate = document.createElement("p");
    publishedDate.textContent = `Published: ${book.publishedDate}`;
    const publisher = document.createElement("p");
    publisher.textContent = `Publisher: ${book.publisher}`;
    const rating = document.createElement("p");
    rating.textContent = `Rating: ${book.rating}`;
    const categories = document.createElement("p");
    categories.textContent = `Categories: ${book.categories}`;
    const isbn = document.createElement("p");
    isbn.textContent = `ISBN: ${book.isbn}`;
    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(description);
    bookDiv.appendChild(image);
    bookDiv.appendChild(link);
    bookDiv.appendChild(pageCount);
    bookDiv.appendChild(publishedDate);
    bookDiv.appendChild(publisher);
    bookDiv.appendChild(rating);
    bookDiv.appendChild(categories);
    bookDiv.appendChild(isbn);
    bookItem.appendChild(bookDiv);
    bookList.appendChild(bookItem);
    resultsDiv.appendChild(bookList);


}
