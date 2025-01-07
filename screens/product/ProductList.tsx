import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ProductList = ({ navigation }) => {
    const produtosExemplo = [
        { id: '1', nome: 'Produto 1', descricao: 'Descrição 1', codigo: '001', marca: 'Marca A' },
        { id: '2', nome: 'Produto 2', descricao: 'Descrição 2', codigo: '002', marca: 'Marca B' },
        { id: '3', nome: 'Produto 3', descricao: 'Descrição 3', codigo: '003', marca: 'Marca C' },
    ];

    const handleEdit = (id) => {
        navigation.navigate('ProductForm', { id });
    };

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.nome}</Text>
            <Text className="text-sm text-gray-500">Descrição: {item.descricao}</Text>
            <Text className="text-sm text-gray-500">Código: {item.codigo}</Text>
            <Text className="text-sm text-gray-500">Marca: {item.marca}</Text>
            <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                className="absolute top-2 right-2 p-2 bg-green-500 rounded-full"
            >
                <FontAwesome name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                className="absolute bottom-2 right-2 p-2 bg-red-500 rounded-full"
            >
                <MaterialIcons name="delete" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="p-4">
            <Text className="text-lg font-bold mb-4">Lista de Produtos</Text>
            <FlatList
                data={produtosExemplo}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Nenhum produto cadastrado.</Text>
                }
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('ProductForm')}
                className="bg-blue-500 p-3 rounded-lg mt-4"
            >
                <Text className="text-white text-center">Adicionar Novo Produto</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductList;
