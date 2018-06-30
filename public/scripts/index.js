const socket = io();

socket.on("connect", function () {
  console.log("connected to server");

});

socket.on("newMessage", function (message) {
  let li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
  });

socket.on("disconnect", function () {
  console.log("disconnected from server");
});

$("#message-form").on("submit", function (e) {
  e.preventDefault();
  socket.emit("createMessage", {
    from: "User",
    text: $("[name=message]").val()
  }, function (data) {
    console.log(data);
  });

});

let locationButton = $("#send-location");
let place = $("#place");
locationButton.on("click", function() {
  if(!navigator.geolocation) {
      return alert("Geolocation not supported for your browser");
  }
  navigator.geolocation.getCurrentPosition(function(position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      //fetch address and put it below message form
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}`)
      .then((res) => {
        return res.json();  })
        .then(data => {
          place.text(data.results[0].formatted_address.toString());
          console.log(data.results[0].formatted_address);
        });

  }, function(e) {
    alert("Unable to fetch position ", e);
  });
});
