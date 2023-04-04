const todoInput = document.getElementById("search");
const todoContainer = document.querySelector(".todos");

let todos = [];

function loadTodo() {
  let localTodo = JSON.parse(localStorage.getItem("todoApp"));
  todoContainer.innerHTML = "";
  if (localTodo !== null) {
    todos = [...localTodo];
    todos.forEach((element, index) => {
      const div = document.createElement("div");
      const classNeeded = element.isDone ? "todo done" : "todo";
      div.setAttribute("class", classNeeded);
      div.setAttribute("id", index);
      const textNode = document.createTextNode(element.text);
      div.appendChild(textNode);
      div.addEventListener("mousedown", deleteOrMarkTodo);
      div.addEventListener("contextmenu", (e) => e.preventDefault());
      todoContainer.appendChild(div);
    });
  } else {
    todos = [];
  }
}

function createTodo() {
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = {
        text: e.target.value,
        isDone: false,
      };
      todos.push(val);
      let stringified = JSON.stringify(todos);
      localStorage.setItem("todoApp", stringified);
      e.target.value = "";
      loadTodo();
    }
  });
}

loadTodo();
createTodo();

function deleteOrMarkTodo(e) {
  const id = e.target.id;
  const buttonClicked = e.button;
  if (buttonClicked === 0) {
    const todoToUpdate = todos.filter((todo, index) => index === parseInt(id));
    todoToUpdate[0].isDone = true;
    let stringified = JSON.stringify(todos);
    localStorage.setItem("todoApp", stringified);
    loadTodo();
  } else if (buttonClicked === 2) {
    e.preventDefault();
    const todoToUpdateAgain = todos.filter(
      (todo, index) => index !== parseInt(id)
    );
    todos = todoToUpdateAgain;
    let stringified = JSON.stringify(todos);
    localStorage.setItem("todoApp", stringified);
    loadTodo();
  }
}
