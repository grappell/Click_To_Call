chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome Extension Installed');
});

// var notifOptions = {
//   type: 'basic',
//   iconUrl: 'icon48.png',
//   title: 'Example!',
//   message: 'Example Message!'
// };
// chrome.notifications.create(
//   'limitNotif' + new Date().getTime(), // Id must be unique for every notification
//   notifOptions
// );

var firebaseConfig = {
  apiKey: "AIzaSyBvhFHgrJc2KjbDO7gNnP4turAPIfUQPnE",
  authDomain: "click-to-call-extention.firebaseapp.com",
  projectId: "click-to-call-extention",
  storageBucket: "click-to-call-extention.appspot.com",
  messagingSenderId: "599597140713",
  appId: "1:599597140713:web:f022e6e8ecb852c4a73e78",
  measurementId: "G-NXWM6LB2ME"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.collection("Instnce").doc("User_Auth").get().then((doc) => {
  console.log(doc.data());
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.msg === "User_Requested") {
        db.collection("Instance").add({text:""}).then((doc) => {
          chrome.runtime.sendMessage({
            msg: "key", 
            id: doc.id
          });
        })
      }

      if (request.msg === "input_confirmed") {
        db.collection("Instance").doc(request.id).set({text: request.number}).then((doc) => {console.log("sent")})
      }
  }
);