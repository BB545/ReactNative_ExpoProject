import React from 'react';
import { FlatList } from 'react-native';
import Item from './Item';

const DATA = [
    {
        id: '1',
        title: 'First Item',
    },
    {
        id: '2',
        title: 'Second Item',
    },
    {
        id: '3',
        title: 'Third Item',
    },
    {
        id: '4',
        title: 'Forth Item',
    },
    {
        id: '5',
        title: 'Fifth Item',
    },
    {
        id: '6',
        title: 'Sixth Item',
    },
    {
        id: '7',
        title: 'Seventh Item',
    },
    {
        id: '8',
        title: 'Eighth Item',
    },
    {
        id: '9',
        title: 'Ninth Item',
    },
    {
        id: '10',
        title: 'Tenth Item',
    },
];

const FlatListScroll = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    )
    return (
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    )
}

export default FlatListScroll