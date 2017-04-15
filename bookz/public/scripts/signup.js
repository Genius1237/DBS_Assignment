var defaultFieldValue = {
  name: 'Name',
  username: 'Username',
  password: 'Password',
  phone: 'Phone'
}

var defaultAlertBoxValue = {
  name: 'Name chars',
  username: 'Username chars',
  password: 'Password chars',
  phone: 'Phone chars'
}

function onFocus(event) {
  // make changes to the field value
  event.target.type = 'password';
  if (event.target.value == defaultFieldValue[event.target.name]) {
    event.target.value = '';
  }

  // make changes to alert box
  var alertElement = document.getElementById(event.target.name + '-alert');
  alertElement.textContent = defaultAlertBoxValue[event.target.name];
  alertElement.style.backgroundColor = '#00b300';
  alertElement.style.opacity = '1';
}

function onBlur(event) {
  // make changes to the field value
  if (event.target.value === '') {
    event.target.type = 'text';
    event.target.value = defaultFieldValue[event.target.name];
  }

  // make changes to alert box
  var alertElement = document.getElementById(event.target.name + '-alert').style.opacity = '0';
}

function onMouseOver(event) {
  event.target.style.boxShadow = "0px 0px 2px 1px black";
}

function onMouseOut(event) {
  event.target.style.boxShadow = "";
}

function onClick(event) {
  // prepare payload for AJAX request
  var payload = "";
  var els = document.getElementsByTagName('input');
  for (let el of els) {
    payload += el.name + "=" + el.value + "&";
  }
  payload = payload.slice(0, payload.length - 1);

  // modify request status element
  var requestStatusElement = document.getElementById('request-status')
  requestStatusElement.style.textContent = 'Submitting..';
  requestStatusElement.style.visibility = 'visible';

  // make AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/users');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(payload);

  // handle response to AJAX request
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        document.getElementById('request-status').style.visibility = 'hidden';
        // assuming response is in JSON
        let response = JSON.parse(xhr.response);
        if (response.valid === 'true') {
          window.location.assign('http://localhost:3000/public/home');
        } else {
          // highlight those fields that are invalid
          if (response.usernameTaken === 'true') {
              let el = document.getElementById('username-alert');
              el.style.backgroundColor = '#ff001b';
              el.textContent = 'Username already taken';
              el.style.opacity = '1';
          } else {
            for (let name of response.invalidFields) {
              let el = document.getElementById(name + '-alert');
              el.style.backgroundColor = '#ff001b';
              el.textContent = 'Invalid value entered';
              el.style.opacity = '1';
            }
          }
        }
      } else {
        requestStatusElement.style.textContent = 'Required response not received';
      }
    }
  }
}

function initialise() {

  // add listeners to input fields to respond to focus and blur
  var els = document.getElementsByTagName('input');
  for (let el of els) {
    if (el.name === 'name') {
      el.value = defaultFieldValue.name;
    } else if (el.name === 'username') {
      el.value = defaultFieldValue.username;
    } else if (el.name === 'password') {
      el.value = defaultFieldValue.password;
    } else {
      el.value = defaultFieldValue.phone;
    }

    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);
  }

  // add listeners to submit button to respond to hover
  var submitButton = document.getElementsByTagName('button')[0];
  submitButton.addEventListener('mouseover', onMouseOver);
  submitButton.addEventListener('mouseout', onMouseOut);

  // add listeners to form to respond to submit
  document.getElementById('create-account-button').addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', initialise);