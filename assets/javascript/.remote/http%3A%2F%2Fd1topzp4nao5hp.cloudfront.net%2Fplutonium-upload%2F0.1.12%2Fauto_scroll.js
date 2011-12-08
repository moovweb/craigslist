x$(window).on(
  'load',
  function(){setTimeout(function(){ if (window.pageYOffset < 50) {window.scrollTo(0,1);}},0);}
);
                  
x$(window).on(
  'load',
  function(){setTimeout(function(){ if (parent.window.pageYOffset < 50) {parent.window.scrollTo(0,1);}},0);}
);