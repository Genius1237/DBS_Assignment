/*
  Scope is two tab buttons, form and submit button
*/

function onMouseOver(event) {
  if (event.target.className === 'post-delete-button' || event.target.className === 'post-update-button') {
    event.target.style.boxShadow = "0px 0px 2px 1px black";
  } else {
    event.target.style.backgroundColor = '#dd7019';
    event.target.style.color = 'white';
  }
}

function onMouseOut(event) {
  if (event.target.className === 'post-delete-button' || event.target.className === 'post-update-button') {
    event.target.style.boxShadow = '';
  } else {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'black';
  }
}

function onClickTopButton(event) {
  var bookButton = document.getElementById('book-button');
  var itemButton = document.getElementById('item-button');
  var bookList = document.getElementById('book-list');
  var itemList = document.getElementById('item-list');
  if (event.target.id === 'book-button') {
    bookButton.style.borderBottom = '2px solid #dd7019';
    itemButton.style.borderBottom = '';
    bookList.style.display = 'block';
    itemList.style.display = 'none';
  } else {
    bookButton.style.borderBottom = '';
    itemButton.style.borderBottom = '2px solid #dd7019';
    bookList.style.display = 'none';
    itemList.style.display = 'block';
  }
}

function onClickPostUpdateButton(event) {
  // find the active list, item or book
  var activeList;
  if (document.getElementById('item-list').style.display === 'none') {
    activeList = 'book';
  } else {
    activeList = 'item';
  }

  // prepare the payload
  var payload = '';
  var els = event.currentTarget.parentNode.getElementsByTagName('input');
  for (let el of els) {
    payload += el.name + '=' + el.value + '&';
  }
  els = event.currentTarget.parentNode.getElementsByTagName('textarea');
  for (let el of els) {
    payload += el.name + '=' + el.value + '&';
  }
  var buyOrSell = window.location.href.split('/');
  buyOrSell = buyOrSell[buyOrSell.length - 1];
  payload += ('category=' + buyOrSell + '&');
  payload += ('id=' + event.currentTarget.parentNode.parentNode.className.split(' ')[1]);

  // make the AJAX request
  var requestStatus = event.currentTarget.parentNode.getElementsByClassName('request-status')[0];
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', '/' + activeList + 's');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(payload);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        requestStatus.style.backgroundColor = '#005ce6';
        requestStatus.textContent = 'Updated Successfully';
        requestStatus.style.display = 'inline-block';
      } else {
        requestStatus.style.backgroundColor = '#ff001b';
        requestStatus.textContent = 'Some fields were blank or invalid';
        requestStatus.style.display = 'inline-block';
      }
    }
  }
}

function onClickPostDeleteButton(event) {
  // find the active list, item or book
  var activeList;
  if (document.getElementById('item-list').style.display === 'none') {
    activeList = 'book';
  } else {
    activeList = 'item';
  }

  // prepare the payload
  var buyOrSell = window.location.href.split('/');
  buyOrSell = buyOrSell[buyOrSell.length - 1];
  var payload = ('category=' + buyOrSell + '&');
  payload += ('id=' + event.currentTarget.parentNode.parentNode.className.split(' ')[1]);

  // make the AJAX request
  var requestStatus = event.currentTarget.parentNode.getElementsByClassName('request-status')[0];
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/' + activeList + 's');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(payload);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        requestStatus.style.backgroundColor = '#005ce6';
        requestStatus.textContent = 'Deleted Successfully';
        requestStatus.style.display = 'inline-block';
        window.location.reload(true);
      } else {
        requestStatus.style.backgroundColor = '#ff001b';
        requestStatus.textContent = 'Required response not received';
        requestStatus.style.display = 'inline-block';
      }
    }
  }
}

