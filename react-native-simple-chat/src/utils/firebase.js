import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';
import config from '../../firebase.json';

const app = initializeApp(config);
const db = getFirestore(app);
const Auth = getAuth(app);

// 이미지 URI를 Base64로 변환하는 함수
const convertImageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    return `data:image/png;base64,${base64}`; // Base64 데이터 URL 형식
};

export const login = async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(Auth, email, password);
    return userCredential.user;
};

export const logout = async () => {
    return await Auth.signOut();
};

export const signup = async ({ email, password, name, photoUrl }) => {
    const { user } = await createUserWithEmailAndPassword(Auth, email, password);
    let imageBase64 = '';

    if (photoUrl) {
        imageBase64 = await convertImageToBase64(photoUrl);
    }

    // Firestore의 "users" 컬렉션에 사용자 데이터 저장
    const usersCollection = collection(db, "users"); // "users" 컬렉션 가져오기
    const userRef = doc(usersCollection, user.uid);

    await setDoc(userRef, {
        uid: user.uid,
        email: email,
        name: name,
        photo: imageBase64, // Firestore에 Base64 이미지 저장
    });

    // Firebase Auth의 사용자 프로필 업데이트
    await updateProfile(user, {
        displayName: name,
        photoURL: '', // Storage를 사용하지 않으므로 빈 값
    });

    return user;
};

export const getCurrentUser = async () => {
    const { uid, displayName, email } = Auth.currentUser;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        return { uid, name: displayName, email, photoUrl: userData.photo };
    } else {
        return { uid, name: displayName, email, photoUrl: null };
    }
};

export const updateUserPhoto = async (photoUri) => {
    const user = Auth.currentUser;
    if (!user) throw new Error("No authenticated user");

    // 이미지 URI를 Base64로 변환
    const imageBase64 = await convertImageToBase64(photoUri);

    // Firestore의 "users" 컬렉션에서 현재 사용자 문서 업데이트
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { photo: imageBase64 }, { merge: true });

    return {name: user.displayName, email: user.email, photoUrl: imageBase64};
};