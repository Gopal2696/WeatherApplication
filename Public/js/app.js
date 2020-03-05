const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')



weatherform.addEventListener('submit', (e)=>{
    e.preventDefault() 
    const location = searchelement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if (data.error){
             messageOne.textContent = data.error
        }
        else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.weather
     }})
})  
})