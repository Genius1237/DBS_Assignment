/*
  Scope is two tab buttons, form and submit button
*/

function onMouseOver(event) {
  if (event.target.id === 'buy-sell-button') {
    event.target.style.boxShadow = "0px 0px 2px 1px black";
  } else {
    event.target.style.backgroundColor = '#444744';
    event.target.style.color = 'white';
  }
}

function onMouseOut(event) {
  if (event.target.id === 'buy-sell-button') {
    event.target.style.boxShadow = '';
  } else {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'black';
  }
}

function onClickTopButton(event) {
  var bookButton = document.getElementById('book-button');
  var itemButton = document.getElementById('item-button');
  var bookForm = document.getElementById('book-form');
  var itemForm = document.getElementById('item-form');
  if (event.target.id === 'book-button') {
    bookButton.style.borderBottom = '2px solid black';
    itemButton.style.borderBottom = '';
    bookForm.style.display = 'block';
    itemForm.style.display = 'none';
  } else {
    bookButton.style.borderBottom = '';
    itemButton.style.borderBottom = '2px solid black';
    bookForm.style.display = 'none';
    itemForm.style.display = 'block';
  }
}

function onClickBuySellButton(event) {
  // find the active form, item of book
  var activeForm;
  if (document.getElementById('item-form').style.display === 'none') {
    activeForm = 'book';
  } else {
    activeForm = 'item';
  }

  // prepare the payload
  var payload = '';
  var els = document.getElementById(activeForm + '-form').document.getElementsByTagName('input');
  for (let el of els) {
    payload += el.name + '=' + el.value + '&';
  }
  if (document.getElementById('buy-sell-button').textContent === 'Buy') {
    payload += 'action=buy';
  } else {
    payload += 'action=sell';
  }

  // make the AJAX request
  var requestStatus = document.getElementById('request-status');
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/' + activeForm + 's');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        requestStatus.style.visibility = 'visible';
        requestStatus.style.backgroundColor = '#00b300';
        requestStatus.textContent = 'Posted Successfully';
      } else {
        requestStatus.style.visibility = 'visible';
        requestStatus.style.backgroundColor = '#ff001b';
        requestStatus.textContent = 'Required response not received';
      }
    }
  }
}

function initialise() {
  var bookButton = document.getElementById('book-button');
  var itemButton = document.getElementById('item-button');
  var buySellButton = document.getElementById('buy-sell-button');

  // add listeners for buttons for hover
  var buttons = [ bookButton, itemButton, buySellButton];
  for (let button of buttons) {
    button.addEventListener('mouseover', onMouseOver);
    button.addEventListener('mouseout', onMouseOut);
  }

  // add listeners for top buttons for selected
  bookButton.addEventListener('click', onClickTopButton);
  itemButton.addEventListener('click', onClickTopButton);

  // listener for submission of data
  buySellButton.addEventListener('click', onClickBuySellButton);

  // event to select the book tab
  var clickEvent = new MouseEvent('click');
  bookButton.dispatchEvent(clickEvent);
}

document.addEventListener('DOMContentLoaded', initialise);