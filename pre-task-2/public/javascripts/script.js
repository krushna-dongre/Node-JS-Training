function showUserDetails(){
    const url = `http://localhost:3000/api/userDetails`;
    const detailsRef = document.getElementById("details");

    fetch(url).then((data) => {
        data.json()
            .then(jsonData => {

                detailsRef.innerHTML = `<div class="card" style="width: 21rem;">
                <div class="card-body">
                  <h5 class="card-title">User Details</h5>
                  <div>
                      <p  class="card-text">  Name : ${jsonData.name} </p>
                      <p  class="card-text">  Email : ${jsonData.email} </p>
                      <p  class="card-text">  contact : ${jsonData.contact} </p>
                  </div>
                </div>
              </div>`;
            });
    });


}