$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="chat-MessageContents__item">
                      <div class="chat-MessageContents__item--top">
                        <div class="name">
                          ${message.user_name}
                        </div>
                        <div class="datetime">
                          ${message.created_at}
                        </div>
                      </div>
                      <div class="chat-MessageContents__item--text">
                        <p class="chat-MessageContents__item--content">
                          ${message.content}
                        </p>
                        <img class="chat-MessageContents__item--img" src="${message.image}">
                      </div>
                    </div>
                  </div>`
              return html;
    } else {
      var html = 
      `<div class="message" data-message-id=${message.id}>
        <div class="chat-MessageContents__item">
          <div class="chat-MessageContents__item--top">
            <div class="name">
              ${message.user_name}
            </div>
            <div class="datetime">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-MessageContents__item--text">
            <p class="chat-MessageContents__item--content">
              ${message.content}
            </p>
          </div>
        </div>
      </div>  `
       return html;
    }; 
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-MessageContents').append(html);
      $('.chat-MessageContents').animate({ scrollTop: $('.chat-MessageContents')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.send-btn').prop('disabled', false);
    });

  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-MessageContents').append(insertHTML);
      $('.chat-MessageContents').animate({ scrollTop: $('.chat-MessageContents')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});