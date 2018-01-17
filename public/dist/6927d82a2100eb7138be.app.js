/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//check login
document.getElementById("account-login").addEventListener("submit", checkLogin);

//check email
document.getElementById("emailInput").addEventListener("keypress", checkEmail);

//check password
document.getElementById("passwordInput").addEventListener("keyup", checkPassword);

// postajax
function postAjax(url, data, success, error) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('POST', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) {
      success(JSON.parse(xhr.responseText));
    }
    if (xhr.readyState > 3 && xhr.status == 500) {
      error(JSON.parse(xhr.responseText));
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa('lm$cl!3nt' + ':' + 'lm$s3creT'));
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}

//get ajax
function getAjax(url, data, success, error) {
  var params = typeof data == 'string' ? data : Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');

  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open('GET', url);
  xhr.onreadystatechange = function () {
    if (xhr.readyState > 3 && xhr.status == 200) {
      success(JSON.parse(xhr.responseText));
    }
    if (xhr.readyState > 3 && xhr.status == 500) {
      error(JSON.parse(xhr.responseText));
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa('lm$cl!3nt' + ':' + 'lm$s3creT'));
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}
//check email
function checkEmail() {
  var status = false;
  var inputEmail = document.accountLogin.email.value;
  var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  var emailRequired = document.getElementById("emailRequired");
  document.getElementById("userPasswordWrong").style.display = "none";
  if (inputEmail.length >= 1 && inputEmail.search(emailRegEx) == -1) {
    emailRequired.innerHTML = 'Invalid email address.';
    emailRequired.style.display = "block";
  } else if (inputEmail.length <= 0) {
    emailRequired.innerHTML = 'Please enter your email address.';
    emailRequired.style.display = "block";
  } else {
    emailRequired.style.display = "none";
    status = true;
  }
  return status;
}

function checkPassword() {
  var status = false;
  var inputPassword = document.accountLogin.password.value;
  var passwordRequired = document.getElementById("passwordRequired");
  document.getElementById("userPasswordWrong").style.display = "none";
  if (inputPassword.length <= 0) {
    passwordRequired.style.display = "block";
  } else {
    passwordRequired.style.display = "none";
    status = true;
  }
  return status;
}
// check login
function checkLogin(e) {
  e.preventDefault();
  //  clearErrors()
  checkPassword();
  if (checkEmail() && checkPassword()) {
    document.getElementById("signingIn").innerHTML = "SIGNING IN";
    let userData = {
      grant_type: 'password',
      username: document.accountLogin.email.value,
      password: document.accountLogin.password.value,
      device_id: 'abcd'
    };
    postAjax('http://localhost:9000/api/authenticate', userData, function (data) {
      // console.log(data); success

      document.getElementById('users-list').style.display = 'block';
      document.getElementById('login-id').style.display = 'none';
      getAjax('http://localhost:9000/api/users', {}, function (data) {
        // console.log("data");
        var printThis = "";
        for (var i = 0; i < data.length; i++) {
          printThis += "<br>" + data[i].name;
        }

        document.getElementById("user-list-data").innerHTML = printThis;

        // debugger;
      });
    }, function (data) {
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
clearErrors();
//check url
checkUrl();

//hide errors
function clearErrors() {
  document.getElementById("emailRequired").style.display = "none";
  document.getElementById("passwordRequired").style.display = "none";
  document.getElementById("userPasswordWrong").style.display = "none";
  document.getElementById("signingIn").innerHTML = "SIGN IN";
}

function checkUrl() {
  let urlPath = location.pathname;
  if (urlPath == '/logout') {
    localStorage.clear();
    location.href = '';
  }
}

function makeConnection() {
  CrossStorageHub.init([{ origin: /localhost:4200$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] }, { origin: /localhost:3000$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] }, { origin: /.*cloudfront.net$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] }, { origin: /.*fusemachines.com$/, allow: ['get', 'set', 'del', 'getKeys', 'clear'] }]);
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGQ1NjcxMzI3NmE4MjU2Zjc0MzciLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2hlY2tMb2dpbiIsImNoZWNrRW1haWwiLCJjaGVja1Bhc3N3b3JkIiwicG9zdEFqYXgiLCJ1cmwiLCJkYXRhIiwic3VjY2VzcyIsImVycm9yIiwicGFyYW1zIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImsiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwieGhyIiwid2luZG93IiwiWE1MSHR0cFJlcXVlc3QiLCJBY3RpdmVYT2JqZWN0Iiwib3BlbiIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJzZXRSZXF1ZXN0SGVhZGVyIiwiYnRvYSIsInNlbmQiLCJnZXRBamF4IiwiaW5wdXRFbWFpbCIsImFjY291bnRMb2dpbiIsImVtYWlsIiwidmFsdWUiLCJlbWFpbFJlZ0V4IiwiZW1haWxSZXF1aXJlZCIsInN0eWxlIiwiZGlzcGxheSIsImxlbmd0aCIsInNlYXJjaCIsImlubmVySFRNTCIsImlucHV0UGFzc3dvcmQiLCJwYXNzd29yZCIsInBhc3N3b3JkUmVxdWlyZWQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1c2VyRGF0YSIsImdyYW50X3R5cGUiLCJ1c2VybmFtZSIsImRldmljZV9pZCIsInByaW50VGhpcyIsImkiLCJuYW1lIiwiY2xlYXJFcnJvcnMiLCJjaGVja1VybCIsInVybFBhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwibG9jYWxTdG9yYWdlIiwiY2xlYXIiLCJocmVmIiwibWFrZUNvbm5lY3Rpb24iLCJDcm9zc1N0b3JhZ2VIdWIiLCJpbml0Iiwib3JpZ2luIiwiYWxsb3ciXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNB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ZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBkNTY3MTMyNzZhODI1NmY3NDM3IiwiLy9jaGVjayBsb2dpblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY2NvdW50LWxvZ2luXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgY2hlY2tMb2dpbik7XG5cbi8vY2hlY2sgZW1haWxcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxJbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgY2hlY2tFbWFpbCk7XG5cbi8vY2hlY2sgcGFzc3dvcmRcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRJbnB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgY2hlY2tQYXNzd29yZCk7XG5cbi8vIHBvc3RhamF4XG5mdW5jdGlvbiBwb3N0QWpheCh1cmwsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKSB7XG52YXIgcGFyYW1zID0gdHlwZW9mIGRhdGEgPT0gJ3N0cmluZycgPyBkYXRhIDogT2JqZWN0LmtleXMoZGF0YSkubWFwKFxuICAgICAgZnVuY3Rpb24oayl7IHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVtrXSkgfVxuICApLmpvaW4oJyYnKTtcblxudmFyIHhociA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbnhoci5vcGVuKCdQT1NUJywgdXJsKTtcbnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHhoci5yZWFkeVN0YXRlPjMgJiYgeGhyLnN0YXR1cz09MjAwKSB7IHN1Y2Nlc3MoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSk7IH1cbiBpZiAoeGhyLnJlYWR5U3RhdGU+MyAmJiB4aHIuc3RhdHVzPT0gNTAwKSB7IGVycm9yKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpOyB9XG59O1xueGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtUmVxdWVzdGVkLVdpdGgnLCAnWE1MSHR0cFJlcXVlc3QnKTtcbnhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBidG9hKCdsbSRjbCEzbnQnICsgJzonICsgJ2xtJHMzY3JlVCcpKTtcbnhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG54aHIuc2VuZChwYXJhbXMpO1xucmV0dXJuIHhocjtcbn1cblxuLy9nZXQgYWpheFxuZnVuY3Rpb24gZ2V0QWpheCh1cmwsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yKSB7XG52YXIgcGFyYW1zID0gdHlwZW9mIGRhdGEgPT0gJ3N0cmluZycgPyBkYXRhIDogT2JqZWN0LmtleXMoZGF0YSkubWFwKFxuICAgICAgZnVuY3Rpb24oayl7IHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoZGF0YVtrXSkgfVxuICApLmpvaW4oJyYnKTtcblxudmFyIHhociA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA/IG5ldyBYTUxIdHRwUmVxdWVzdCgpIDogbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbnhoci5vcGVuKCdHRVQnLCB1cmwpO1xueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoeGhyLnJlYWR5U3RhdGU+MyAmJiB4aHIuc3RhdHVzPT0yMDApIHsgc3VjY2VzcyhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKTsgfVxuIGlmICh4aHIucmVhZHlTdGF0ZT4zICYmIHhoci5zdGF0dXM9PSA1MDApIHsgZXJyb3IoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSk7IH1cbn07XG54aHIuc2V0UmVxdWVzdEhlYWRlcignWC1SZXF1ZXN0ZWQtV2l0aCcsICdYTUxIdHRwUmVxdWVzdCcpO1xueGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmFzaWMgJyArIGJ0b2EoJ2xtJGNsITNudCcgKyAnOicgKyAnbG0kczNjcmVUJykpO1xueGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbnhoci5zZW5kKHBhcmFtcyk7XG5yZXR1cm4geGhyO1xufVxuLy9jaGVjayBlbWFpbFxuZnVuY3Rpb24gY2hlY2tFbWFpbCgpe1xudmFyIHN0YXR1cyA9IGZhbHNlO1xudmFyIGlucHV0RW1haWwgPSBkb2N1bWVudC5hY2NvdW50TG9naW4uZW1haWwudmFsdWU7XG52YXIgZW1haWxSZWdFeCA9IC9eW0EtWjAtOS5fJSstXStAW0EtWjAtOS4tXStcXC5bQS1aXXsyLDR9JC9pO1xudmFyIGVtYWlsUmVxdWlyZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsUmVxdWlyZWRcIik7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJQYXNzd29yZFdyb25nXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbmlmIChpbnB1dEVtYWlsLmxlbmd0aCA+PSAxICYmIGlucHV0RW1haWwuc2VhcmNoKGVtYWlsUmVnRXgpID09IC0xKSB7XG4gZW1haWxSZXF1aXJlZC5pbm5lckhUTUwgPSAnSW52YWxpZCBlbWFpbCBhZGRyZXNzLic7XG4gZW1haWxSZXF1aXJlZC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufWVsc2UgaWYoaW5wdXRFbWFpbC5sZW5ndGggPD0gMCl7XG4gZW1haWxSZXF1aXJlZC5pbm5lckhUTUwgPSAnUGxlYXNlIGVudGVyIHlvdXIgZW1haWwgYWRkcmVzcy4nO1xuIGVtYWlsUmVxdWlyZWQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1lbHNle1xuZW1haWxSZXF1aXJlZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5zdGF0dXMgPSB0cnVlO1xufVxucmV0dXJuIHN0YXR1cztcbn1cblxuZnVuY3Rpb24gY2hlY2tQYXNzd29yZCgpe1xudmFyIHN0YXR1cyA9IGZhbHNlO1xudmFyIGlucHV0UGFzc3dvcmQgPSBkb2N1bWVudC5hY2NvdW50TG9naW4ucGFzc3dvcmQudmFsdWU7XG52YXIgcGFzc3dvcmRSZXF1aXJlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRSZXF1aXJlZFwiKTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclBhc3N3b3JkV3JvbmdcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuaWYoaW5wdXRQYXNzd29yZC5sZW5ndGggPD0wKXtcbiBwYXNzd29yZFJlcXVpcmVkLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59ZWxzZXtcbiBwYXNzd29yZFJlcXVpcmVkLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiBzdGF0dXMgPSB0cnVlO1xufVxucmV0dXJuIHN0YXR1cztcbn1cbi8vIGNoZWNrIGxvZ2luXG5mdW5jdGlvbiBjaGVja0xvZ2luKGUpe1xuZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gIGNsZWFyRXJyb3JzKClcbmNoZWNrUGFzc3dvcmQoKVxuaWYoY2hlY2tFbWFpbCgpICYmIGNoZWNrUGFzc3dvcmQoKSl7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25pbmdJblwiKS5pbm5lckhUTUwgPSBcIlNJR05JTkcgSU5cIjtcbmxldCB1c2VyRGF0YSA9IHtcbiAgZ3JhbnRfdHlwZToncGFzc3dvcmQnLFxuICB1c2VybmFtZTogZG9jdW1lbnQuYWNjb3VudExvZ2luLmVtYWlsLnZhbHVlLFxuICBwYXNzd29yZDpkb2N1bWVudC5hY2NvdW50TG9naW4ucGFzc3dvcmQudmFsdWUsXG4gIGRldmljZV9pZDonYWJjZCdcbn1cbnBvc3RBamF4KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBpL2F1dGhlbnRpY2F0ZScsIHVzZXJEYXRhLCBmdW5jdGlvbihkYXRhKXtcbiAgIC8vIGNvbnNvbGUubG9nKGRhdGEpOyBzdWNjZXNzXG5cbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2Vycy1saXN0Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbi1pZCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICBnZXRBamF4KCdodHRwOi8vbG9jYWxob3N0OjkwMDAvYXBpL3VzZXJzJywge30sIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgLy8gY29uc29sZS5sb2coXCJkYXRhXCIpO1xuICAgICAgdmFyIHByaW50VGhpcyA9IFwiXCI7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICBwcmludFRoaXMgKz0gXCI8YnI+XCIrZGF0YVtpXS5uYW1lO1xuICAgICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlci1saXN0LWRhdGFcIikuaW5uZXJIVE1MPXByaW50VGhpcztcblxuICAgICAgLy8gZGVidWdnZXI7XG4gICAgfSlcblxuIH0sIGZ1bmN0aW9uKGRhdGEpe1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclBhc3N3b3JkV3JvbmdcIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiB9KTtcbiAvLyBwb3N0QWpheCgnaHR0cDovL2Zvby5iYXIvJywgJ3AxPTEmcDI9SGVsbG8rV29ybGQnLCBmdW5jdGlvbihkYXRhKXtcbiAvLyAgIGNvbnNvbGUubG9nKGRhdGEsXCJkYXRhXCIpO1xuIC8vIH0pO1xufVxucmV0dXJuIGZhbHNlO1xuXG4vLyBleGFtcGxlIHJlcXVlc3Qgd2l0aCBkYXRhIG9iamVjdFxuLy8gcG9zdEFqYXgoJ2h0dHA6Ly9mb28uYmFyLycsIHsgcDE6IDEsIHAyOiAnSGVsbG8gV29ybGQnIH0sIGZ1bmN0aW9uKGRhdGEpeyBjb25zb2xlLmxvZyhkYXRhKTsgfSk7XG5cbn1cbi8vY2xlYXIgZXJyb3JzIG9uIGZpcnN0IGxvYWRcbmNsZWFyRXJyb3JzKClcbi8vY2hlY2sgdXJsXG5jaGVja1VybCgpXG5cbi8vaGlkZSBlcnJvcnNcbmZ1bmN0aW9uIGNsZWFyRXJyb3JzKCl7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsUmVxdWlyZWRcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFJlcXVpcmVkXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclBhc3N3b3JkV3JvbmdcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduaW5nSW5cIikuaW5uZXJIVE1MID0gXCJTSUdOIElOXCJcbn1cblxuZnVuY3Rpb24gY2hlY2tVcmwoKXtcbmxldCB1cmxQYXRoID0gbG9jYXRpb24ucGF0aG5hbWU7XG5pZih1cmxQYXRoID09ICcvbG9nb3V0Jyl7XG5sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbmxvY2F0aW9uLmhyZWYgPSAnJ1xufVxufVxuXG5mdW5jdGlvbiBtYWtlQ29ubmVjdGlvbigpe1xuQ3Jvc3NTdG9yYWdlSHViLmluaXQoW1xuIHtvcmlnaW46IC9sb2NhbGhvc3Q6NDIwMCQvLCBhbGxvdzogWydnZXQnLCAnc2V0JywgJ2RlbCcsICdnZXRLZXlzJywgJ2NsZWFyJ119LFxuIHtvcmlnaW46IC9sb2NhbGhvc3Q6MzAwMCQvLCBhbGxvdzogWydnZXQnLCAnc2V0JywgJ2RlbCcsICdnZXRLZXlzJywgJ2NsZWFyJ119LFxuIHtvcmlnaW46IC8uKmNsb3VkZnJvbnQubmV0JC8sIGFsbG93OiBbJ2dldCcsICdzZXQnLCAnZGVsJywgICdnZXRLZXlzJywgJ2NsZWFyJ119LFxuIHtvcmlnaW46IC8uKmZ1c2VtYWNoaW5lcy5jb20kLywgYWxsb3c6IFsnZ2V0JywgJ3NldCcsICdkZWwnLCAgJ2dldEtleXMnLCAnY2xlYXInXX1cbl0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==