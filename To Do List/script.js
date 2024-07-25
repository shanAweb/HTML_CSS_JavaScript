const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", () => {
  const taskText = input.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const doneButton = document.createElement("button");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    doneButton.textContent = "Done";

    deleteButton.style = "background:red;";
    doneButton.style = "background:green;";

    taskSpan.style = "padding:10px; left:0;";
    li.appendChild(taskSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    li.appendChild(doneButton);

    taskList.appendChild(li);

    input.value = "";

    deleteButton.addEventListener("click", () => {
      taskList.removeChild(li);
    });

    doneButton.addEventListener("click", () => {
      li.style = "background:green;";
      deleteButton.remove();
      editButton.remove();
    });

    editButton.addEventListener("click", () => {
      if (editButton.textContent === "Edit") {
        taskSpan.contentEditable = true;
        taskSpan.focus();
        editButton.textContent = "Save";
      } else {
        taskSpan.contentEditable = false;
        editButton.textContent = "Edit";
      }
    });
  }
});
