//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

function toggleRowExpansion(arrowIcon) { 
  const row = arrowIcon.closest('tr');
  const dropDownRow = row.nextElementSibling;

  if (dropDownRow && dropDownRow.classList.contains('dropDownTextArea')) {
    dropDownRow.classList.toggle('expanded');
    arrowIcon.src = dropDownRow.classList.contains('expanded') ? 'up.png' : 'down.png';
  }
}


function collapseAllRows() {
  const table = document.getElementById('myTable');
  const rows = table.querySelectorAll('.dropDownTextArea');
  rows.forEach(row => {
    row.classList.remove('expanded');
    const arrowIcon = row.previousElementSibling.querySelector('img');
    arrowIcon.src = 'down.png';
  });
}

window.onload = function () {
  collapseAllRows();
  const dropdownRows = document.querySelectorAll('.dropDownTextArea');
  dropdownRows.forEach(row => {
    row.style.display = 'none';
  });
  const submitBtn = document.getElementById('button');
  submitBtn.disabled = true; 
  submitBtn.style.backgroundColor = 'gray'; 
  submitBtn.style.cursor = 'not-allowed'; 
};

document.getElementById('myTable').addEventListener('click', function(event) {
  const arrowIcon = event.target;
  if (arrowIcon.tagName === 'IMG') {
    const row = arrowIcon.closest('tr');
    toggleRowExpansion(row);
  }
});


function addNewStudent() {
  const table = document.getElementById('myTable');
  const newRow = document.getElementById('templateRow').cloneNode(true);
  newRow.removeAttribute('id');
  const newData = generateDummyData(table.rows.length + 1); 

  Object.keys(newData).forEach(key => {
    const cell = newRow.querySelector(`.${key}`);
    if (cell) {
      cell.textContent = newData[key];
    }
  });
  newRow.classList.add('dropDownTextArea'); 
  newRow.querySelector('td input').addEventListener('change', function() {
    handleCheckboxChange(this);
  });
  addDeleteButton(newRow);
  addEditButton(newRow);
  table.appendChild(newRow);
  newRow.style.display = '';
  alert(`Student ${table.rows.length} record added successfully`);

  const submitBtn = document.getElementById('button');
  submitBtn.style.backgroundColor = '';
  submitBtn.disabled = true;
}

function generateDummyData(rowNum) {
  return {
    'student-name': `Student ${rowNum}`,
    'advisor-name': `Teacher ${rowNum}`,
    'award-status': 'Approved',
    'semester': 'Spring',
    'award-type': 'TA',
    'budget-number': `${12345 + rowNum}`,
    'percentage': '100%'
  };
}


function handleCheckboxChange(checkbox) {
  const submitBtn = document.getElementById('button');
  const deleteButton = document.querySelectorAll('#myTable .delete-btn');
  const editButton = document.querySelectorAll('#myTable .edit-btn');
  const row = checkbox.closest('tr');
  if (checkbox.checked) {
    // Change background color of the row to "Yellow"
    row.style.backgroundColor = 'yellow';
    row.querySelector('.delete-btn').style.display = 'inline-block';
    row.querySelector('.edit-btn').style.display = 'inline-block';
  } else {
    // Change background color of the row back to its default
    row.style.backgroundColor = '';
    row.querySelector('.delete-btn').style.display = 'none';
    row.querySelector('.edit-btn').style.display = 'none';
  }
  // Turn Submit button orange if any checkbox is checked
  const checkboxes = document.querySelectorAll('#myTable input[type="checkbox"]:checked');
  if (checkboxes.length > 0) {
    submitBtn.style.backgroundColor = 'orange';
    submitBtn.disabled = false;
  } else {
    // Turn Submit button back to its default state if no checkboxes are checked
    submitBtn.style.backgroundColor = '';
    submitBtn.disabled = true;
  }
}

function addDeleteButton(row) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    deleteRow(this);
  });
  row.lastElementChild.innerHTML = '';
  row.lastElementChild.appendChild(deleteButton);
}


function deleteRow(button) {
  const row = button.closest('tr');
  const studentName = row.querySelector('.student-name').textContent;
  row.remove();
  alert(`Student ${studentName} Record deleted successfully`);

  const submitBtn = document.getElementById('button');
  submitBtn.style.backgroundColor = '';
  submitBtn.disabled = true;
}


function submitSelected() {
  const checkboxes = document.querySelectorAll('#myTable input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    const row = checkbox.closest('tr');
    row.style.backgroundColor = 'white';
  });

  const submitBtn = document.getElementById('submitBtn');
  submitBtn.style.backgroundColor = '';
  submitBtn.disabled = true;
}


function addEditButton(row) {
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    editRow(this);
  });
  row.lastElementChild.previousElementSibling.innerHTML = '';
  row.lastElementChild.previousElementSibling.appendChild(editButton);
}


// function editRow(button) {
//   const row = button.closest('tr');
//   const studentName = row.querySelector('.student-name').textContent;
//   const editTitle = `Edit details of ${studentName}`;
  // display the pop-up box
//   const editPopup = document.createElement('div');
//   editPopup.className = 'edit-popup';
//   const popupTitle = document.createElement('h2');
//   popupTitle.textContent = editTitle;
//   editPopup.appendChild(popupTitle);
//   Object.keys(dummyData).forEach(key => {
//     const detail = document.createElement('p');
//     detail.textContent = `${key}: ${row.querySelector(`.${key}`).textContent}`;
//     editPopup.appendChild(detail);
//   });
//   const updateButton = document.createElement('button');
//   updateButton.textContent = 'Update';
//   updateButton.addEventListener('click', function() {
//     alert(`Student ${studentName} data updated successfully`);
//   });
//   editPopup.appendChild(updateButton);

//   const cancelButton = document.createElement('button');
//   cancelButton.textContent = 'Cancel';
//   cancelButton.addEventListener('click', function() {
//     document.body.removeChild(editPopup);
//   });
//   editPopup.appendChild(cancelButton);

//   document.body.appendChild(editPopup);
// }