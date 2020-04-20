window.onload = function () {
  let username = this.getCookie("username");
  if (username) {
    document.getElementById("email").innerHTML = this.getCookie("email");
    document.getElementById(
      "username"
    ).innerHTML = `<h2>Hello, Welcome ${this.getCookie("username")} !</div>`;
  } else {
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

function getPosts() {
  document.getElementById("details").innerHTML = "";
  const url = `http://localhost:3000/api/posts`;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((response) => {
      loopThroughResponse(response);
    });
}
function loopThroughResponse(response) {
  for (i = 0; i < response.length; i++) {
    var username = response[i].username;
    var posts = response[i].post;
    var date = response[i].date;
    displayPost(username, posts, date);
  }
}

function displayPost(username, post, date) {
  var postRef = document.getElementById("details");
  postRef.innerHTML += `<div class="card">
                            <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${post}.</p>
                                <p class="card-text"><small class="text-muted float-right">Created at - ${date}</small></p>
                                <p class="card-text"><small class="text-muted float-left">Created by - ${username}</small></p>
                            </blockquote>
                            </div>
                        </div>`;
}

function submitPost() {
  var postData = document.getElementById("postTextarea").value;
  const url = `http://localhost:3000/api/newPost`;
  var username = getCookie("username");
  const data = {
    username: username,
    postData: postData,
  };
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  };
  if (postData.trim().length < 1) {
    alert("Please Enter Text...");
  } else {
    fetch(url, params).then((data) => {
      document.getElementById("postTextarea").value = "";
      getPosts();
    });
  }
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
