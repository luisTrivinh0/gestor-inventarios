import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const handleLogin = () => {
        navigation.navigate('Home');
    };

    return (
        <View className="flex-1 justify-between bg-gray-100 p-4">
            <View>
                <TextInput
                    className="w-full p-3 mb-4 bg-white border border-gray-300 rounded"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    className="w-full p-3 mb-4 bg-white border border-gray-300 rounded"
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity className="w-full p-3 bg-blue-500 rounded" onPress={handleLogin}>
                    <Text className="text-white text-center font-bold">Login</Text>
                </TouchableOpacity>
                <Text className="mt-4 text-blue-500 underline">Esqueci minha senha</Text>
            </View>
            <Text className="mt-10 text-gray-500 text-center">powered by Vip Systems</Text>
        </View>
    );
};

export default LoginScreen;
