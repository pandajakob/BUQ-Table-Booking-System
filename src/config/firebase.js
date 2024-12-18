import { initializeApp } from "firebase/app";
import { getAuth   } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCsVvg3laklHjk7cqtRkexlJvap2VFHf7A",
  authDomain: "buq123-4846b.firebaseapp.com",
  databaseURL: "https://buq123-4846b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "buq123-4846b",
  storageBucket: "buq123-4846b.firebasestorage.app",
  messagingSenderId: "456025155970",
  appId: "1:456025155970:web:2b309cebe9c5e956ce079b",
  measurementId: "G-3HQDGW1RB6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
 