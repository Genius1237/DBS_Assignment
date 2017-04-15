var defaultSearchBarValue = 'Search here';

function onSearchBarFocus(event) {
  if (event.target.value === defaultSearchBarValue) {
    event.target.value = '';
  }
}

function onSearchBarBlur(event) {
  if (event.target.value === '') {
    event.target.value = defaultSearchBarValue;
  }
}

function onFocusDropDownButton(event) {
  document.getElementById('drop-down-content').style.visibility = 'visible';
  document.getElementById('drop-down-content').style.opacity = '1';
}

function onBlurDropDownButton(event) {
  document.getElementById('drop-down-content').style.opacity = '0';
  setTimeout(function() {
    document.getElementById('drop-down-content').style.visibility = 'hidden';
  }, 200);
}

function onMouseoverDropDownLink(event) {
  event.target.parentElement.style.backgroundColor = '#444744';
  event.target.style.color = 'white';  
}

function onMouseoutDropDownLink(event) {
  event.target.parentElement.style.backgroundColor = 'white';
  event.target.style.color = 'black';
}

function onMouseoverSearchButton(event) {
  event.target.style.backgroundColor = '#d7dce8';
}

function onMouseoutSearchButton(event) {
  event.target.style.backgroundColor = 'white';
}

function onClickSignoutOption(event) {
  event.preventDefault();

  // delete cookie

  // get to signin page
  window.location.assign('http://localhost:3000/public/signin');
}

function initialise() {
  var searchBar = document.getElementById('search-bar');
  var dropDownButton = document.getElementById('drop-down-button');
  var searchButton = document.getElementById('search-button');
  var signoutOption = document.getElementById('signout-option');

  // add listeners for modifying value attribute of input
  searchBar.value = defaultSearchBarValue;
  searchBar.addEventListener('focus', onSearchBarFocus);
  searchBar.addEventListener('blur', onSearchBarBlur);

  // add listeners to show drop down content on clicking drop down button
  dropDownButton.addEventListener('focus', onFocusDropDownButton);
  dropDownButton.addEventListener('blur', onBlurDropDownButton);

  // listenere to handle mouseover search button
  searchButton.addEventListener('mouseover', onMouseoverSearchButton);
  searchButton.addEventListener('mouseout', onMouseoutSearchButton);

  // listener to prevent default action, delete cookie and get to signin page
  signoutOption.addEventListener('click', onClickSignoutOption);

  // listeners for hover over links in dropdown
  var els = document.getElementById('drop-down-content').getElementsByTagName('a');
  for (el of els) {
    el.addEventListener('mouseover', onMouseoverDropDownLink)
    el.addEventListener('mouseout', onMouseoutDropDownLink);
  }
}

document.addEventListener('DOMContentLoaded', initialise);