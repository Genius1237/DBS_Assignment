var defaultValue = {
  username: 'Enter username here',
  password: 'Enter password here'
};

function onFocus(event) {
  if (event.target.name === 'username') {
    document.getElementById('username-alert').style.opacity = '1';
    if (event.target.value === defaultValue.username) {
      event.target.value = '';
    }
  } else {
    document.getElementById('password-alert').style.opacity = '1';
    if (event.target.value === defaultValue.password) {
      event.target.value = '';
    }
  }
}

function onBlur(event) {
  if (event.target.name === 'username') {
    document.getElementById('username-alert').style.opacity = '0';
    if (event.target.value === '') {
      event.target.value = defaultValue.username;
    }
  } else {
    document.getElementById('password-alert').style.opacity = '0';
    if (event.target.value === '') {
      event.target.value = defaultValue.password;
    }
  }
}

function onMouseOver(event) {
  event.target.style.boxShadow = '0px 0px 2px 1px black';
}

function onMouseOut(event) {
  event.target.style.boxShadow = "";
}

function onClick(event) {
  // prepare payload to be sent in AJAX request
  var payload = "";
  var els = document.getElementsByTagName('input');
  for (let el of els) {
    payload += el.name + "=" + el.value + "&";
  }
  payload = payload.slice(0, payload.length - 1);


  var requestStatusElement = document.getElementById('request-status');
  requestStatusElement.textContent = 'Submitting..';
  requestStatusElement.style.visibility = 'visible';
  
  // make the AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:3000/signin');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send(payload);
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        // code assumes that 'Content-Type' of response is 'application/json'
        let response = JSON.parse(xhr.response);
        if (response.valid === 'true') {
          window.location.reload(true);
        } else {
          requestStatusElement.textContent = 'Invalid Credentials';
        }
      } else {
        requestStatusElement.textContent = 'Required response not received';
      }
    }
  }
}

function initialise() {

  // Add listeners to input fields to respond to focus and blur
  var els = document.getElementsByTagName('input');
  for (let el of els) {
    if (el.name === 'username') {
      el.value = defaultValue.username;
    } else {
      el.value = defaultValue.password;
    }
    el.addEventListener('focus', onFocus);
    el.addEventListener('blur', onBlur);
  }

  // add listeners to the submit button to respond to hover
  var submitButton = document.getElementsByTagName('button')[0];
  submitButton.addEventListener('mouseover', onMouseOver);
  submitButton.addEventListener('mouseout', onMouseOut);
  
  // add listener to form element to respond to submit
  document.getElementById('signin-button').addEventListener('click', onClick);
}

document.addEventListener('DOMContentLoaded', initialise);