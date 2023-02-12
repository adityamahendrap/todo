function inputValidation() {
  let space = 0;
  if (input.value == "") return false;
  for (let i = 0; i < input.value.length; i++) {
    if (input.value[i] == " ") {
      space++;
    }
  }

  if (space === input.value.length) return false;
}

function updateTodoSatusCount() {
  leftCount.innerHTML = todoLeft;
  completedCount.innerHTML = todoCompleted;
}

const options = document.querySelectorAll(".option");
const form = document.querySelector("form");
const input = document.querySelector("#input");
const listTodo = document.querySelector(".list-todo");
const leftCount = document.querySelector("#left-count");
const completedCount = document.querySelector("#completed-count");
const clearBtn = document.querySelector(".clear-completed");
const allBtn = document.querySelector(".all-todo");
const activeBtn = document.querySelector(".active-todo");
const completedBtn = document.querySelector(".completed-todo");

let todoLeft = 0;
let todoCompleted = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // validasi input
  if (inputValidation() == false) return;

  // add new todo
  todoLeft++;
  updateTodoSatusCount()

  //create html element for new todo
  const newTodo = input.value;
  input.value = "";

  const todo = document.createElement("div");
  todo.setAttribute("class", "todo");
  todo.classList.add("active");

  const checkbox = document.createElement("div");
  checkbox.setAttribute("class", "checkbox");
  const icon = document.createElement("img");
  icon.setAttribute("class", "done");
  icon.setAttribute("src", "./assets/icon-check.svg");
  icon.style.opacity = '90%';

  const nameActivity = document.createElement("span");
  nameActivity.setAttribute("class", "act");
  nameActivity.innerHTML = `${newTodo}`;

  listTodo.append(todo);
  todo.append(checkbox);
  checkbox.append(icon);
  todo.append(nameActivity);

  checkbox.addEventListener("click", function () {
    icon.classList.toggle("done");

    if (!icon.classList.contains("done")) {
      todoLeft--;
      todoCompleted++;
      updateTodoSatusCount()
      todo.classList.add("complete");
      todo.classList.remove("active");
      nameActivity.classList.toggle("coret");
      if(allBtn.hasAttribute('id', 'complete')) return
      if(completedBtn.hasAttribute('id', 'complete')) return
      if(activeBtn.hasAttributes('id', 'complete')) {
        todo.style.display = 'none';
      }
    }
    
    if (icon.classList.contains("done")) {
      todoLeft++;
      todoCompleted--;
      updateTodoSatusCount()
      todo.classList.remove("complete");
      todo.classList.add("active");
      nameActivity.classList.toggle("coret");
      if(allBtn.hasAttribute('id', 'complete')) return
      if(activeBtn.hasAttribute('id', 'complete')) return
      if(completedBtn.hasAttributes('id', 'complete')) {
        todo.style.display = 'none';
      }
    }
  });

  if(allBtn.hasAttribute('id', 'complete')) return
  if(activeBtn.hasAttribute('id', 'complete')) return
  if(completedBtn.hasAttributes('id', 'complete')) {
    todo.style.display = 'none';
  }
});

// all menu
allBtn.addEventListener("click", function () {
  options.forEach((e) => {
    e.removeAttribute("id", "active");
  });
  options[0].setAttribute("id", "active");

  const todo = document.querySelectorAll(".todo");
  todo.forEach((e) => {
    e.style.display = "flex";
  });

  const activeTodo = document.querySelectorAll(".active");
  activeTodo.forEach((e) => {
    e.style.display = "flex";
  });

  const leftTotal = document.querySelector(".left-total");
  const completedTotal = document.querySelector(".completed-total");
  leftTotal.style.display = "block";
  completedTotal.classList.add("hide");
});

// active menu
activeBtn.addEventListener("click", function () {
  options.forEach((e) => {
    e.removeAttribute("id", "active");
  });
  options[1].setAttribute("id", "active");

  const completedTodo = document.querySelectorAll(".complete");
  completedTodo.forEach((e) => {
    e.style.display = "none";
  });

  const activeTodo = document.querySelectorAll(".active");
  activeTodo.forEach((e) => {
    e.style.display = "flex";
  });

  const leftTotal = document.querySelector(".left-total");
  const completedTotal = document.querySelector(".completed-total");
  leftTotal.style.display = "block";
  completedTotal.classList.add("hide");
});

// complete menu
completedBtn.addEventListener("click", function () {

  options.forEach((e) => {
    e.removeAttribute("id", "active");
  });
  options[2].setAttribute("id", "active");

  const completedTodo = document.querySelectorAll(".complete");
  completedTodo.forEach((e) => {
    e.style.display = "flex";
  });

  const activeTodo = document.querySelectorAll(".active");
  activeTodo.forEach((e) => {
    e.style.display = "none";
  });

  const leftTotal = document.querySelector(".left-total");
  const completedTotal = document.querySelector(".completed-total");
  leftTotal.style.display = "none";
  completedTotal.classList.remove("hide");
});

clearBtn.addEventListener("click", function () {
  const completedTask = document.querySelectorAll(".complete");
  todoCompleted = 0;
  updateTodoSatusCount()
  completedTask.forEach((e) => {
    e.remove();
  });
});