import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
//   MicrosoftAuthProvider,
  OAuthProvider,
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const MicrosoftAuthProvider = new OAuthProvider('microsoft.com');
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "<API_KEY>",
//   authDomain: "<AUTH_DOMAIN>",
//   projectId: "<PROJECT_ID>",
//   storageBucket: "<STORAGE_BUCKET>",
//   messagingSenderId: "<MESSAGING_SENDER_ID>",
//   appId: "<APP_ID>"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDxO5jd7FyeL69yXEV7_eM9zXzszMzslwk",
    authDomain: "deepnight-sensai.firebaseapp.com",
    projectId: "deepnight-sensai",
    storageBucket: "deepnight-sensai.appspot.com",
    messagingSenderId: "298799982232",
    appId: "1:298799982232:web:6ff13b8622cd62ee97d2ed"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth(app);

// Signup form
// const signupForm = document.getElementById("signup-form");
// signupForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const email = signupForm.email.value;
//   const password = signupForm.password.value;
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Clear the form
//       signupForm.reset();
//       console.log("Signup successful:", userCredential.user);
//     })
//     .catch((error) => {
//       console.error("Signup error:", error);
//     });
// });

// Login form
// const loginForm = document.getElementById("login-form");
// loginForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const email = loginForm.email.value;
//   const password = loginForm.password.value;
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       // Clear the form
//       loginForm.reset();
//       console.log("Login successful:", userCredential.user);
//     })
//     .catch((error) => {
//       console.error("Login error:", error);
//     });
// });

// Google login
const googleLogin = document.getElementById("google-connect");
googleLogin.addEventListener("click", () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Google login successful:", result.user);
      user_info.icon = result.user.photoURL;
      document.getElementById("user-profile-pic").src = user_info.icon;
      user_info.name = result.user.displayName;
      // genUser(result.user.email, result.user.photoURL);
      getUserID(result.user.email);
      user_stat = true;
      // setCookie("user", result.user.email, 3);
      document.getElementById("connect-container").style.display = "none";
    })
    .catch((error) => {
      console.error("Google login error:", error);
    });
});

// Microsoft login
const microsoftLogin = document.getElementById("microsoft-connect");
microsoftLogin.addEventListener("click", () => {
  const provider = MicrosoftAuthProvider;
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Microsoft login successful:", result.user);
    })
    .catch((error) => {
      console.error("Microsoft login error:", error);
    });
});

// GitHub login
// const githubLogin = document.getElementById("github-login");
// githubLogin.addEventListener("click", () => {
//   const provider = new GithubAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log("GitHub login successful:", result.user);
//     })
//     .catch((error) => {
//       console.error("GitHub login error:", error);
//     });
// });