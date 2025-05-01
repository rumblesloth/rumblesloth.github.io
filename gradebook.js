function fetchGradeData() {
  console.log("Fetching grade data...");
  var xhr = new XMLHttpRequest();
  var apiRoute = "/api/grades";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        populateGradebook(JSON.parse(xhr.responseText));
      } else {
        console.error("Could not get grades. Status:", xhr.status);
      }
    }
  };

  xhr.open("GET", apiRoute, true);
  xhr.send();
}

function populateGradebook(data) {
  console.log("Populating gradebook with data:", data);
  const tableElm = document.getElementById("gradebook").getElementsByTagName('tbody')[0];

  data.forEach(function (assignment) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = `${assignment.last_name}, ${assignment.first_name}`;
    row.appendChild(nameCell);

    const gradeCell = document.createElement("td");
    gradeCell.textContent = assignment.total_grade;
    row.appendChild(gradeCell);

    tableElm.appendChild(row);
  });
}

window.onload = function () {
  fetchGradeData();
};
