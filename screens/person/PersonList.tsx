import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';

const PersonList = ({ navigation }) => {
    const [pessoas, setPessoas] = useState([]);
    const [pessoasFiltradas, setPessoasFiltradas] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    // Função para buscar as pessoas da API
    const fetchPessoas = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/persons/');
            const data = await response.json();
            setPessoas(data);
            setPessoasFiltradas(data); // Atualiza as pessoas filtradas com todas as pessoas inicialmente
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as pessoas.');
        }
    };

    // useFocusEffect para buscar as pessoas quando a tela entra em foco
    useFocusEffect(
        React.useCallback(() => {
            fetchPessoas();
        }, [])
    );

    const handleEdit = (id) => {
        navigation.navigate('PersonForm', { personId: id });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/persons/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Alert.alert('Sucesso', 'Pessoa excluída com sucesso!');
                fetchPessoas(); // Recarrega a lista após exclusão
            } else {
                const result = await response.json();
                Alert.alert('Erro', result.detail || 'Erro ao excluir pessoa');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir a pessoa.');
        }
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
        let filtered = pessoas;

        if (startDate) {
            filtered = filtered.filter(
                (person) => new Date(person.created_at) >= startDate
            );
        }

        if (endDate) {
            filtered = filtered.filter(
                (person) => new Date(person.created_at) <= endDate
            );
        }

        setPessoasFiltradas(filtered);
    };

    const renderItem = ({ item }) => (
        <View className="border border-gray-300 p-4 pb-8 mb-4 rounded-lg relative">
            <Text className="text-lg font-bold">{item.id} - {item.name}</Text>
            <Text className="text-sm text-gray-500">Documento: {item.document}</Text>
            <Text className="text-sm text-gray-500">
                Cadastrado em: {new Date(item.created_at).toLocaleDateString('pt-BR')}
            </Text>
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
                keyExtractor={(item) => item.id.toString()}
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
