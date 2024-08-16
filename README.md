# Book Finder and Quote Generator

## Overview

**Book Finder and Quote Generator** is a web application that allows users to search for books and generate random quotes. By integrating with the Google Books API and the Quote Generator API, this application offers an intuitive and user-friendly experience for both book enthusiasts and those looking for daily inspiration.

Explore the app live at: [Book Finder and Quote Generator](https://johnwgomez.github.io/book_finder/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)

## Features

- **Book Search**: Easily search for books by title, author, or genre, and view detailed information including title, author, description, cover image, preview link, and more.
- **Quote Generator**: Generate random quotes from a variety of categories to find daily inspiration.
- **Favorites Management**: Save your favorite books and access them anytime from a dedicated favorites page.
- **Responsive Design**: Enjoy a seamless experience on any device, with a responsive layout and design.

## Technologies Used

- **Frontend**:
  - HTML
  - Tailwind CSS
- **Backend**:
  - JavaScript
- **APIs**:
  - Google Books API
  - Quote Generator API

## Setup Instructions
Prerequisites

	•	Web Browser: Any modern web browser (Chrome, Firefox, Safari, etc.)
	•	Google Books API Key: Obtain from Google Cloud Console
	•	Quote Generator API Key: Obtain from API Ninjas

Running the Project Locally

Clone the Repository:git clone https://github.com/johnwgomez/book_finder.git

	2.	Open index.html:
	•	Open the index.html file in your web browser.
	•	A modal will prompt you to enter the Google Books API Key and Quote Generator API Key.
   **Google Books API Key:** AIzaSyAF346xBtlIrylYJvEP8dIP_L4581GQkOY
   **Quotes API Key:** ZdLWT6DldrWkI5DPZO9Dbw==XN3uwMFhiiv2ZNHy
	3.	Explore the Features:
	•	Use the search bar to find books by title, author, or genre.
	•	Generate random quotes by selecting a category from the dropdown menu.
	•	Save your favorite books and view them on the “Favorite Books” page.


## Project Structure

```plaintext
book_finder/
├── index.html            # Main landing page
├── results.html          # Page to display search results
├── favorites.html        # Page to display user's favorite books
├── landing.js            # JavaScript for handling the landing page functionality
├── logic.js              # JavaScript for handling search results and book saving
├── favorites.js          # JavaScript for handling the favorite books page
└── README.md             # Project documentation (this file)
