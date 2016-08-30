var items = [];
var qvars = [];
var converter = new showdown.Converter()
var position = -1;
var openpage = "";

$(document).scroll(function () {
  var y = $(this).scrollTop();
  if (y > 150) {
    $('#pageheader').css('position', 'fixed');
    $('#pageheader').css('height', '50px');
    $('#pagetitle').css('line-height', '50px');
    $('#pagenav').css('line-height', '50px');
    $('main').css('margin-top', '100px');
  } else {
    $('#pageheader').css('position', 'static');
    $('#pageheader').css('height', '100px');
    $('#pagetitle').css('line-height', '100px');
    $('#pagenav').css('line-height', '100px');
    $('main').css('margin-top', '0px');
  }
});

$(document).ready(function () {
  getQueryString();
  
  $.getJSON("source/index.json", function(data) {
    $.each( data, function( key, val ) {
      items.push(val);
    });

    if (openpage != "") {
      loadPost(openpage)
    } else {
      loadTenPosts();
    }
  });
});

function loadPost(filename) {
  $.ajax({
    url: "http://demom.github.io/source/" + filename, success: function (html) {
      $("main").prepend("<article>" + converter.makeHtml(html) + "</article>");
    }, async: false
  });
}

function loadTenPosts() {
  var fromPosition = position;

  if (fromPosition == -1) {
    fromPosition = items.length - 1;
  }

  var toPosition = fromPosition - 10;
  if (toPosition < 0) toPosition = -1;
  
  for (i = fromPosition; i > toPosition; i--) {
    loadPost(items[i]["filename"]); 
  }

  position = toPosition;
}

function getQueryString() {
  var q = document.URL.split('?')[1];
  if(q != undefined){
    q = q.split('&');

    for(var i = 0; i < q.length; i++){
      hash = q[i].split('=');
      if (hash.length > 1) {
        qvars.push(hash[1]);
        qvars[hash[0]] = hash[1];
      } else {
        openpage = q[i];
      }
    }

    return true;
  }

  return false;
}