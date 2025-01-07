import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const AreaList = ({ navigation }) => {
    const areasExemplo = [
        { id: '1', nome: 'Área 1', entrada: 'Porta A', saida: 'Porta B', created_at: '12/12/2024' },
        { id: '2', nome: 'Área 2', entrada: 'Porta B', saida: 'Porta A', created_at: '15/12/2024' },
        { id: '3', nome: 'Área 3', entrada: 'Porta A', saida: 'Porta A', created_at: '18/12/2024' },
    ];

    const [areasFiltradas, setAreasFiltradas] = useState(areasExemplo);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const handleEdit = (id) => {
        navigation.navigate('AreaForm', { areaId: id });
    };

    const handleDelete = (id) => {
        console.log(`Excluir área com ID: ${id}`);
    };

    const handleAdd = () => {
        navigation.navigate('AreaForm');
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
        let filtered = areasExemplo;

        if (startDate) {
            filtered = filtered.filter(area => new Date(area.created_at) >= startDate);
        }

        if (endDate) {
            filtered = filtered.filter(area => new Date(area.created_at) <= endDate);
        }

        setAreasFiltradas(filtered);
    };

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 pb-12 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.nome}</Text>
            <Text className="text-sm text-gray-500">Entrada: {item.entrada}</Text>
            <Text className="text-sm text-gray-500">Saída: {item.saida}</Text>
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
            <Text className="text-lg font-bold mb-4">Lista de Áreas</Text>

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
                data={areasFiltradas}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Nenhuma área encontrada.</Text>
                }
            />

            <TouchableOpacity
                onPress={handleAdd}
                className="bg-blue-500 p-4 rounded-full mt-4 flex-row justify-center items-center"
            >
                <MaterialIcons name="person-add" size={20} color="#fff" />
                <Text className="text-white text-lg ml-2">Adicionar Área</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AreaList;
