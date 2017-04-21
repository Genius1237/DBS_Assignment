function onMouseoverReportDownload(event) {
  event.currentTarget.style.boxShadow = '0px 0px 2px 1px black';
}

function onMouseoutReportDownload(event) {
  event.currentTarget.style.boxShadow = '';
}

function initialise() {
  var els = document.getElementsByClassName('report-download');
  for (let el of els) {
    el.addEventListener('mouseover', onMouseoverReportDownload);
    el.addEventListener('mouseout', onMouseoutReportDownload);
  }
}

document.addEventListener('DOMContentLoaded', initialise);