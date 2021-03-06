document.querySelector("#login").addEventListener("click", function() {
  navigator.id.request();
}, false);

navigator.id.watch({
  onlogin: function(assertion) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/persona/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("loadend", function(e) {
      var data = JSON.parse(this.responseText);
      if (data && data.status === "okay") {
        console.log("You have been logged in as: " + data.email);
      location.reload();
      }
    }, false);

    xhr.send(JSON.stringify({
      assertion: assertion
    }));
  },
  onlogout: function() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/persona/logout", true);
    xhr.addEventListener("loadend", function(e) {
      console.log("You have been logged out");
    });
    xhr.send();
  }
});
