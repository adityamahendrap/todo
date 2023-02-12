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

function updateTodoLeft() {
  countText.innerHTML = todoLeft;
}

const options = document.querySelectorAll(".option");
const form = document.querySelector("form");
const input = document.querySelector("#input");
const listTodo = document.querySelector(".list-todo");
const countText = document.querySelector("#count");
const clearBtn = document.querySelector(".clear-completed");

let todoLeft = 0;

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // validasi input
  if (inputValidation() == false) return;

  // add new todo
  todoLeft++;
  updateTodoLeft();

  //create html element
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
      updateTodoLeft();
      todo.classList.add("complete");
      todo.classList.remove("active");
    }

    if (icon.classList.contains("done")) {
      todoLeft++;
      updateTodoLeft();
      todo.classList.remove("complete");
      todo.classList.add("active");
    }

    nameActivity.classList.toggle("coret");

    clearBtn.addEventListener("click", function () {
      const completedTask = document.querySelector(".complete");
      completedTask.remove();
    });

    // all menu
    allBtn.addEventListener("click", function () {
      options.forEach((e) => {
        e.removeAttribute("id", "active");
      });
      options[0].setAttribute("id", "active");

      todo.style.display = "flex";

      const activeTodo = document.querySelectorAll(".active");
      activeTodo.forEach((e) => {
        e.style.display = "flex";
      });
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
    });

    // complete menu
    completedBtn.addEventListener("click", function () {
      console.log("ok");

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
    });
  });
});

const allBtn = document.querySelector(".all-todo");
const activeBtn = document.querySelector(".active-todo");
const completedBtn = document.querySelector(".completed-todo");