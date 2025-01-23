import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AreaForm = ({ route, navigation }) => {
    const { areaId } = route.params || {}; // ID da área para edição
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Função para buscar os dados da área (edição)
    const fetchArea = async () => {
        if (!areaId) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/areas/${areaId}`);
            if (response.ok) {
                const area = await response.json();
                // Preenche os valores no formulário
                setValue('name', area.name);
                setValue('entry_point', area.entry_point);
                setValue('exit_point', area.exit_point);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados da área.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao se conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Chama fetchArea quando o componente é montado
    useEffect(() => {
        fetchArea();
    }, [areaId]);

    // Função para salvar ou atualizar a área
    const onSubmit = async (data) => {
        try {
            const url = areaId
                ? `http://localhost:8000/api/areas/${areaId}`
                : 'http://localhost:8000/api/areas';
            const method = areaId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const message = areaId
                    ? `Área atualizada: ${result.name}`
                    : `Área cadastrada: ${result.name}`;
                Alert.alert('Sucesso', message);
                reset();
                navigation.goBack(); // Volta para a lista de áreas
            } else {
                const error = await response.json();
                Alert.alert('Erro', error.message || 'Erro ao salvar os dados.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível se conectar ao servidor.');
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3B82F6" />
            </View>
        );
    }

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
                {areaId ? 'Editar Área' : 'Cadastrar Área'}
            </Text>

            {/* Nome da Área */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Nome</Text>
                <Controller
                    control={control}
                    name="name" // Nome corresponde ao banco de dados
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Nome da Área"
                            value={value}
                            onChangeText={onChange}
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                padding: 12,
                                borderRadius: 8,
                            }}
                        />
                    )}
                />
                {errors.name && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.name.message}</Text>}
            </View>

            {/* Entrada */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Entrada</Text>
                <Controller
                    control={control}
                    name="entry_point" // Nome corresponde ao banco de dados
                    rules={{ required: "Ponto de entrada é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Digite a Entrada (Ex: Porta A)"
                            value={value}
                            onChangeText={onChange}
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                padding: 12,
                                borderRadius: 8,
                            }}
                        />
                    )}
                />
                {errors.entry_point && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.entry_point.message}</Text>}
            </View>

            {/* Saída */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Saída</Text>
                <Controller
                    control={control}
                    name="exit_point" // Nome corresponde ao banco de dados
                    rules={{ required: "Ponto de saída é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Digite a Saída (Ex: Porta B)"
                            value={value}
                            onChangeText={onChange}
                            style={{
                                borderWidth: 1,
                                borderColor: '#D1D5DB',
                                padding: 12,
                                borderRadius: 8,
                            }}
                        />
                    )}
                />
                {errors.exit_point && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.exit_point.message}</Text>}
            </View>

            {/* Botão de Submissão */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                    backgroundColor: '#3B82F6',
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
            >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                    {areaId ? 'Atualizar Área' : 'Cadastrar Área'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AreaForm;
