import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
    background-color: #fff;
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

const Home = ({ navigation }) => {
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
            />
            <StyedText>Home</StyedText>
            <CustomButton onPress={() => navigation.navigate('List')}>
                <ButtonText>Go to the List Screen</ButtonText>
            </CustomButton>
        </Container>
    )
}

export default Home