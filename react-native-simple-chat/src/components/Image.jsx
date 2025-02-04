import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Container = styled.View`
    align-self: center;
    margin-bottom: 30px;
`;

const StyledImage = styled.Image`
    background-color: ${({ theme }) => theme.imageBackground};
    width: 100px;
    height: 100px;
    border-radius: ${({ rounded }) => (rounded ? 50 : 8)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.imageButtonBackground};
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
    name: 'photo-camera',
    size: 22,
})`
    color: ${({ theme }) => theme.imageButtonIcon};
`;

const PhotoButton = ({ onPress }) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon />
        </ButtonContainer>
    )
}

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
    const requestPermissions = async () => {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (mediaStatus !== 'granted' || cameraStatus !== 'granted') {
            Alert.alert(
                'Permission Required',
                'Please allow access to your gallery and camera.'
            );
        }
    };
    
    useEffect(() => {
        requestPermissions();
    }, []);
    
    const _handleEditButton = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Photo Permission',
                    'Please turn on the camera roll permissions.'
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                onChangeImage(result.assets[0].uri);
            }
        } catch (e) {
            Alert.alert('Photo Error', e.message);
        }
    };

    return (
        <Container>
            <StyledImage source={{ uri: url }} style={imageStyle} rounded={rounded} />
            {showButton && <PhotoButton onPress={_handleEditButton} />}
        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
    showButton: false,
    onChangeImage: () => { },
};

Image.propTypes = {
    url: PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
    showButton: PropTypes.bool,
    onChangeImage: PropTypes.func,
};

export default Image