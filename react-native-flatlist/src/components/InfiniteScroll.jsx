import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const fetchMoreData = (page) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newData = Array.from({ length: 10 }, (_, i) => ({
                id: `${Date.now()}-${Math.random()}`,
                title: `Item ${page * 10 + i + 1}`,
            }));
            resolve(newData);
        }, 1500);
    });
};

const InfiniteScroll = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchMoreData(page).then(newData => {
            setData(prevData => {
                const uniqueData = [...new Set([...prevData, ...newData])]; // 중복 제거
                return uniqueData;
            });
            setLoading(false);
        });
    }, [page]); // page가 변경될 때마다 실행

    const loadMore = () => {
        if (loading) return;
        setPage(prevPage => prevPage + 1); // 페이지 번호 업데이트
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.title}</Text>
        </View>
    );

    return (
        <FlatList
            style={{ flex: 1 }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id || index.toString()} // 중복 키 방지
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default InfiniteScroll;
