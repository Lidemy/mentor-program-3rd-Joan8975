/* eslint-disable func-names */
/* eslint-disable no-undef */
function getTodoHTML(value) {
  return `
  <li class="list-group-item d-flex justify-content-between align-items-center add-item">
  ${value}
    <div class="ml-auto">
      <button class="btn btn-primary todo_done" type="button">Done</button>
      <button class="btn btn-danger todo_delete" type="button">Delete</button>
    </div>
  </li>`;
}
$(document).ready(() => {
  function addTodo(value) {
    const newTodo = getTodoHTML(value);
    $('.add-input').val('');
    $('.todo-list').append(newTodo);
  }
  $('.add-btn').click((event) => {
    const textValue = $("input[name='add-input']").val();
    if (textValue !== '') {
      addTodo(textValue);
    } else {
      event.preventDefault();
    }
  });
  $('.todo-list').click((e) => {
    const element = $(e.target);
    if (element.hasClass('todo_delete')) {
      element.parent().parent().remove();
    } else if (element.hasClass('todo_done')) {
      element.parent().parent().toggleClass('list-group-item-success');
      element.toggleClass('btn-primary btn-secondary');
      if (element.hasClass('todo_undone')) {
        element.removeClass('todo_undone');
        element.html('Done');
      } else {
        element.addClass('todo_undone');
        element.html('Undone');
      }
    }
  });
});
