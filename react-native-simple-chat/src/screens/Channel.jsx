import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { db, createMessage, getCurrentUser } from '../utils/firebase';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator, Alert, Text } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
    const theme = useContext(ThemeContext);

    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <MaterialIcons
                name='send'
                size={24}
                color={props.text ? theme.sendButtonActive : theme.sendButtonInactive}
            />
        </Send>
    );
};

const Channel = ({ navigation, route: { params } }) => {
    const theme = useContext(ThemeContext);
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                } else {
                    console.error("No authenticated user found.");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (!params?.id) return;

        const messagesRef = collection(db, "channels", params.id, "messages");
        const q = query(messagesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    ...data,
                    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
                };
            });
            setMessages(list);
        });

        return () => {
            unsubscribe();
        };
    }, [params.id]);

    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: params.title || "Channel" });
    }, [navigation, params.title]);

    const _handleMessageSend = async (messageList) => {
        if (!user) {
            Alert.alert("Error", "User not authenticated.");
            return;
        }
    
        const newMessage = messageList[0];
    
        if (!newMessage || !newMessage.text) {
            Alert.alert("Error", "Message is empty.");
            return;
        }
    
        try {
            await createMessage({
                channelId: params.id,
                message: newMessage,
            });
        } catch (e) {
            Alert.alert("Send Message Error", e.message);
            console.error("Message send error:", e);
        }
    };

    if (loading) {
        return (
            <Container>
                <ActivityIndicator size="large" color={theme.primary} />
            </Container>
        );
    }

    if (!user) {
        return (
            <Container>
                <Text style={{ color: theme.text, fontSize: 18 }}>
                    No authenticated user found.
                </Text>
            </Container>
        );
    }

    return (
        <Container>
            <GiftedChat
                listViewProps={{
                    style: { backgroundColor: theme.background },
                }}
                placeholder='Enter a message...'
                messages={messages}
                user={{
                    _id: user?.uid || "unknown",
                    name: user?.name || "Unknown",
                    avatar: user?.photoUrl || "",
                }}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={props => <SendButton {...props} />}
            />
        </Container>
    );
};

export default Channel;
