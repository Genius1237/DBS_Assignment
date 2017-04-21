var defaultAlertBoxValue = {
  name: 'Maximum 50 characters',
  username: 'Not editable',
  password: 'Minimum 8 characters, maximum 20 characters',
  phone: 'Exactly 10 digits'
}

function onFocus(event) {
  // make changes to alert box
  var alertElement = document.getElementById(event.target.name + '-alert');
  alertElement.textContent = defaultAlertBoxValue[event.target.name];
  if (event.target.name === 'username')
    alertElement.style.backgroundColor = '#444744';
  else {
    alertElement.style.backgroundColor = '#005ce6';
  }
  alertElement.style.opacity = '1';
  if (event.target.name != 'username') {
    event.target.style.borderColor = 'black';
  }
}

function onBlur(event) {
  // make changes to alert box
  var alertElement = document.getElementById(event.target.name + '-alert').style.opacity = '0';
  if (event.target.name != 'username') {
    event.target.style.borderColor = '#c2c6c4';
  }
}

function onMouseOver(event) {
  event.target.style.boxShadow = "0px 0px 2px 1px black";
}

function onMouseOut(event) {
  event.target.style.boxShadow = "";
}

function onClick(event) {
  let passwordAlert = document.getElementById('password-alert');
  if (document.getElementById('password-field').value.length < 8) {
    passwordAlert.style.backgroundColor = '#ff001b';
    passwordAlert.textContent = 'Entered password is less than 8 characters long';
    passwordAlert.style.opacity = '1';
  } else {
    // prepare payload for AJAX request
    passwordAlert.style.opacity = '0';
    let payload = "";
    let els = document.getElementById('account-details-form').getElementsByTagName('input');
    for (let el of els) {
      if (el.name != 'username') {
        payload += el.name + "=" + el.value + "&";
      }
    }
    payload = payload.slice(0, payload.length - 1);

    // modify request status element
    let requestStatusElement = document.getElementById('request-status')
    requestStatusElement.style.backgroundColor = '#ff001b';
    requestStatusElement.style.textContent = 'Submitting..';
    requestStatusElement.style.visibility = 'visible';

    // make AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:3000/users');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(payload);

    // handle response to AJAX request
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          // assuming response is in JSON
          let response = JSON.parse(xhr.response);
          if (response.valid === 'true') {
            requestStatusElement.style.visibility = 'visible';
            requestStatusElement.style.backgroundColor = '#005ce6';
            requestStatusElement.style.textContent = 'Updated successfully';
          } else {
            // highlight those fields that are invalid
            for (let name of response.invalidFields) {
              let el = document.getElementById(name + '-alert');
              el.style.backgroundColor = '#ff001b';
              el.textContent = 'Invalid value entered';
              el.style.opacity = '1';
            }
          }
        } else {
          requestStatusElement.style.textContent = 'Unsuccessful communication with server';
        }
      }
    }
  }
}

function initialise() {

  // add listeners to input fields to respond to focus and blur
  var els = document.getElementById('account-details-form').getElementsByTagName('input');
  for (let el of els) {
      el.addEventListener('focus', onFocus);
      el.addEventListener('blur', onBlur);
  }

  // add listeners to submit button to respond to hover
  var submitButton = document.getElementById('update-button');
  submitButton.addEventListener('mouseover', onMouseOver);
  submitButton.addEventListener('mouseout', onMouseOut);

  // add listeners to form to respond to submit
  document.getElementById('update-button').addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', initialise);