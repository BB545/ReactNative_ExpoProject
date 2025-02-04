import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import moment from 'moment';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({ theme }) => theme.listBorder};
    padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
    flex: 1;
    flex-direction: column;
`;

const ItemTitle = styled.Text`
    font-size: 20px;
    font-weight: 600;
`;

const ItemDescription = styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color: ${({ theme }) => theme.listDescription};
`;

const ItemTime = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.listTime};
`;

const getDateOrTime = ts => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
}

const Item = React.memo(
    ({ item: { id, title, description, createdAt }, onPress }) => {
        const theme = useContext(ThemeContext);

        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
                <MaterialIcons
                    name='keyboard-arrow-right'
                    size={24}
                    color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);

const ChannelList = ({ navigation }) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const channelsRef = collection(db, "channels");
        const q = query(channelsRef, orderBy("createdAt", "desc"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const channelData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setChannels(channelData);
        });

        return () => unsubscribe();
    }, []);

    const _handleItemPress = params => {
        navigation.navigate('Channel', params);
    };

    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id']}
                data={channels}
                renderItem={({ item }) => (
                    <Item item={item} onPress={_handleItemPress} />
                )}
                windowSize={3}
            />
        </Container>
    )
}

export default ChannelList