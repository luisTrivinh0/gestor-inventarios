import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ProductList = ({ navigation }) => {
    const [produtos, setProdutos] = useState([]);

    // Função para buscar os produtos da API
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/products/');
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os produtos.');
        }
    };

    // UseEffect para carregar os produtos quando o componente for montado
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigation.navigate('ProductForm', { id });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', result.message);
                fetchProducts(); // Recarrega a lista após a exclusão
            } else {
                Alert.alert('Erro', result.error || 'Erro ao excluir produto');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o produto.');
        }
    };

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-sm text-gray-500">Descrição: {item.description}</Text>
            <Text className="text-sm text-gray-500">Código: {item.code}</Text>
            <Text className="text-sm text-gray-500">Marca: {item.brand}</Text>
            <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                className="absolute top-2 right-2 p-2 bg-green-500 rounded-full"
            >
                <FontAwesome name="edit" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => handleDelete(item.id)}
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
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Nenhum produto encontrado.</Text>
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
