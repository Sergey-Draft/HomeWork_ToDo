let inputText = document.querySelector('#print-text');
let btnAdd = document.querySelector('#click-btn');
let ulList = document.getElementById('list');
let allLi = document.getElementsByTagName('li');
let allSpan = document.getElementsByTagName('span');
let saveBtn = document.querySelector('#save-btn');
let clearBtn = document.querySelector('#clear-btn');
let task = document.querySelector('.doing');

let modal = document.getElementById('myModal');
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

let angry = document.querySelector('.fa-angry');
let smile = document.querySelector('.fa-smile-wink')






/* -------- Add to do -------- */

btnAdd.onclick = function () {
  let newTodo = inputText.value;// получение данных из input
  let newTask = newTodo.trim();
  if ((newTodo == '') || (newTask == '')) {
    inputText.value = '';
    inputText.setAttribute('placeholder', 'Hey! First write what we are going to do!');

  } else {
    inputText.value = '';

    angry.style.color = '#17a2b8';

    let newLi = document.createElement('li');
    //newLi.innerText = newTodo;
    let newSpan = document.createElement('span');
    newSpan.className = 'fa fa-trash';

    let dateSpan = document.createElement('i'); // добавляем дату
    dateSpan.className = 'date';
    dateSpan.innerHTML = dateFull;
    dateSpan.style.float = 'right';


    ulList.appendChild(newLi).append(newSpan, newTodo.trim(), dateSpan); // append параллельно доюавляет несколько дочерних  узлов
    inputText.setAttribute('placeholder', '')


    task.innerHTML = tasks();
    closeTodo();
    deleteTodo();
  }
}



/* -------- getDate -------- */

var date = new Date();
function dateFormat() {
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  let yy = date.getFullYear();
  if (yy < 10) yy = '0' + yy;
  let hrs = date.getHours();
  if (hrs < 10) hrs = '0' + hrs;
  let min = date.getMinutes();
  if (min < 10) min = '0' + min;
  return (dd + '.' + mm + '.' + yy + ', ' + hrs + ':' + min);
}
var dateFull = dateFormat();




/* -------- close & delete to do -------- */

function closeTodo() {
  var count = 0;
  for (let tagLi of allLi) {
    tagLi.onclick = function () {
      tagLi.classList.toggle('text-decor');
      task.innerHTML = tasks();
    }
  }
}

function deleteTodo() {
  for (let tagSpan of allSpan) {
    tagSpan.onclick = function () {
      tagSpan.parentNode.remove();
      task.innerHTML = tasks();
    }
  }
}



/* -------- save&load localStorage -------- */

function loadTodo() {
  ulList.innerHTML = localStorage.getItem('todo-list');
  task.innerHTML = tasks();
}

function saveTodo() {
  localStorage.setItem('todo-list', ulList.innerHTML);
}

saveBtn.onclick = saveTodo;

clearBtn.onclick = function () {
  if (localStorage.getItem('todo-list')) {
    ulList.innerHTML = '';
    localStorage.setItem('todo-list', ulList.innerHTML);
    task.innerHTML = tasks();
  }
}



/* -------- Modal -------- */

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


/* -------- Tasks counter-------- */


function tasks() {
  var doing = 0;
  var notDoing = allLi.length;
  for (elem of allLi) {
    if (elem.className == 'text-decor') {
      doing++;
      notDoing--;
      if(notDoing>=doing){
        angry.style.color = '#17a2b8';
        smile.style.color = '#212529'
      }else {smile.style.color = '#17a2b8';angry.style.color = '#212529';}
    }
  } return `${notDoing} : ${doing}`;
}



closeTodo();
deleteTodo();
loadTodo();
tasks();
task.innerHTML = tasks();


