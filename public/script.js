window.addEventListener("load",function(event){
    const _registerButton = document.getElementById('register__button');
    const _signinButton =  document.getElementById('signin__button');

    const hostname = window.location.hostname;

    const httpMaker = function(){

      function httpRequestMethod(method,body){
        return function(path,callback){
          let xhr = new XMLHttpRequest();
          xhr.open(method,path,true);
          xhr.send(body);
          xhr.onload = callback;
          xhr.onError = function(){
            console.error("An Error has occured during the HTTP request")
          }
        }
      }
      return {
        put: httpRequestMethod('PUT',body),
        post:httpRequestMethod('POST',body),
        del: httpRequestMethod('DELETE'),
        get: httpRequestMethod('GET',)
      }
    };

    function handleResponse(){
      console.log(JSON.parse(this.responseText))
    }
    
    const http = httpMaker();

    http.get('/test', handleResponse)

  

    _signinButton.addEventListener('click', function(event){

    })

    _registerButton.addEventListener('click', function(event){
      
    })
})