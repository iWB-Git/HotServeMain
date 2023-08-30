// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, OAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, onValue, update, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVa1EnV8Y5Q-04a4NmRRZj3QsZDo-HxRg",
    authDomain: "hotserve-ca8ff.firebaseapp.com",
    databaseURL: "https://hotserve-ca8ff-default-rtdb.firebaseio.com",
    projectId: "hotserve-ca8ff",
    storageBucket: "hotserve-ca8ff.appspot.com",
    messagingSenderId: "319724132147",
    appId: "1:319724132147:web:4d1b3fc8fd10e448451046"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const gProvider = new GoogleAuthProvider();

const provider = new OAuthProvider('microsoft.com');
provider.setCustomParameters({
    tenant: '14bf68a9-2dcd-47f9-8655-e4b31e463772'
});

function signInMicrosoft() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = OAuthProvider.credentialFromResult(result);
            // const accessToken = credential.accessToken;
            // const idToken = credential.idToken;
            return result;
        })
        .catch((error) => {
            console.log(error);
        });
}

function signOutMicrosoft() {
    signOut(auth).then(() => {
        return "Signed out";
    }).catch((error) => {
        console.log(error);
    });
}

function getCurrentUser() {
    return auth.currentUser;
}

function getAllData() {
    const dataRef = ref(db, 'Status/PiTest');
    let data;
    const myData = [];
    onValue(dataRef, (snapshot) => {
        data = snapshot.val();
        const values = Object.values(data);
        const keys = Object.keys(data);
        const entries = Object.entries(data);

        for (let i = 0; i < entries.length; i++) {
            let temp = {
                date: keys[i],
                temp: values[i],
            };
            myData.push(temp);
        }
    });
    return myData;
}

function getTempOnDate(date) {
    const starCountRef = ref(db, `Status/PiTest/${date}`);
    onValue(starCountRef, (snapshot) => {
        const temp = snapshot.val();
        return temp;
    });
}

function getUserSettings(user) {
    const userRef = ref(db, `Status/settings/${user}`);
    onValue(userRef, (snapshot) => {
        const temp = snapshot.val();
        return temp;
    });
}

function writeUserSettings(user) {
    const userRef = ref(db, `Settings/${user.uid}`);
    set(userRef, user);
}

function getCurrentTemp() {
    const starCountRef = ref(db, `Temp`);
    let data;
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    return data;
}

function getThreshold() {
    const starCountRef = ref(db, `Settings/Threshold`);
    return new Promise((resolve, reject) => {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // console.log("trs", data);
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
}
function setThreshold(thold) {
    update(ref(db, `Settings`), {
        'Threshold': thold
    });
}

//define literally every firebase function here, then type export then include every firebase function you need to export
export {
    signInMicrosoft,
    signOutMicrosoft,
    getCurrentUser,
    getAllData,
    getTempOnDate,
    getCurrentTemp,
    provider,
    auth,
    db,
    getThreshold,
    setThreshold,
    getUserSettings,
    writeUserSettings
};