//code for the landing page and quote picker

let BookApi = 'AIzaSyAF346xBtlIrylYJvEP8dIP_L4581GQkOY'
let quoteApi = 'ZdLWT6DldrWkI5DPZO9Dbw==XN3uwMFhiiv2ZNHy'
let quoteGenerator = 'https://api.api-ninjas.com/v1/quotes?category='
let bookSearch = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
let searchInput = document.getElementById('searchInput') 
let dropDownMenuButton = document.getElementById('dropdownDefaultButton')
let dropDownMenu = document.getElementById('dropdown')
let quoteCategories = document.querySelectorAll('a')
let quoteDiv = document.getElementById('quote')


document.addEventListener('submit', function(event){
    //gets api information about the book searched
    //can add dropdown menu to search the parameter after the q= to search by author, title, etc
    event.preventDefault()
    fetch(`${bookSearch}${searchInput.value}&key=${BookApi}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.items[0].volumeInfo.title)

    }
    )
    window.replace('index.html')
    
})

dropDownMenuButton.addEventListener('click', function(){
    if(dropDownMenu.className === 'visible'){
        dropDownMenu.className = 'hidden'
    } else{
        dropDownMenu.className = 'visible'
    }

})

quoteCategories.forEach(category => {
    category.addEventListener('click', function(){
        category = category.innerHTML.toLowerCase();
        let fullURL= `${quoteGenerator}${category}`
        fetch(fullURL,{
            method: 'GET',
            headers: {
                'X-Api-Key': quoteApi,
                'Content-Type': 'application/json'

            }})
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const quoteEl = document.createElement('h3')
                quoteEl.className = ' font-bold tracking-tight text-gray-900 sm:text-6xl'
                quoteEl.innerHTML = data[0].quote
                quoteDiv.appendChild(quoteEl)
                const authorEl = document.createElement('h4')
                authorEl.className = ' mt-5 font-semibold text-gray-800 sm:text-4xl'
                authorEl.innerHTML = data[0].author
                quoteDiv.appendChild(authorEl)
                
                
        })

        dropDownMenu.className = 'hidden'

        
    })

    
})


