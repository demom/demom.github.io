var items = [];
var converter = new showdown.Converter()
var position = -1;

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
  $.getJSON("source/index.json", function(data) {
    $.each( data, function( key, val ) {
      items.push(val);
    });
    loadTenPosts();
  });
});

function loadTenPosts() {
  var fromPosition = position;

  if (fromPosition == -1) {
    fromPosition = items.length - 1;
  }

  var toPosition = fromPosition - 10;
  if (toPosition < 0) toPosition = -1;
  
  for (i = fromPosition; i > toPosition; i--) {
    //alert(i + ": " + converter.makeHtml(items[i]));
    alert(i + ": " + items[i]["title"]);

    $.ajax("http://demom.github.io/source/" + items[i]["filename"], function (html) {
      $["body"].append(converter.makeHtml(html));
    }, false);    
  }

  position = toPosition;
}