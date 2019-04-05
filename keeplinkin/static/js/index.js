$('#long_url').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $('#modalbtn').click();
    return false;  
  }
});   


$('#custom_url').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    $('#checkcustom').click();
    return false;  
  }
});   


function validURL(str) {
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex .test(str)) {
    return false;
  } else {
    return true;
  }
}

function stoppedTyping(obj) {
  if(obj.value.length > 0) {

    if(validURL(obj.value)){
      console.log(obj.value.indexOf("keeplink.in"));
      if(obj.value.indexOf("keeplink.in")>=0){
        $('#error2').css("display","block")
        $('#modalbtn').prop('disabled',true);
      }
      else{
        $('#modalbtn').prop('disabled',false);
      }
    }
    else{ 
       $('#error3').css("display","block")
      $('#modalbtn').prop('disabled',true);
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
    $('#custom_url').focus();
    console.log("Custom");
    $('#submitrequest').prop('disabled',true);
  }
  else{
   $('#submitrequest').prop('disabled',false);
  }
}

function CopyToClipboard(containerid) {
  var range = document.createRange();  
  var selector=document.getElementById(containerid);

  range.selectNode(selector);
  window.getSelection().addRange(range);  


  try {  
    // Now that we've selected the anchor text, execute the copy command  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy link was ' + msg);
    alert('Link Copied!');
  } catch(err) {  
    console.log('Oops, unable to copy'); 
    alert('Unable to copy! Please copy manually...')
  }  
  window.getSelection().removeAllRanges();  
}

$(document).ready(function(){
  $('#error1').css("display","none");
  $('#error2').css("display","none");
  $('#error3').css("display","none");
  // var input = document.getElementById("long_url").focus();
  $('#long_url').focus();
  
  // $('#modalbtn').prop('disabled',true);
  
  $('#long_url').val("");

  function CopyToClipboard(containerid) {
    if (document.selection) { 
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy"); 
    }
    else if (window.getSelection) {
        var range = document.createRange();
         range.selectNode(document.getElementById(containerid));
         window.getSelection().addRange(range);
         document.execCommand("copy");
         alert("Link Copied!") 
    }
  }

  $('.notif').hide();
  $('#custom_url').val('https://keeplink.in/');
  $(".navbar a, footer a[href='#home']").on('click', function(event) {
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

  $('#modalbtn').click(function () {
    $('#error1').css("display","none");
    $('#error2').css("display","none");
    $('#error3').css("display","none");
    
    var val=$('#long_url').val();
    if(val.indexOf("://keeplink.in")>=0){
      $('#error2').css("display","block")
      return;
    }
    else if(!validURL(val)){
      $('#error3').css("display","block")
      return;
    }
    else if(val.replace(/^\s+/g, '').length==0){
      $('#error1').css("display","block")
      return;
    }
    else{
      $('#myModal').modal();
    }
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
    
    $.ajax({
      url: c_url,
      success:function(result){
        console.log(result)
        if(result=="0"){
          $('#available').show();
          $('#submitrequest').prop('disabled',false);
        }
        else{
          $('#unavailable').show();
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
      }
      });
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
        console.log(data);
        $('#status').modal('show');
        $('#ourl').html(data.url);
        $('#ourl').attr('href',data.url);
        $('#surl').html(data.surl);
        $('#surl').attr('href',data.surl);
        $('#long_url').val("");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(errorThrown);
      },
      dataType: 'json',
      contentType: "application/json"
    });
  });

});
