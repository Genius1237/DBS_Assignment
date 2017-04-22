function onMouseoverReportDownload(event) {
  event.currentTarget.style.boxShadow = '0px 0px 2px 1px black';
}

function onMouseoutReportDownload(event) {
  event.currentTarget.style.boxShadow = '';
}

function initialise() {
  document.getElementById('report-download').addEventListener('mouseover', onMouseoverReportDownload);
  document.getElementById('report-download').addEventListener('mouseout', onMouseoutReportDownload);
}

document.addEventListener('DOMContentLoaded', initialise);