if(!localStorage.tasks){
  var tasks = [];
} else {
  var tasks = JSON.parse(localStorage.tasks);
}

var inputText = document.getElementById('field');
var addBtn = document.getElementsByTagName('button')[0];
var deleteBtn = document.getElementsByTagName('button')[1];
var insertToDiv = document.getElementById('insert');

addBtn.addEventListener('click', submitTask);
inputText.addEventListener('keydown', function (e) {
  if (e.keyCode === 13 && inputText.value !== '') {
    submitTask();
  }
})

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

function showNewTask() {
  var showPanel = '';
  for (var i = 0; i < tasks.length; i++) {
    showPanel += `<div class="col-lg-4">
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
                  </div>`
  }
  insertToDiv.innerHTML = showPanel;
  inputText.focus();
  var dltBtns = document.getElementsByClassName('deleteBtns');
  for (let i = 0; i < dltBtns.length; i++) {
    dltBtns[i].addEventListener('click', function () {
      deleteTask(i);
    });
  }
}

function deleteTask(x) {
  tasks.splice(x, 1);
  localStorage.tasks = JSON.stringify(tasks);
  showNewTask();
}

deleteBtn.addEventListener('click', deleteAll)

function deleteAll() {
  tasks.splice(0);
  localStorage.tasks = JSON.stringify(tasks);
  showNewTask();
}

showNewTask();
