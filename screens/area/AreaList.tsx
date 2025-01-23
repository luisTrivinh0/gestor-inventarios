import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const AreaList = ({ navigation }) => {
    const [areas, setAreas] = useState([]);
    const [filteredAreas, setFilteredAreas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Função para buscar as áreas da API
    const fetchAreas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/areas');
            const data = await response.json();
            setAreas(data);
            setFilteredAreas(data); // Inicia com todas as áreas
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as áreas.');
        }
    };

    // UseEffect para carregar as áreas ao montar o componente
    useFocusEffect(
        React.useCallback(() => {
            fetchAreas();
        }, [])
    );


    // Função para deletar uma área
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/areas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Área excluída com sucesso!');
                fetchAreas(); // Recarrega as áreas após a exclusão
            } else {
                Alert.alert('Erro', 'Erro ao excluir a área.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a área.');
        }
    };

    // Função para aplicar os filtros por data
    const handleFilter = () => {
        let filtered = areas;

        if (startDate) {
            filtered = filtered.filter(
                (area) => new Date(area.created_at) >= startDate
            );
        }

        if (endDate) {
            filtered = filtered.filter(
                (area) => new Date(area.created_at) <= endDate
            );
        }

        setFilteredAreas(filtered);
    };

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartDatePicker(false);
        if (selectedDate) setStartDate(selectedDate);
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

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 pb-12 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.id} - {item.name}</Text>
            <Text className="text-sm text-gray-500">Entrada: {item.entry_point}</Text>
            <Text className="text-sm text-gray-500">Saída: {item.exit_point}</Text>
            <Text className="text-sm text-gray-500">
                Cadastrado em: {new Date(item.created_at).toLocaleDateString('pt-BR')}
            </Text>
            <TouchableOpacity
                onPress={() => navigation.navigate('AreaForm', { areaId: item.id })}
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
                data={filteredAreas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Nenhuma área encontrada.</Text>
                }
            />

            <TouchableOpacity
                onPress={() => navigation.navigate('AreaForm')}
                className="bg-blue-500 p-4 rounded-full mt-4 flex-row justify-center items-center"
            >
                <MaterialIcons name="person-add" size={20} color="#fff" />
                <Text className="text-white text-lg ml-2">Adicionar Área</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AreaList;
