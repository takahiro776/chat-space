$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-MessageContents__item">
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
                  </div>`
              return html;
    } else {
      var html = 
      `<div class="chat-MessageContents__item">
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
       </div>`
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
      $('.send-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.send-btn').prop('disabled', false);
  });
  })
});