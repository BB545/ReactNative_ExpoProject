import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const StyedText = styled.Text`
    font-size: 30px;
    margin-bottom: 10px;  
`;

const Item = ({ navigation, route }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerLeft: ({ onPress, tintColor }) => {
                return (
                    <MaterialCommunityIcons
                        name="keyboard-backspace"
                        size={30}
                        style={{ marginLeft: 11 }}
                        color={tintColor}
                        onPress={onPress}
                    />
                );
            },
            headerRight: ({ tintColor }) => (
                <MaterialCommunityIcons
                    name="home-variant"
                    size={30}
                    style={{ marginRight: 11 }}
                    color={tintColor}
                    onPress={() => navigation.popToTop()}
                />
            ),
        })
    }, []);
    
    return (
        <Container>
            <StyedText>Item</StyedText>
            <StyedText>Id: {route.params.id}</StyedText>
            <StyedText>Name: {route.params.name}</StyedText>
        </Container>
    )
}

export default Item