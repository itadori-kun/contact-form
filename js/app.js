let inputs = document.querySelectorAll('input')
let btn = document.querySelector('button')
const errs = document.querySelectorAll('.errmsg')
const textBox = document.querySelector('#message')
const errQuery = document.querySelector('.query-div')
const queryBoxes = document.querySelectorAll('.query-div--box')
const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
let success = document.querySelector('.success')

function validateInput (input, err) {
  if (input.value === '' || input.value === null) {
    input.style.borderColor = 'var(--red)'
    err.style.display = 'block'
    err.setAttribute('aria-invalid', 'true')
  } else {
    input.style.borderColor = 'var(--light-gray)'
    err.style.display = 'none'
    err.setAttribute('aria-invalid', 'false')
  }
}

function validateEmail (input, err) {
  if (!input.value.match(emailPattern)) {
    input.style.borderColor = 'var(--red)'
    err.style.display = 'block'
    err.setAttribute('aria-invalid', 'true')
  } else {
    input.style.borderColor = 'var(--light-gray)'
    err.style.display = 'none'
    err.setAttribute('aria-invalid', 'false')
  }
}

textBox.addEventListener('input', e => {
  validateTextBox(e)
})

function validateCheckbox (input, err) {
  if (!input.checked) {
    // err.innerText = 'Please select a query type'
    err.style.display = 'block'
  } else {
    err.innerHTML = ''
    // err.style.display = 'none'
  }
}

function validateTextBox (textBox, err) {
  if (textBox.value === '' || textBox.value === null) {
    textBox.style.borderColor = 'var(--red)'
    err.style.display = 'block'
    err.setAttribute('aria-invalid', 'true')
  } else {
    textBox.style.borderColor = 'var(--light-gray)'
    err.style.display = 'none'
    err.setAttribute('aria-invalid', 'false')
  }
}

// Function to change background color based on selected input
function changeBgColor () {
  inputs.forEach(input => {
    if (input.id === 'support-request' || input.id === 'general-enquiry') {
      // console.log('input:', input, 'index:', index)
      input.addEventListener('change', function () {
        // Reset all boxes to their default background color
        queryBoxes.forEach(box => {
          box.style.backgroundColor = ''
          errQuery.nextElementSibling.style.display = 'block'
        })

        // If the current input is checked, change the background color of the corresponding box
        if (input.checked) {
          input.parentElement.parentElement.style.backgroundColor =
            'var(--green-light)'
          errQuery.nextElementSibling.style.display = 'none'
        }
      })
    }
  })
}

changeBgColor()

// console.log(textBox)

inputs.forEach(input => {
  input.addEventListener('input', () => {
    console.log(input.value)

    // errs.style.display = 'block'

    if (input.value !== '' || input.value !== null) {
      // errs.style.display = 'none'
      // console.log(input.nextElementSibling)
      errs.forEach(err => {
        err.style.display = 'none'
      })
      input.style.borderColor = 'var( --grey-med )'
    }
  })
})

btn.addEventListener('click', function (e) {
  e.preventDefault()
  let allValid = true

  inputs.forEach((input, i) => {
    const err = errs[i]
    validateInput(input, err)

    if (input.id === 'email') {
      validateEmail(input, err)
    }

    if (input.id === 'consent') {
      validateCheckbox(input, err)
    }

    if (input.id === 'support-request' || input.id === 'general-enquiry') {
      validateCheckbox(input, err)
    }

    if (err.style.display === 'block') {
      allValid = false
    }
  })

  errs.forEach(err => {
    if (err.classList.contains('txt')) {
      validateTextBox(textBox, err)
      if (err.style.display === 'block') {
        allValid = false
      }
    }
  })

  if (allValid) {
    success.style.display = 'block'
    success.innerHTML = `
          <div class="success-heading">
              <img src="./assets/images/icon-success-check.svg" alt="" width="24px" height="24px">
              <h3>Message Sent!</h3>
            </div>
            <p>Thanks for completing the form. We'll be in touch soon!</p>
          </div>`
  } else {
    console.log('not valid')
  }
})