function onClickResultBox(event) {
    var inputElements = event.currentTarget.getElementsByTagName('input');
    var buttons = event.currentTarget.getElementsByTagName('button');
    var labels = event.currentTarget.getElementsByTagName('label');
    var textareas = event.currentTarget.getElementsByTagName('textarea');

    event.currentTarget.style.cursor = 'auto';

    // show exit focus button
    event.currentTarget.getElementsByClassName('exit-focus-button')[0].style.display = 'block';

    // modify input elements
    for (let el of inputElements) {
      el.style.borderWidth = '1px';
      el.removeAttribute('readonly');
      el.style.cursor = 'auto';
    }

    // modify textarea
    for (let el of textareas) {
      //el.style.borderWidth = '1px';
      el.removeAttribute('disabled');
      el.style.cursor = 'auto';
    }

    // labels
    for (let el of labels) {
      el.style.cursor = 'auto';
    }

    // show buttons
    for (let el of buttons) {
      el.style.display = 'inline-block'
    }

    event.currentTarget.style.boxShadow = '0px 0px 50px 10px black';
}

function onFocusExitFocusButton(event) {
  var inputElements = event.currentTarget.parentNode.getElementsByTagName('input');
  var buttons = event.currentTarget.parentNode.getElementsByTagName('button');
  var labels = event.currentTarget.parentNode.getElementsByTagName('label');
  var textareas = event.currentTarget.parentNode.getElementsByTagName('textarea');

  event.currentTarget.parentNode.style.cursor = 'pointer';

  // modify input elements
  for (let el of inputElements) {
    el.style.borderWidth = '0px';
    el.setAttribute('readonly', '');
    el.style.cursor = 'pointer';
  }

  // modify textarea
  for (let el of textareas) {
    //el.style.borderWidth = '0px';
    el.setAttribute('disabled', '');
    el.style.cursor = 'pointer';
  }

  // labels
  for (let el of labels) {
    el.style.cursor = 'pointer';
  }

  // hide buttons
  for (let el of buttons) {
    el.style.display = 'none'
  }

  // hide request status element
  event.currentTarget.parentNode.getElementsByClassName('request-status')[0].style.display = 'none';

  event.currentTarget.parentNode.style.boxShadow = '';
}

function initialise() {
  var bookButton = document.getElementById('book-button');
  var itemButton = document.getElementById('item-button');
  var postUpdateButtons = document.getElementsByClassName('post-update-button');
  var postDeleteButtons = document.getElementsByClassName('post-delete-button');

  // add listeners for buttons for hover
  var buttons = [ bookButton, itemButton];
  for (let button of buttons) {
    button.addEventListener('mouseover', onMouseOver);
    button.addEventListener('mouseout', onMouseOut);
  }
  for (let button of postUpdateButtons) {
    button.addEventListener('mouseover', onMouseOver);
    button.addEventListener('mouseout', onMouseOut);
  }
  for (let button of postDeleteButtons) {
    button.addEventListener('mouseover', onMouseOver);
    button.addEventListener('mouseout', onMouseOut);
  }

  // add listeners for top buttons for selected
  bookButton.addEventListener('click', onClickTopButton);
  itemButton.addEventListener('click', onClickTopButton);

  // event to select the book tab
  var clickEvent = new MouseEvent('click');
  bookButton.dispatchEvent(clickEvent);

  // listeners to handle update and delete post requests
  for (let el of postUpdateButtons) {
    el.addEventListener('click', onClickPostUpdateButton);
  }
  for (let el of postDeleteButtons) {
    el.addEventListener('click', onClickPostDeleteButton);
  }

  // attach listeners to the each item(result box) in the results list
  var els = document.getElementById('book-list').getElementsByTagName('li');
  for (let el of els) {
    el.addEventListener('click', onClickResultBox);
  }
  els = document.getElementById('item-list').getElementsByTagName('li');
  for (let el of els) {
    el.addEventListener('click', onClickResultBox);
  }

  // attach listener to exit focus button
  els = document.getElementsByClassName('exit-focus-button');
  for (let el of els) {
    el.addEventListener('focus', onFocusExitFocusButton);
  }

  // labels aligned to right
  els = document.getElementsByClassName('property-name');
  for (let el of els) {
    el.parentNode.style.textAlign = 'right';
  }

  //input, textarea aligned to left
  els = document.getElementsByClassName('result-list');
  for (let el of els) {
    let inputs = el.getElementsByTagName('input');
    for (let input of inputs) {
      input.parentNode.style.textAlign = 'left';
    }

    let textareas = el.getElementsByTagName('textarea');
    for (let textarea of textareas) {
      textarea.parentNode.style.textAlign = 'left';
    }
  }

}

document.addEventListener('DOMContentLoaded', initialise);