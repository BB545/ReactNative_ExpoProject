import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import List from '../screens/List';
import Item from '../screens/Item';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerTitleAlign: 'center', // 제목 가운데 정렬
                cardStyle: { backgroundColor: '#ffffff' }, // 화면 전체 차지
                headerStyle: {
                    height: 110,
                    backgroundColor: '#95a5a6',
                    borderBottomWidth: 5,
                    borderBottomColor: '#34495e',
                },
                headerTitleStyle: { color: '#fff', fontSize: 24, },
                headerTitle: ({ style }) => (
                    <MaterialCommunityIcons name="react" style={style} />
                ),
            }}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="List"
                component={List}
                options={{
                    headerTitle: 'List Screen',
                    headerBackTitleVisible: true,
                    headerBackTitle: 'Prev',
                    headerTitleStyle: { fontSize: 24 },
                    headerTintColor: '#e74c3c',
                    headerBacklmage: ({ tintColor }) => {
                        const style = {
                            marginRight: 5,
                            marginLeft: Platform.OS === 'ios' ? 11 : 8,
                        };
                        return (
                            <MaterialCommunityIcons
                                name="keyboard-backspace"
                                size={30}
                                color={tintColor}
                                style={style}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen name="Detail" component={Item} />
        </Stack.Navigator >
    )
}

export default StackNavigation;