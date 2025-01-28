import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Mail, Meet, Settings } from '../screens/TabScreen';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="Settings"
            screenOptions={({ route }) => ({
                tabBarIcon: props => {
                    let name = '';
                    if (route.name === 'Mail') name = 'email';
                    else if (route.name === 'Meet') name = 'video';
                    else name = 'cog';
                    return TabIcon({ ...props, name });
                },
                tabBarLabelPosition: 'beside-icon',
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#54b7f9',
                    borderTopColor: '#fff',
                    borderTopWidth: 2,
                },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#cfcfcf',
            })}
        >
            <Tab.Screen
                name="Mail"
                component={Mail}
                options={{
                    tabBarLabel: 'Inbox',
                    tabBarIcon: props => TabIcon({
                        ...props,
                        name: props.focused ? 'email' : 'email-outline',
                    }),
                }}
            />
            <Tab.Screen
                name="Meet"
                component={Meet}
                options={{
                    tabBarIcon: props => TabIcon({
                        ...props,
                        name: props.focused ? 'video' : 'video-outline',
                    }),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: props => TabIcon({
                        ...props,
                        name: props.focused ? 'cog' : 'cog-outline',
                    }),
                }}
            />
        </Tab.Navigator >
    )
}

export default TabNavigation;