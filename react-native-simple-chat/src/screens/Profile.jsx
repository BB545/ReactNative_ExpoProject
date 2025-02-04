import React, { useContext, useEffect, useState } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { ProgressContext, UserContext } from '../contexts';
import { getCurrentUser, logout, updateUserPhoto } from '../utils/firebase';
import { Button, Image, Input } from '../components';
import { ActivityIndicator, Alert } from 'react-native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    justify-content: center;
    align-items: center;
    padding: 0 20px;
`;

const Profile = () => {
    const { dispatch } = useContext(UserContext);
    const { spinner } = useContext(ProgressContext);
    const theme = useContext(ThemeContext);

    const [photoUrl, setPhotoUrl] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Firestore에서 유저 정보 가져오기
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
                setPhotoUrl(userData.photoUrl);
            } catch (e) {
                console.error("Error fetching user data:", e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (e) {
            console.log('[Profile] logout: ', e.message);
        } finally {
            dispatch({});
            spinner.stop();
        }
    };

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const updatedUser = await updateUserPhoto(url);
            setPhotoUrl(updatedUser.photoUrl);
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    if (loading) {
        return (
            <Container>
                <ActivityIndicator size="large" color={theme.primary} />
            </Container>
        );
    }

    return (
        <Container>
            <Image
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton
                rounded
            />
            <Input label="Name" value={user?.name} disabled />
            <Input label="Email" value={user?.email} disabled />
            <Button
                title='logout'
                onPress={_handleLogoutButtonPress}
                containerStyle={{ marginTop: 30, backgroundColor: theme.buttonLogout }}
            />
        </Container>
    )
}

export default Profile