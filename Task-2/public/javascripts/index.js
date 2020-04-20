window.onload = function () {
  let username = this.getCookie("username");
  if (username) {
    document.getElementById("email").innerHTML = this.getCookie("email");
    document.getElementById("login-btn").style.display = "none";
  } else {
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("profile-btn").style.display = "none";
  }
};

function getCookie(cookiename) {
  // Get name followed by anything except a semicolon
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(
    !!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : ""
  );
}
function deleteCookie(cookie) {
  document.cookie = `${cookie}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function logout() {
  deleteCookie("username");
  deleteCookie("is_loggedin");
  deleteCookie("email");
  window.location.replace("index.html");
}
