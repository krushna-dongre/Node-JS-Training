window.onload = function () {
  let username = this.getCookie("username");
  if (username) {
    window.location.replace("index.html");
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

function login() {
  const username = document.getElementById("FormUsername").value;
  const password = document.getElementById("FormPassword").value;
  const url = `http://localhost:3000/api/login`;
  const data = {
    username: username,
    password: password,
  };
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  };
  fetch(url, params).then((data) => {
    data.json().then((jsonData) => {
      validateResponse(jsonData.status);
    });
  });
}

function validateResponse(status) {
  if (status == "ok") {
    window.location.replace("profile.html");
  } else {
    if (status == "not ok") {
      alert("Please enter username and password");
    } else {
      alert("Invalid username or password");
    }
    document.getElementById("FormPassword").value = "";
    document.getElementById("FormUsername").value = "";
  }
}
