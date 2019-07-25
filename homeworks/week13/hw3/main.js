/* eslint-env jquery */
$(document).ready(() => {
/* 新增主留言與子留言 */
  $('.wrapper').on('submit', 'form', (e) => {
    const content = $(e.target).find('textarea[name=content]').val();
    const parentId = $(e.target).find('input[name=parent_id]').val();
    if (parentId >= 0) { /* 針對可獲取 parentId 的 form 停止默認行為 */
      e.preventDefault();
    } else { /* 其他 form（更新留言）的執行行為不變 */
      return;
    }
    $('textarea[name=content]').val('');
    $.ajax({
      type: 'POST',
      url: 'add_handle.php',
      data: {
        content,
        parent_id: parentId,
      },
      success: (resp) => {
        const res = JSON.parse(resp);
        if (res.result === 'success') { /* 如果得到主留言成功結果，執行以下 */
          $('.comment_group').prepend(`
          <div class='comment'>
            <div class='anchor' id='${res.id}'>#</div>
            <img src='./user.png' class='preview_img'>
            <p class='nickname_display'>${res.nickname}</p>
            <p class='time'>${res.created_at}</p>
            <p class='text'>${content}</p>
            <div class='clearfix'></div>
            <a href='./index.php?page=<?= $page ?>&id=${res.id}' class='edit btn btn-outline-info'>編輯</a>
            <input type="submit" class='delete btn btn-outline-danger' data_id= '${res.id}' value='刪除'></input>
            <div class="sub_comments" comment_id='${res.id}'></div>
            <div class="add_sub_comment">
              <form  method="POST" action="./add_handle.php">
                <input type="hidden" value="${res.id}" name="parent_id">
                <p class="sub_title">新增留言</p>
                <textarea name="content" class="sub_message_txt" placeholder="留言⋯⋯" style="resize:none;width:388px height:100px"></textarea>
                <button class="mes_send btn btn-info" type="submit">發佈</button>
                <div class="clearfix"></div>
              </form>
            </div>
          </div>
          `);
        } else if (res.result === 'sub_success') { /* 如果得到子留言成功結果，執行以下 */
          const commentId = res.parent_id;
          // $("#"+commentId)
          $(`div[comment_id='${commentId}']`).append(`
           <div class="sub_comment_author">
             <img src='./user.png' class='preview_img'>
             <p class='sub_nickname_display'>${res.nickname}</p>
             <p class='sub_time'>${res.created_at}</p>
             <p class='sub_text'>${content}</p>
             <div class='clearfix'></div>
             <input type="submit" class='delete btn btn-outline-danger' value='刪除' data_id= '${res.id}'></input>
           </div>`);
        } else {
          alert(res.message);
        }
      },
    });
  });
  /* 刪除主留言與子留言 */
  $('.comment_group').on('click', '.delete', (e) => {
    const id = $(e.target).attr('data_id');
    if (!window.confirm('是否確定要刪除?')) return;
    $.ajax({
      method: 'POST',
      url: 'delete_comment.php',
      data: {
        id,
      },
    }).done((resp) => {
      $(e.target).parent().hide(200);
      const res = JSON.parse(resp);
      alert(res.message);
    }).fail(() => {
      alert('刪除失敗！');
    });
  });
});
