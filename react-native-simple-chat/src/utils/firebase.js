import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import * as FileSystem from 'expo-file-system';
import config from '../../firebase.json';

const app = initializeApp(config);
export const db = getFirestore(app);
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
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
        console.error("No authenticated user found.");
        return null;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        return {
            uid: user.uid,
            name: user.displayName || "Unknown",
            email: user.email || "No Email",
            photoUrl: userData.photo || null,
        };
    } else {
        return {
            uid: user.uid,
            name: user.displayName || "Unknown",
            email: user.email || "No Email",
            photoUrl: null,
        };
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

export const createChannel = async ({ title, description }) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error("User is not authenticated.");
        }

        const channelsCollection = collection(db, "channels");
        const newChannelRef = doc(channelsCollection);
        const id = newChannelRef.id;

        const newChannel = {
            id,
            title,
            description,
            createdAt: Date.now(),
            createdBy: user.uid,
        };

        await setDoc(newChannelRef, newChannel);

        return id;
    } catch (error) {
        console.error("Error creating channel:", error);
        throw error;
    }
};

export const createMessage = async ({ channelId, message }) => {
    try {
        if (!channelId || !message || !message._id) {
            throw new Error("Missing required fields: channelId or message._id");
        }

        const messagesRef = collection(db, "channels", channelId, "messages");
        const messageDoc = doc(messagesRef, message._id);

        const newMessage = {
            ...message,
            createdAt: serverTimestamp(),
        };

        await setDoc(messageDoc, newMessage);

        return message._id;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};