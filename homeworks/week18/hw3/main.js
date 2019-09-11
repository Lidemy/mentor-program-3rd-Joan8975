/* eslint-env jquery */
let list = [];
function render() {
  $('.todo-list').empty();
  for (let i = 0; i < list.length; i += 1) {
    $('.todo-list').append(
      `<li class="list-group-item d-flex justify-content-between align-items-center add-item">
      ${list[i].todo}
        <div class="ml-auto">
          <button class="btn btn-danger todo_delete " type="button" data_id="${i}">Delete</button>
        </div>
       </li>`,
    );
  }
}

function addTodo(value) {
  $('.add-input').val('');
  list.push({ todo: value, id: list.length });
  render();
}

$(document).ready(() => {
  $('.add-btn').click((event) => {
    const textValue = $("input[name='add-input']").val();
    if (textValue !== '') {
      addTodo(textValue);
    } else {
      event.preventDefault();
    }
  });
  $('.todo-list').click((e) => {
    const id = $(e.target).attr('data_id');
    list = list.filter(item => item.id.toString() !== id);
    for (let i = 0; i < list.length; i += 1) { // 重新調整 新陣列 id 的值
      list[i].id = i;
    }
    render();
  });
});
