import HeaderMenu from 'components/HeaderMenu';
import React from 'react';
import { Text, View} from 'react-native';

const HomeScreen = () => {

    return (
        <View className="flex-1 bg-gray-200">
            <HeaderMenu />
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg font-bold text-gray-700">
                    Bem-vindo à Home!
                </Text>
            </View>
        </View>
    );
};

export default HomeScreen;
