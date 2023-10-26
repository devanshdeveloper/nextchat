const defaultPhotoURL =
  "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
import { initializeApp } from "firebase/app";
import { getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import {
  get,
  getDatabase,
  onValue,
  push,
  ref,
  runTransaction,
  set,
} from "firebase/database";
import { getFormattedDate } from "../utilities";
const app = initializeApp({
  apiKey: "AIzaSyC5yhbGuHEUQUkqGhqy8QDtQfhiC4wCRrg",
  authDomain: "noter-fcd0d.firebaseapp.com",
  databaseURL: "https://noter-fcd0d-default-rtdb.firebaseio.com",
  projectId: "noter-fcd0d",
  storageBucket: "noter-fcd0d.appspot.com",
  messagingSenderId: "848405810237",
  appId: "1:848405810237:web:ee1fd1fbbdfeaa3cd22e54",
  measurementId: "G-EN1M9GKZ43",
});
const auth = getAuth();
const db = getDatabase();
const storage = getStorage(app);

export function onAuth(func) {
  onAuthStateChanged(auth, (user) => {
    let data = null;
    if (user) {
      const nameInArray = user.displayName?.split(" ");
      data = {
        ...user.providerData[0],
        ...user.metadata,
        photoURL: user.photoURL || defaultPhotoURL,
        firstName: nameInArray?.[0] || null,
        lastName: nameInArray?.[1] || null,
        joinedOn: getFormattedDate(user.metadata.creationTime),
      };
      runTransaction(ref(db, "users/" + getUserId()), (currentData) => {
        return currentData ? currentData : data;
      }).then(() => func(data));
    } else func(data);
  });
}
export function createUser(email, pass, displayName) {
  return new Promise((resolve, reject) => {
    if (!displayName) reject({ code: "auth/invalid-name" });
    createUserWithEmailAndPassword(auth, email, pass)
      .then(() =>
        updateProfile(auth, { displayName }).then(resolve).catch(reject)
      )
      .catch(reject);
  });
}

export function updateUser(displayName, email) {
  return new Promise((resolve, reject) => {
    if (!displayName) reject({ code: "auth/invalid-name" });
    if (!email) reject({ code: "auth/invalid-email" });
    updateProfile(getUser(), { displayName })
      .then(() => updateEmail(getUser(), email).then(resolve).catch(reject))
      .then(resolve)
      .catch(reject);
  });
}

export function signUserIn() {
  return signInWithRedirect(auth, new GoogleAuthProvider());
}
export function signUserOut() {
  return signOut(auth);
}
export function LogUserIn(email, pass) {
  return signInWithEmailAndPassword(auth, email, pass);
}
export function getUser() {
  return auth.currentUser;
}
export function getUserId() {
  return getUser()?.uid;
}

import { v4 as uuidv4 } from "uuid";

export async function createRoom(name) {
  const roomId = uuidv4(); // Generate a unique room ID
  const roomRef = ref(db, `rooms/${roomId}`);
  await set(roomRef, { name, id: roomId });
  await joinRoom(roomId);
  return roomId;
}

export async function joinRoom(roomId) {
  const userRoomsRef = ref(db, `users/${getUserId()}/rooms`);

  try {
    await runTransaction(userRoomsRef, (userRooms) => {
      if (!userRooms) {
        userRooms = [roomId];
      } else if (!userRooms.includes(roomId)) {
        userRooms.push(roomId);
      }
      return userRooms;
    });
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
}

export function onRoom(roomId, then) {
  return onValue(ref(db, `rooms/${roomId}`), then);
}

export async function getRoomNamesForUser() {
  const rooms = await getRooms(getUserId());
  const roomNames = [];

  for (const room of rooms) {
    const roomId = room;
    try {
      const roomRef = ref(db, `rooms/${roomId}`);
      const roomSnapshot = await get(roomRef);

      if (roomSnapshot.exists()) {
        const roomData = roomSnapshot.val();
        roomNames.push({ id: roomId, name: roomData.name });
      } else {
        roomNames.push({ id: roomId, name: "Room Not Found" });
      }
    } catch (error) {
      console.error(`Error getting room with ID ${roomId}:`, error);
      roomNames.push({ id: roomId, name: "Error" });
    }
  }

  return roomNames;
}

export async function exitRoom(roomId) {
  const userRoomsRef = ref(db, `users/${getUserId()}/rooms`);

  console.log(userRoomsRef);
  try {
    await runTransaction(userRoomsRef, (userRooms) => {
      console.log(userRooms);
      if (userRooms) {
        const index = userRooms.findIndex((e) => e.id === roomId);
        if (index !== -1) {
          userRooms.splice(index, 1);
        }
        return userRooms;
      }
    });
  } catch (error) {
    console.error("Error exiting room:", error);
    throw error;
  }
}

async function getRooms(userId) {
  try {
    const roomsRef = ref(db, `users/${userId}/rooms`);
    const roomsSnapshot = await get(roomsRef);
    if (roomsSnapshot.exists()) {
      return Object.values(roomsSnapshot.val());
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
}

export function sendMessage(roomId, text) {
  const messageRef = push(ref(db, `rooms/${roomId}/messages`));
  return set(messageRef, {
    text,
    uid: getUserId(),
    photoURL: getUser().photoURL || defaultPhotoURL,
    displayName: getUser().displayName,
    timestamp: Date.now(),
  });
}

// export function addMessage(text) {
//   return set(push(ref(db, `messages`)), {
//     text,
//     uid: getUserId(),
//     photoURL: getUser().photoURL || defaultPhotoURL,
//     displayName: getUser().displayName,
//     timestamp: Date.now(),
//   });
// }

// export function onMessages(then) {
//   return onValue(ref(db, `messages`), then);
// }
// export function addTodo(data) {
//   return set(push(ref(db, `users/${getUserId()}/todos`)), data);
// }
// export function onTodos(then) {
//   return onValue(ref(db, `users/${getUserId()}/todos`), then);
// }
// export function deleteTodo(id) {
//   return remove(ref(db, `users/${getUserId()}/todos/${id}`));
// }
// export function toggleCompleted(id, completed) {
//   return update(ref(db, `users/${getUserId()}/todos/${id}`), { completed });
// }
// storage

// export function uploadFile(path, file) {
//   return new Promise((resolve, reject) => {
//     uploadBytes(storageRef(storage, path), file)
//       .then((s) => resolve(s.downloadURL))
//       .catch(reject);
//   });
// }

// export function uploadUserPhoto(file) {
//   return new Promise((resolve, reject) => {
//     if (!file) reject({ code: "storage/invalid-file" });
//     uploadFile(`users/${getUserId()}/profile`, file)
//       .then((url) =>
//         updateProfile(getUser(), { photoURL: url }).then(resolve).catch(reject)
//       )
//       .catch(reject);
//   });
// }
