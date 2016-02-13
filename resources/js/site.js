$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 150) {
    $('#pageheader').css('position', 'fixed');
    $('#pageheader').css('height', '50px');
    $('#pagetitle').css('line-height', '50px');
    $('#pagenav').css('line-height', '50px');
  } else {
    $('#pageheader').css('position', 'static');
    $('#pageheader').css('height', '100px');
    $('#pagetitle').css('line-height', '100px');
    $('#pagenav').css('line-height', '100px');
  }
});