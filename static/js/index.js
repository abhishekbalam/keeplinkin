function stoppedTyping(obj) {
  if(obj.value.length > 0) {
    console.log(obj.value.indexOf("keeplink.in"));
    
    if(obj.value.indexOf("keeplink.in")>=0){
      $('#error').css("display","block")
      $('#modalbtn').prop('disabled',true);
    }
    else{
      $('#modalbtn').prop('disabled',false);
    }
  }
  else{
    $('#error').css("display","none")
    $('#modalbtn').prop('disabled',true);
  }
} 

function prop(obj) {
  console.log(obj.innerHTML);
  if(obj.innerHTML=="Custom"){
  console.log("herree")
   $('#submitrequest').prop('disabled',true);
  }
  else{
   $('#submitrequest').prop('disabled',false);
  }
}

$(document).ready(function(){
  $('#error').css("display","none")
  $('#modalbtn').prop('disabled',true);
  
  $('#long_url').val("");

  $('.notif').hide();
  $('#custom_url').val('https://keeplink.in/');
  $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
          window.location.hash = hash;
      });
    }
  });
  


  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });

  function isValid(str) { return /^[0-9A-Za-z\s\-]+$/.test(str); }
  
  $('#checkcustom').click(function(){
    $('#empty').hide();
    $('#unavailable').hide();
    $('#available').hide();
    $("#format").hide();
    $('#submitrequest').prop('disabled',true);  

    var c_url=$('#custom_url').val();
      
    if(c_url=="https://keeplink.in/"){
      $('#empty').show();
      return; 
    }

    c_url=c_url.replace("https://keeplink.in/","")
    c_url=c_url.replace(/\/$/, "");
    
    if(!isValid(c_url)){
      $("#format").show();
      return
    }
    c_url="/checkcustom/"+c_url
    console.log(c_url)
    
    $.ajax({url: c_url, success: function(result){
        console.log(result)
        if(result=="0"){
          $('#available').show();
          $('#submitrequest').prop('disabled',false);
        }
        else{
          $('#unavailable').show();
        }
    }});
  });

  $('#submitrequest').click(function(e){
    // result = url.replace(/(^\w+:|^)\/\//, '');
    var c_url=""
    var l_url=$('#long_url').val();
    var type=$('.tab-pane.active').attr('id');
    var c_url=$('#custom_url').val();

    c_url = c_url.replace('https://keeplink.in/', '')    

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      type =  $(e.target).attr('id');
    });
      
    
    console.log("Url:"+l_url+"\nType:"+type+"\nCustom Url:"+ c_url);
    
    var obj = { "url": l_url, "type": type, "surl":c_url };
    console.log(obj);
    
    $('#myModal').modal('hide');
    
    var request=$.ajax({
      type: 'POST',
      url: '/shorten/',
      data: JSON.stringify(obj),
      success:function(data) {
        var shurl='/'+data.surl;
        
        $('#status').modal('show');
        $('#ourl').html(data.url);
        $('#ourl').attr('href',data.url);
        $('#surl').html('https://keeplink.in'+shurl);
        $('#surl').attr('href',shurl);
        $('#long_url').val("");
      },
      dataType: 'json',
      contentType: "application/json"
    });
  });

});
