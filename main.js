/**
 * 1. Initialize an XMLHttpRequest constructor
 * 2. Open a GET request, set the headers and response type
 * 3. Output successful response
 * 4. Output error state
 * 5. Combine with an event listener (button)
 * 6. Adjust UI states accordingly
 * 7. Bonus: change button CTA to indicate if it's the first joke or a "next" one
 */


/* DOM */
const btnGetJoke = document.querySelector('.joke__button')
const displayJoke = document.querySelector('.joke__show #joke')
const displayError = document.querySelector('.joke__error #error')
const loader = document.getElementById('loader')
const cta = document.querySelector('.button__cta') 

/* Get request */
const API_ENDPOINT = 'https://icanhazdadjoke.com/'

const XHR = new XMLHttpRequest()

const getJoke = () => {
  XHR.open('GET', API_ENDPOINT)
  XHR.setRequestHeader('Accept', 'application/json')
  XHR.responseType = 'json'
  
  XHR.onload = function () {
    showJoke(XHR.response)
    console.log(XHR.response)
    return XHR.response
  };
  
  XHR.onerror = function () {
    let error = '[Error]: Can\'t load the joke';
    console.error(error)
    showError(error)
    return error
  };
  XHR.send(null)
}

const showJoke = (response) => {
  let timeoutID = setTimeout(() => {
    displayError.style.display = 'none'
  
    displayJoke.innerHTML = response.joke
    displayJoke.style.display = 'block'
    setLoaderState(false)
    setBtnState(true)

  }, 700)

}

const showError = (error) => {
  displayJoke.style.display = 'none'

  displayError.innerHTML = error
  displayError.style.display = 'block'
}

function setLoaderState(isActived) {
  return loader.style.display = isActived ? 'block' : 'none'
}

function setBtnState(isActived) {
  cta.style.display = isActived ? 'block' : 'none'
  cta.innerHTML = 'Another One'
  return
}

btnGetJoke.addEventListener('click', () => {
  setLoaderState(true)
  setBtnState(false)
  getJoke()
})

