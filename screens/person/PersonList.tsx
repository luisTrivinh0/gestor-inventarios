import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PersonList = ({ navigation }) => {
    const pessoasExemplo = [
        { id: '1', nome: 'João Silva', documento: '123.456.789-00', created_at: '12/12/2024' },
        { id: '2', nome: 'Maria Oliveira', documento: '987.654.321-00', created_at: '12/12/2024' },
        { id: '3', nome: 'Carlos Souza', documento: '456.789.123-00', created_at: '12/12/2024' },
    ];

    const [pessoasFiltradas, setPessoasFiltradas] = useState(pessoasExemplo);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleEdit = (id) => {
        navigation.navigate('PersonForm', { pessoaId: id });
    };

    const handleDelete = (id) => {
        console.log(`Excluir pessoa com ID: ${id}`);
    };

    const handleAdd = () => {
        navigation.navigate('PersonForm');
    };

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            if (startDate && selectedDate < startDate) {
                Alert.alert('Erro', 'A data final deve ser maior que a data inicial.');
            } else {
                setEndDate(selectedDate);
            }
        }
    };

    const handleFilter = () => {
        let filtered = pessoasExemplo;

        if (startDate) {
            filtered = filtered.filter(person => new Date(person.created_at) >= startDate);
        }

        if (endDate) {
            filtered = filtered.filter(person => new Date(person.created_at) <= endDate);
        }

        setPessoasFiltradas(filtered);
    };

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 pb-8 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.nome}</Text>
            <Text className="text-sm text-gray-500">Documento: {item.documento}</Text>
            <Text className="text-sm text-gray-500">Cadastrado em: {item.created_at}</Text>
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
        <View className="p-4 flex-1">
            <Text className="text-lg font-bold mb-4">Lista de Pessoas</Text>

            {/* Filtros por data */}
            <View className="flex-row justify-between mb-4">
                <TouchableOpacity
                    onPress={() => setShowStartDatePicker(true)}
                    className="border border-gray-300 p-2 rounded-md"
                >
                    <Text>{startDate ? startDate.toLocaleDateString() : 'Início'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowEndDatePicker(true)}
                    className="border border-gray-300 p-2 rounded-md"
                >
                    <Text>{endDate ? endDate.toLocaleDateString() : 'Fim'}</Text>
                </TouchableOpacity>
            </View>

            {showStartDatePicker && (
                <DateTimePicker
                    value={startDate || new Date()}
                    mode="date"
                    onChange={handleStartDateChange}
                />
            )}

            {showEndDatePicker && (
                <DateTimePicker
                    value={endDate || new Date()}
                    mode="date"
                    onChange={handleEndDateChange}
                />
            )}

            <TouchableOpacity
                onPress={handleFilter}
                className="bg-blue-500 p-3 rounded-lg mb-4"
            >
                <Text className="text-white text-center">Filtrar</Text>
            </TouchableOpacity>

            <FlatList
                data={pessoasFiltradas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Nenhuma pessoa encontrada.</Text>
                }
            />

            <TouchableOpacity
                onPress={handleAdd}
                className="bg-blue-500 p-4 rounded-full mt-4 flex-row justify-center items-center"
            >
                <MaterialIcons name="person-add" size={20} color="#fff" />
                <Text className="text-white text-lg ml-2">Adicionar Pessoa</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PersonList;
