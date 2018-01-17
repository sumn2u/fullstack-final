//check login
document.getElementById("account-login").addEventListener("submit", checkLogin);

//check email
document.getElementById("emailInput").addEventListener("keypress", checkEmail);

//check password
document.getElementById("passwordInput").addEventListener("keyup", checkPassword);

// postajax
function postAjax(url, data, success, error) {
var params = typeof data == 'string' ? data : Object.keys(data).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&');

var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
xhr.open('POST', url);
xhr.onreadystatechange = function() {
  if (xhr.readyState>3 && xhr.status==200) { success(JSON.parse(xhr.responseText)); }
 if (xhr.readyState>3 && xhr.status== 500) { error(JSON.parse(xhr.responseText)); }
};
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xhr.setRequestHeader('Authorization', 'Basic ' + btoa('lm$cl!3nt' + ':' + 'lm$s3creT'));
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(params);
return xhr;
}

//get ajax
function getAjax(url, data, success, error) {
var params = typeof data == 'string' ? data : Object.keys(data).map(
      function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
  ).join('&');

var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
xhr.open('GET', url);
xhr.onreadystatechange = function() {
  if (xhr.readyState>3 && xhr.status==200) { success(JSON.parse(xhr.responseText)); }
 if (xhr.readyState>3 && xhr.status== 500) { error(JSON.parse(xhr.responseText)); }
};
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xhr.setRequestHeader('Authorization', 'Basic ' + btoa('lm$cl!3nt' + ':' + 'lm$s3creT'));
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send(params);
return xhr;
}
//check email
function checkEmail(){
var status = false;
var inputEmail = document.accountLogin.email.value;
var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
var emailRequired = document.getElementById("emailRequired");
document.getElementById("userPasswordWrong").style.display = "none";
if (inputEmail.length >= 1 && inputEmail.search(emailRegEx) == -1) {
 emailRequired.innerHTML = 'Invalid email address.';
 emailRequired.style.display = "block";
}else if(inputEmail.length <= 0){
 emailRequired.innerHTML = 'Please enter your email address.';
 emailRequired.style.display = "block";
}else{
emailRequired.style.display = "none";
status = true;
}
return status;
}

function checkPassword(){
var status = false;
var inputPassword = document.accountLogin.password.value;
var passwordRequired = document.getElementById("passwordRequired");
document.getElementById("userPasswordWrong").style.display = "none";
if(inputPassword.length <=0){
 passwordRequired.style.display = "block";
}else{
 passwordRequired.style.display = "none";
 status = true;
}
return status;
}
// check login
function checkLogin(e){
e.preventDefault();
//  clearErrors()
checkPassword()
if(checkEmail() && checkPassword()){
document.getElementById("signingIn").innerHTML = "SIGNING IN";
let userData = {
  grant_type:'password',
  username: document.accountLogin.email.value,
  password:document.accountLogin.password.value,
  device_id:'abcd'
}
postAjax('http://localhost:9000/api/authenticate', userData, function(data){
   // console.log(data); success

   document.getElementById('users-list').style.display = 'block'
   document.getElementById('login-id').style.display = 'none'
    getAjax('http://localhost:9000/api/users', {}, function(data){
      // console.log("data");
      var printThis = "";
        for(var i = 0; i < data.length; i++){
             printThis += "<br>"+data[i].name;
        }

      document.getElementById("user-list-data").innerHTML=printThis;

      // debugger;
    })

 }, function(data){
    document.getElementById("userPasswordWrong").style.display = "block";
 });
 // postAjax('http://foo.bar/', 'p1=1&p2=Hello+World', function(data){
 //   console.log(data,"data");
 // });
}
return false;

// example request with data object
// postAjax('http://foo.bar/', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });

}
//clear errors on first load
clearErrors()
//check url
checkUrl()

//hide errors
function clearErrors(){
document.getElementById("emailRequired").style.display = "none";
document.getElementById("passwordRequired").style.display = "none";
document.getElementById("userPasswordWrong").style.display = "none";
document.getElementById("signingIn").innerHTML = "SIGN IN"
}

function checkUrl(){
let urlPath = location.pathname;
if(urlPath == '/logout'){
localStorage.clear();
location.href = ''
}
}

function makeConnection(){
CrossStorageHub.init([
 {origin: /localhost:4200$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
 {origin: /localhost:3000$/, allow: ['get', 'set', 'del', 'getKeys', 'clear']},
 {origin: /.*cloudfront.net$/, allow: ['get', 'set', 'del',  'getKeys', 'clear']},
 {origin: /.*fusemachines.com$/, allow: ['get', 'set', 'del',  'getKeys', 'clear']}
]);
}
