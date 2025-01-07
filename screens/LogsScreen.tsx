import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const LogsScreen = () => {
  const logsExample = [
    { id: '1', personId: '101', date: '2024-12-19', areaId: '201' },
    { id: '2', personId: '102', date: '2024-12-18', areaId: '202' },
    { id: '3', personId: '101', date: '2024-12-17', areaId: '203' },
    { id: '4', personId: '103', date: '2024-12-16', areaId: '204' },
  ];

  const [filteredLogs, setFilteredLogs] = useState(logsExample);
  const [personId, setPersonId] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleFilter = () => {
    let filtered = logsExample;

    if (personId) {
      filtered = filtered.filter(log => log.personId === personId);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= startDate && logDate <= endDate;
      });
    }

    setFilteredLogs(filtered);
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

  const renderItem = ({ item }) => (
    <View className="border border-gray-300 p-4 mb-2 rounded-lg">
      <Text className="text-lg font-bold">Log ID: {item.id}</Text>
      <Text className="text-sm text-gray-500">Pessoa ID: {item.personId}</Text>
      <Text className="text-sm text-gray-500">Data: {item.date}</Text>
      <Text className="text-sm text-gray-500">Área ID: {item.areaId}</Text>
    </View>
  );

  return (
    <View className="p-4">
      <Text className="text-lg font-bold mb-4">Lista de Logs</Text>

      <TextInput
        placeholder="Filtrar por ID da Pessoa"
        value={personId}
        onChangeText={setPersonId}
        className="border border-gray-300 p-2 mb-4 rounded-md"
      />

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
        data={filteredLogs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text className="text-center text-gray-500">Nenhum log encontrado.</Text>
        }
      />
    </View>
  );
};

export default LogsScreen;
