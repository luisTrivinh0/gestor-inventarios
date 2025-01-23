import HeaderMenu from 'components/HeaderMenu';
import React from 'react';
import { Text, View, Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View className="flex-1 bg-gray-200">
            <HeaderMenu />
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require('assets/logo.png')} // Caminho da logo
                    style={{ width: 150, height: 150, marginBottom: 16 }}
                    resizeMode="contain"
                />
                <Text className="text-lg font-bold text-gray-700">
                    Bem-vindo à Home!
                </Text>
            </View>
        </View>
    );
};

export default HomeScreen;
