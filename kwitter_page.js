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

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

function Send() {
      mssg = document.getElementById("mssg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: mssg,
            like: 0
      });
      document.getElementById("mssg").value = "";
}

function getData() { 
      firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
            document.getElementById("output").innerHTML = ""; 
            snapshot.forEach(function(childSnapshot) { 
                  childKey  = childSnapshot.key; 
                  childData = childSnapshot.val(); 
            if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
         user = message_data['name'];
         msg = message_data['message'];
         like = message_data['like'];
         tag_with_name = "<h4>" + user + "<img class='user_tick' src='tick.png'></h4>";
         tag_with_message = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+ firebase_message_id +" value="+ like +" onclick='updateLike(this.id)'>";
         tag_with_span = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like +"</span> </button> <hr>";
         row = tag_with_name + tag_with_message + like_button + tag_with_span;
         document.getElementById("msg_output").innerHTML += row;
      } 
    });  
  }); 
}
getData();

function updateLike(message_id) {
      console.log("Clicked on Like Button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes)
      
      firebase.database().ref(room_name).child(message_id).update({
          like : updated_likes  
      });
}

function Logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "kwitter.html";
}