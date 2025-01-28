import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyedText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;  
`;

const CustomButton = styled.TouchableOpacity`
    background-color: transparent;
`;

const ButtonText = styled.Text`
    font-size: 16px;
    color: #007AFF;
    text-transform: none;
`;

const items = [
    { _id: 1, name: 'React Native' },
    { _id: 2, name: 'React Navigation' },
    { _id: 3, name: 'Hanbit' },
]

const List = ({ navigation }) => {
    const _onPress = item => {
        navigation.navigate('Detail', { id: item._id, name: item.name })
    };

    return (
        <Container>
            <StyedText>List</StyedText>
            {items.map(item => (
                <CustomButton
                    key={item._id}
                    onPress={() => _onPress(item)}
                >
                    <ButtonText>{item.name}</ButtonText>
                </CustomButton>
            ))}
        </Container>
    )
}

export default List