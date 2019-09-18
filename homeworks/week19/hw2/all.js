/* eslint-env jquery */
/* eslint no-restricted-globals:0 */
function render() {
  $('.todo_group').empty();
  $.ajax({
    method: 'GET',
    url: 'http://joandes.com/todolist/api/list.php',
    success: (list) => {
      for (let i = 0; i < list.length; i += 1) {
        $('.todo_group').append(
          `<li>
             <div class="todo_item todo_default" data_id="${list[i].id}">
               <div class="icon ${list[i].done === '0' ? 'icon_check' : 'icon_checked'}"></div>
               <p class="txt"> ${list[i].content}</p>
             </div>
          </li>`,
        );
      }
      $('.todo_item').hover((e) => {
        const element = $(e.target);
        element.append(
          `<div class="icon icon_edit"></div>
           <div class="icon icon_delete"></div>
          `,
        );
      }, () => {
        $('.icon_edit').remove();
        $('.icon_delete').remove();
      });
    },
  });
}
render();

$(document).ready(() => {
  //  add
  $('.add_btn').click((event) => {
    const textValue = $("input[name='add_input']").val();
    if (textValue !== '') {
      $.ajax({
        type: 'POST',
        url: 'http://joandes.com/todolist/api/list.php',
        data: {
          content: `${textValue}`,
        },
        dataType: 'text',
        success: () => {
          $("input[name='add_input']").val('');
          render();
        },
      });
    } else {
      event.preventDefault();
    }
  });
  // 事件代理
  $('.todo_group').click((e) => {
    const element = $(e.target);
    const id = element.parent().attr('data_id');
    // 刪除 todo
    if (element.hasClass('icon_delete')) {
      if (!confirm('是否確定要刪除?')) return;
      $.ajax({
        method: 'DELETE',
        url: `http://joandes.com/todolist/api/list.php?id=${id}`,
      }).done(() => {
        render();
      }).fail(() => {
        alert('刪除失敗！');
      });
    // 完成/未完成
    } else if (element.hasClass('icon_check') || element.hasClass('icon_checked')) {
      $.ajax({
        method: 'PATCH',
        url: `http://joandes.com/todolist/api/list.php?id=${id}`,
        success: () => {
          element.toggleClass('icon_check icon_checked');
        },
      });
    // 可編輯樣式
    } else if (element.hasClass('icon_edit')) {
      const editValue = element.siblings('p').text();
      element.parent().parent().append(
        `<div type="text" class="todo_item todo_edit"  data_id='${id}'>
           <input type="text" class="edit_input" value="${editValue}">
           <div class="controller">
             <button class="btn_cancel" type="button">取消</button>
             <button class="btn_update" type="submit">變更</button>
           </div>
         </div>`,
      );
      element.parent().remove();
    // 編輯內容
    } else if (element.hasClass('btn_update')) {
      const dataId = element.parent().parent().attr('data_id');
      const content = element.parent().siblings('input').val();
      $.ajax({
        method: 'PATCH',
        url: `http://joandes.com/todolist/api/list.php?id=${dataId}`,
        data: {
          content: `${content}`,
        },
        dataType: 'text',
        success: () => {
          location.reload();
        },
      });
    // 取消編輯
    } else if (element.hasClass('btn_cancel')) {
      location.reload();
    }
  });
});
