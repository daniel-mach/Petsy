import { initializeApp } from "firebase/app";
import {
	getFirestore,
	setDoc,
	doc,
	collection,
	getDocs,
} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyDyt3k2BzoM2Oav67VHJh38Dbtp3T0Vn_4",
	authDomain: "petsy-83eb2.firebaseapp.com",
	projectId: "petsy-83eb2",
	storageBucket: "petsy-83eb2.appspot.com",
	messagingSenderId: "532767807611",
	appId: "1:532767807611:web:27e9f43aff9486ae14aade",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const registerUser = async (username, email, password, city) => {
	const response = await createUserWithEmailAndPassword(
		auth,
		email,
		password,
	);
	const user = response.user;

	await setDoc(doc(db, "users", user.uid), {
		username,
		authProvider: "local",
		email,
		city,
	});
};

const loginUser = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
	signOut(auth);
};

export const getBusinessList = async (callback) => {
	const businessSnapshot = await getDocs(collection(db, "business"));
	console.log(businessSnapshot);
	const businessList = businessSnapshot.docs.map((doc) => ({
		id: doc.id,
		name: doc.data().name,
		category: doc.data().category,
		city: doc.data().city,
		contact: doc.data().contact,
	}));
	callback(businessList);
};

export { db, auth, registerUser, loginUser, logoutUser };
