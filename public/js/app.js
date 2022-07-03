const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    if (location.length === 0) {
        messageTwo.textContent = 'Please enter a value!'
    } else {
        messageTwo.textContent = 'Loading...'
        const url = 'http://localhost:3000/weather?address=' + location
        fetch(url).then( (response) => {
            response.json().then( (data) => {
                if (data.error) {
                    messageTwo.textContent = data.error
                } else {
                    messageTwo.textContent = data.location + ' is ' 
                        + data.description + '. Temp: ' + data.temperature
                        + 'C. Feelslike: ' + data.feelslike + 'C.'
                }
            })
        })
    }
})