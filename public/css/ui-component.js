$(document).ready(() => {
  const display = $("#display");
  const form = $("#form");
  const todoUserInput = $("todoUserInput");

  const resetTodosInput = () => {
    todoUserInput.val("");
  };

  const buildIDs = (todo) => {
    return {
      editID: "edit_" + todo._id,
      deleteID: "delete_" + todo._id,
      listItemID: "listItem_" + todo.id,
      todoID: "todo_" + todo._id,
    };
  };

  const buildTemplate = (todo, ids) => {
    return (
      '<li class="list-group-item" id="${ids.listItemID}">' +
      +'<div class="row">' +
      "</li>"
    );
  };
});
