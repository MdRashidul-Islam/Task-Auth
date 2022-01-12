import { useState, useEffect } from "react";
import initAuth from "../pages/Firebase/firebase.Init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";

const googleProvider = new GoogleAuthProvider();
initAuth();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const auth = getAuth();

  //Register New User
  const registerUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Good",
          text: "Register successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setError("");
        //add name in register field
        const newUser = { email, displayName: name };
        setUser(newUser);

        //update profile start
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Oops..",
              text: `${errorMessage}`,
              showConfirmButton: false,
              timer: 2000,
            });
          });
        //update profile end
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${errorMessage}`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  //Email password login
  const emailLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "",
          text: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${errorMessage}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setError(errorMessage);
      });
  };

  //google sing in
  const googleSignIn = (location, history) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "",
          text: "Login successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${errorMessage}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setError(errorMessage);
      });
  };

  //On Auth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => unsubscribe;
  }, []);

  // //LogOut
  const LogOut = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "",
          text: "LogOut successfully",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {});
  };

  return {
    googleSignIn,
    user,
    registerUser,
    emailLogin,
    LogOut,
  };
};
export default useFirebase;
