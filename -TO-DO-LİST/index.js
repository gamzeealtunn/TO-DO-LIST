const input = document.querySelector(".todo-input");
const tasklist = document.querySelector("#taskList");

const button = document.querySelector(".todo-button");
let veri;

button.onclick = function () {
  if (!button.classList.contains("editable")) {
    if (input.value == "") {
      alert("Lütfen bir yapılacak yazınız");
    } else if (
      JSON.parse(localStorage.getItem("todos")) &&
      JSON.parse(localStorage.getItem("todos")).includes(input.value)
    ) {
      alert("Aynı isimde yapılacak göreviniz bulunmakta");
    } else {
      let todos;
      if (localStorage.getItem("todos") == null) {
        todos = [];
      } else {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.push(input.value);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  } else {
    let data = localStorage.getItem("todos");
    var todos = JSON.parse(data);
    var yeniDizi = todos.filter(function (eleman) {
      return eleman != veri;
    });
    yeniDizi[yeniDizi.length] = input.value;
    data = yeniDizi;
    localStorage.setItem("todos", JSON.stringify(data));
  }
};
let todos;
let completetodo;
if (localStorage.getItem("todos") === null) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem("todos"));
}
if (localStorage.getItem("complete") === null) {
  completetodo = [0];
} else {
  completetodo = JSON.parse(localStorage.getItem("complete"));
}
console.log(completetodo, todos);
if (todos != []) {
  todos.forEach((element) => {
    if (completetodo != []) {
      if (!completetodo.includes(element)) {
        tasklist.innerHTML += `<div class="todo"><li class="todo-item">${element}</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button><button class="edit-btn"><i class="fas fa-edit"></i></button></div>`;
      } else {
        tasklist.innerHTML += `<div class="todo completed"><li class="todo-item">${element}</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button><button class="edit-btn"><i class="fas fa-edit"></i></button></div>`;
      }
    } else {
      tasklist.innerHTML += `<div class="todo"><li class="todo-item">${element}</li><button class="complete-btn"><i class="fas fa-check"></i></button><button class="trash-btn"><i class="fas fa-trash"></i></button><button class="edit-btn"><i class="fas fa-edit"></i></button></div>`;
    }
  });
}

tasklist.addEventListener("click", (e) => {
  console.log(e.target.className);
  button.classList.remove("editable");
  if (
    e.target.className == "complete-btn" ||
    e.target.className == "fas fa-check"
  ) {
    e.target.parentElement.classList.add("completed");
    let complete;
    if (localStorage.getItem("complete") === null) {
      complete = [];
    } else {
      complete = JSON.parse(localStorage.getItem("complete"));
    }
    complete.push(e.target.parentElement.firstElementChild.textContent);

    localStorage.setItem("complete", JSON.stringify(complete));
  } else if (
    e.target.className == "trash-btn" ||
    e.target.className == "fas fa-trash"
  ) {
    e.target.parentElement.classList.add("fall");
    e.target.parentElement.addEventListener("transitionend", () => {
      e.target.parentElement.remove();
    });

    let data = localStorage.getItem("todos");
    var todos = JSON.parse(data);
    var yeniDizi = todos.filter(function (eleman) {
      return eleman != e.target.parentElement.firstElementChild.textContent;
    });

    data = yeniDizi;
    localStorage.setItem("todos", JSON.stringify(data));

    let data2 = localStorage.getItem("complete");
    var completetodos = JSON.parse(data2);
    var yeniDizi = completetodos.filter(function (eleman) {
      return eleman != e.target.parentElement.firstElementChild.textContent;
    });

    data2 = yeniDizi;
    localStorage.setItem("complete", JSON.stringify(data2));
  } else if (
    e.target.className == "edit-btn" ||
    e.target.className == "fas fa-edit"
  ) {
    button.classList.add("editable");
    if (e.target.className == "edit-btn") {
      veri = e.target.parentElement.firstElementChild.textContent;
      console.log(e.target.parentElement.firstElementChild.textContent);
      input.value = e.target.parentElement.firstElementChild.textContent;
    } else {
      veri = e.target.parentElement.parentElement.firstElementChild.textContent;
      console.log(
        e.target.parentElement.parentElement.firstElementChild.textContent
      );
      input.value =
        e.target.parentElement.parentElement.firstElementChild.textContent;
    }
  }
});

const clearButton = document.querySelector(".clear-btn");

clearButton.onclick = function () {
  localStorage.clear();
  window.location.href = window.location.href;
};

const filterOption = document.querySelector(".filter-todo");
filterOption.addEventListener("click", (e) => {
  const todos = tasklist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
});

