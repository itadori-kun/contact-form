document.addEventListener('DOMContentLoaded', function () {
  let inputs = document.querySelectorAll('input')
  let btn = document.querySelector('button')
  const errs = document.querySelectorAll('.errmsg')
  let textBox = document.getElementById('message')
  const errQuery = document.querySelector('.query-div')
  const queryBoxes = document.querySelectorAll('.query-div--box')
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  let success = document.querySelector('.success')
  const errMsg = 'This field is required'

  function inputValidate (input) {
    const err = input.nextElementSibling
    // check if input field is empty and display error message if not
    if (input.value.trim() === '' || input.value.trim() === null) {
      input.style.borderColor = 'var(--red)'
      err.style.display = 'block'
      err.innerHTML = errMsg
      err.setAttribute('aria-invalid', 'true')
    } else {
      input.style.borderColor = 'var(--light-gray)'
      err.style.display = 'none'
      err.innerHTML = ''
      err.setAttribute('aria-invalid', 'false')
    }
  }

  function textBoxValidate (e) {
    // check if textbox is empty and display error message if not
    if (e.value.trim() === '' || e.value.trim() === null) {
      e.style.borderColor = 'var(--red)'
      e.nextElementSibling.style.display = 'block'
      e.nextElementSibling.innerHTML = errMsg
      e.nextElementSibling.setAttribute('aria-invalid', 'true')
    } else {
      e.style.borderColor = 'var(--light-gray)'
      e.nextElementSibling.style.display = 'none'
      e.nextElementSibling.innerHTML = ''
      e.nextElementSibling.setAttribute('aria-invalid', 'false')
    }
  }

  // function radioValidate (input) {
  //   const err = errQuery.nextElementSibling
  //   if (!input.checked && input.type === 'radio') {
  //     queryBoxes.forEach(box => {
  //       // box.style.backgroundColor = ''
  //       err.innerHTML = 'Please select a query type'
  //       // err.style.display = 'block'
  //     })
  //   } else {
  //     // reset background color to default
  //     queryBoxes.forEach(box => {
  //       box.style.backgroundColor = ''
  //       err.style.display = 'block'
  //     })
  //     // change background color of selected box and reset error message
  //     input.parentElement.parentElement.style.backgroundColor =
  //       'var(--green-light)'
  //     err.innerHTML = ''
  //     err.style.display = 'none'
  //     err.setAttribute('aria-invalid', 'false')
  //   }
  // }
  function radioValidate (input) {
    const err = errQuery.nextElementSibling
    let isChecked = false
    queryBoxes.forEach(box => {
      const radioInput = box.querySelector('input[type="radio"]')

      // If one of the radio buttons is checked
      if (radioInput.checked) {
        isChecked = true

        // Reset the background color of all query boxes
        queryBoxes.forEach(box => {
          box.style.backgroundColor = '' // Reset background color
        })

        // Set the background color for the selected radio box
        radioInput.parentElement.parentElement.style.backgroundColor =
          'var(--green-light)'

        // Remove error message
        err.innerHTML = ''
        err.style.display = 'none'
        err.setAttribute('aria-invalid', 'false')
      }
    })

    // If no radio button is selected, show the error message
    if (!isChecked) {
      queryBoxes.forEach(() => {
        // Display error message
        err.innerHTML = 'Please select a query type'
        err.style.display = 'block'
        err.setAttribute('aria-invalid', 'true')
      })
    }
  }

  function checkboxValidate (input) {
    const err = input.parentElement.nextElementSibling
    // check if checkbox is checked and display error message if not
    if (!input.checked) {
      err.style.display = 'block'
      err.setAttribute('aria-invalid', 'true')
      err.innerHTML = 'To submit the form, you must consent to being contacted'
    } else {
      err.innerHTML = ''
      err.style.display = 'none'
      err.setAttribute('aria-invalid', 'false')
    }
  }

  // email validation
  function validateEmail (input) {
    const err = input.nextElementSibling
    // check if email is valid and display error message if not
    if (!input.value.match(emailPattern)) {
      input.style.borderColor = 'var(--red)'
      err.style.display = 'block'
      err.setAttribute('aria-invalid', 'true')
      err.innerHTML = 'Please enter a valid email address'
    } else {
      input.style.borderColor = 'var(--light-gray)'
      err.style.display = 'none'
      err.setAttribute('aria-invalid', 'false')
      err.innerHTML = ''
    }
  }

  function successPopup () {
    // display success message with javacript innerHTML
    success.style.display = 'block'
    success.innerHTML = `
          <div class="success-heading">
              <img src="./assets/images/icon-success-check.svg" alt="" width="24px" height="24px">
              <h3>Message Sent!</h3>
            </div>
            <p>Thanks for completing the form. We'll be in touch soon!</p>
          </div>`
    // reset form fields to default
    resetForm()
  }

  // reset form fields to default
  function resetForm () {
    // reset form fields to default
    // since it is just one form so we use the first form index
    document.forms[0].reset()
    // reset radio buttons background to default
    queryBoxes.forEach(box => {
      box.style.backgroundColor = ''
    })
    // clear success message after 2 seconds
    setTimeout(() => {
      success.innerHTML = ''
      success.style.display = 'none'
    }, 2000)
  }

  // textBoxValidate( textBox )
  textBox.addEventListener('input', e => {
    textBoxValidate(textBox)
  })

  // inputs event validation
  inputs.forEach(input => {
    if (
      input.id !== 'consent' &&
      input.id !== 'support-request' &&
      input.id !== 'general-enquiry'
    ) {
      input.addEventListener('input', () => {
        inputValidate(input)
      })
    }
    // radio button change event
    if (input.id === 'support-request' || input.id === 'general-enquiry') {
      input.addEventListener('change', () => {
        radioValidate(input)
      })
    }

    if (input.id === 'consent') {
      input.addEventListener('change', () => {
        checkboxValidate(input)
      })
    }

    if (input.id === 'email') {
      input.addEventListener('input', () => {
        if (input.value) {
          validateEmail(input)
        } else {
          inputValidate(input)
        }
      })
    }
  })

  // error validation check
  function errorcheck () {
    let allValid = true
    // Loop through each error message and check if it's empty
    errs.forEach(err => {
      if (err.innerHTML !== '') {
        allValid = false
      }
    })
    // return allvalid status if all error messages are empty
    return allValid
  }

  // button click event validation
  btn.addEventListener('click', function (e) {
    // preventDefault button click
    e.preventDefault()

    for (let index = 0; index < inputs.length; index++) {
      if (inputs[index].id === 'consent') {
        // validate checkbox
        checkboxValidate(inputs[index])
      } else if (
        // validate input fields
        inputs[index].id !== 'consent' &&
        inputs[index].id !== 'support-request' &&
        inputs[index].id !== 'general-enquiry'
      ) {
        inputValidate(inputs[index])
      } else if (inputs[index].id === 'email') {
        // validate email
        validateEmail(inputs[index])
      } else if (
        // validate radio buttons
        inputs[index].id === 'general-enquiry' ||
        inputs[index].id === 'support-request'
      ) {
        radioValidate(inputs[index])
      }
    }
    // validate textbox since it is not an input field
    if (textBox) {
      textBoxValidate(textBox)
    }

    // if no error is displayed, show success message
    if (errorcheck()) {
      successPopup()
    }
  })
})
