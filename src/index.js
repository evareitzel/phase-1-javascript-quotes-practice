// Event Listeners
document.querySelector('#new-quote-form').addEventListener('submit', handleSubmit)

// Event Handlers
function handleSubmit(e){
  e.preventDefault()
  const newQuoteObj = {
    quote: e.target.new_quote.value,
    author: e.target.author.value
  }
  renderQuoteCard(newQuoteObj)
  saveNewQuote(newQuoteObj)
}

//  remove quote with delete button
function handleDeleteClick(e){

}

// Like button
  // PATCH

// DOM Render Functions
function renderQuoteCard(quoteObj){
 // Build Quote
 const quoteCard = document.createElement('li');
 quoteCard.className = 'quote-card';

 const blockQuote = document.createElement('blockquote')
 blockQuote.className = 'blockquote'

 const para = document.createElement('p');
 para.className = 'mb-0'
 para.innerHTML = quoteObj.quote

 const footer = document.createElement('footer');
 footer.className = 'blockquote-footer'
 footer.innerHTML = quoteObj.author

 const br = document.createElement('br');

 const likeBtn = document.createElement('button')
 likeBtn.className = 'btn-success'
 likeBtn.innerHTML = 'Likes: '
 const likesNum = document.createElement('span')
 likesNum.innerHTML = '0'
 likeBtn.append(likesNum)

 const deleteBtn = document.createElement('button')
 deleteBtn.className = 'btn-danger'
 deleteBtn.innerHTML = 'Delete'
//  deleteBtn.addEventListener('click', handleDeleteClick)
// deleteBtn.addEventListener('click', () => quoteCard.innerHTML = '')
deleteBtn.addEventListener('click', () => {
  quoteCard.remove()
  deleteQuote(quoteObj.id)
})

  // Add animal card to DOM 
  const quoteList = document.querySelector('#quote-list')

  blockQuote.append(para, footer, br, likeBtn, deleteBtn)
  quoteCard.append(blockQuote)
  quoteList.append(quoteCard)
}

// Fetches
  // CRUD - get, post, patch, delete
function getQuotes(){
  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    // .then((data) => console.log(data))
    .then((data) => {
      data.forEach(quoteObj => {
        renderQuoteCard(quoteObj)
      })
    })
}


function saveNewQuote(newQuoteObj){
  fetch('http://localhost:3000/quotes',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(newQuoteObj)

  })
  .then(resp => resp.json())
  .then((newQuote) => console.log(newQuote))
}

  // POST request to 'http://localhost:3000/likes'
    // body: JSON obj w quoteID(integer value)

function deleteQuote(id){
  fetch(`http://localhost:3000/quotes/${id}`,{ 
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(resp => resp.json())
.then((quote) => console.log(quote))
}


document.addEventListener('DOMContentLoaded', () => {
  getQuotes()
})