import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import InfiniteScroll from './components/InfiniteScroll';
import FlatListScroll from './components/FlaListScroll';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #fff;
`;

const App = () => {
    return (
        <Container>
            <StatusBar
                barStyle="light-content"
            />
            <InfiniteScroll />
        </Container>
    )
}

export default App