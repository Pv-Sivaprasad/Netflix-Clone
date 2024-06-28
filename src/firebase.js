
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyArcJR_cjBmIMw5-UFmnRKqoYxyE6CstCM",
    authDomain: "netflix-clone-d5142.firebaseapp.com",
    projectId: "netflix-clone-d5142",
    storageBucket: "netflix-clone-d5142.appspot.com",
    messagingSenderId: "388248288636",
    appId: "1:388248288636:web:35c2861c126aa853a538f9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: 'local',
            email
        })
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login = async (email,password) => {
    try {
          await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}