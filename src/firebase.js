import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc,
    collection,
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAF9qUlxdYeT93yDF9VvrO4aJ-FlPiDWfU",
  authDomain: "netflix-clone-84ffa.firebaseapp.com",
  projectId: "netflix-clone-84ffa",
  storageBucket: "netflix-clone-84ffa.appspot.com",
  messagingSenderId: "307043324369",
  appId: "1:307043324369:web:3df297ef62ce17bdbe50f0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password)=>{
   try {
       await signInWithEmailAndPassword(auth, email, password);
   } catch (error) {
       console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};