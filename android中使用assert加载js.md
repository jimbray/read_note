  ```document.write("\
  <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js' type='text/javascript'></script>\
  <script type='text/javascript'>\
  alert($('html').html());\
  </script>\
  ");```
  
  document.write("\
  <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js' type='text/javascript'></script>\
  <script type='text/javascript'>\
  alert($('html').html());\
  </script>\
  ");
  
  
  var head = document.getElementsByTagName('head'); 
var testScript = document.createElement('script'); 
testScript.src = "test1.js"; 
testScript.type = 'text/javascript'; 
head[0].appendChild(testScript); 

sayHello();

