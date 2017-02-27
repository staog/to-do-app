// Creating new array 'tasks' if there isn't one
// If there is array 'tasks' in localStorage, get data from it
if(!localStorage.tasks){
  var tasks = [];
} else {
  var tasks = JSON.parse(localStorage.tasks);
}

// Creating global variables
var addBtn = document.getElementsByTagName('button')[0];
var deleteBtn = document.getElementsByTagName('button')[1];
var inputText = document.getElementById('field');
var insertToDiv = document.getElementById('insert');



// Adding event listeners to both mouse click and 'enter' button
addBtn.addEventListener('click', submitTask);
inputText.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && inputText.value !== '') {
    submitTask();
  }
})

// Taking input value, saving it in object 'taskToSave', pushing it to
// array 'tasks' and calling function 'showNewTask'
function submitTask() {
  var userInput = inputText.value;
  var getDate = new Date();
  var setDate = getDate.toDateString();

  var taskToSave = {
    task: userInput,
    date: setDate
  }
  tasks.push(taskToSave);
  localStorage.tasks = JSON.stringify(tasks);
  showNewTask();
}

// Making empty string 'showPanel', using for loop to go through all the tasks,
// creating new div element for every task that we have, adding it to string
// 'showPanel' and inserting all newly created div elements into HTML document
function showNewTask() {
  var showPanel = '';
  for (var i = 0; i < tasks.length; i++) {
    showPanel += `<div class="container">
                    <div class="col-lg-8 col-lg-offset-2">
                      <div class="panel panel-default">
                        <div class="panel-heading">Task No. ${i + 1}</div>
                        <div class="panel-body">
                          <h3>${tasks[i].task}</h3>
                          <h5>${tasks[i].date}</h5>
                        </div>
                       <div class="panel-footer">
                          <button class="btn btn-danger pull-right deleteBtns" type="button" name="button">Delete</button>
                        <div class="clearfix"></div>
                       </div>
                       </div>
                    </div>
                  </div>`
  }
  insertToDiv.innerHTML = showPanel;
  inputText.focus();
  // Adding event listeners to all newly created 'delete' buttons
  var dltBtns = document.getElementsByClassName('deleteBtns');
  for (let i = 0; i < dltBtns.length; i++) {
    dltBtns[i].addEventListener('click', function () {
      deleteTask(i);
    });
  }
}

// Deleting specific task using 'x' argument (just a reference to 'i' in for loop)
function deleteTask(x) {
      tasks.splice(x, 1);
      localStorage.tasks = JSON.stringify(tasks);
      showNewTask();
}

showNewTask();
