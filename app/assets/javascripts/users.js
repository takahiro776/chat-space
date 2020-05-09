$(function(){
  function appendUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${user.name}</p>
       <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`

    $("#user-search-result").append(html)
  }

  function appendErrMsgToHTML(message){
    var html =
    `<div class="chat-group-user clearfix">
       <p class="chat-group-user__name">${message}</p>
     </div>`

     $("#user-search-result").append(html)
  }

  function addUser(name, id){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>
              <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $('#chat-group-users').append(html)
  }
  //ユーザーを検索し、候補を出力する
  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val()
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("ユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  })

  //チャットメンバーを追加する
  $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
    var name = $(this).data('user-name');
    var id = $(this).data('user-id');
    $(this).parent().remove();
    addUser(name, id)
  });

  //チャットメンバーを削除する
  $('#chat-group-users').on('click', '.js-remove-btn', function(){
    $(this).parent().remove();
  });



});