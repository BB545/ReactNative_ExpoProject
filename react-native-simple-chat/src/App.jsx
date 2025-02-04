import React, { useEffect, useState } from 'react';
import { StatusBar, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import { images } from './utils/images';
import { ProgressProvider, UserProvider } from './contexts';

// SplashScreen을 비활성화하지 않으면 앱이 계속 로딩 화면에 멈춤
SplashScreen.preventAutoHideAsync();

const cacheImages = images => {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

const App = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const imageAssets = cacheImages([
                    require('../assets/splash.png'),
                    ...Object.values(images),
                ]);
                const fontAssets = cacheFonts([]);

                await Promise.all([...imageAssets, ...fontAssets]);
            } catch (error) {
                console.warn(error);
            } finally {
                setIsReady(true);
                await SplashScreen.hideAsync(); // 로딩 완료 후 SplashScreen 숨기기
            }
        };

        loadAssets();
    }, []);

    if (!isReady) {
        return null; // 로딩 중일 때 아무것도 렌더링하지 않음
    }

    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                <ProgressProvider>
                    <StatusBar barStyle="light-content" />
                    <Navigation />
                </ProgressProvider>
            </UserProvider>
        </ThemeProvider>
    );
};

export default App