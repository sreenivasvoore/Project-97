var firebaseConfig = {
      apiKey: "AIzaSyB_ZA1zMJpBKyMdNv9RTiZRw4LsrClDerM",
      authDomain: "kwitter-f6764.firebaseapp.com",
      databaseURL: "https://kwitter-f6764-default-rtdb.firebaseio.com",
      projectId: "kwitter-f6764",
      storageBucket: "kwitter-f6764.appspot.com",
      messagingSenderId: "790120255500",
      appId: "1:790120255500:web:ed0f7a3d763e3716459e29"
};
    
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome, " + user_name + "!";

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("kwitter_output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id="+ Room_names +" onclick='redirectToRoom(this.id)'>#" + Room_names + "</div> <hr>";
       document.getElementById("kwitter_output").innerHTML += row;         
      });
   });
}
 getData();

function redirectToRoom(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function Logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "kwitter.html";
}