import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';

const PersonForm = ({ route, navigation }) => {
    const { personId } = route.params || {}; // ID da pessoa passada via rota
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Função para buscar os dados da pessoa
    const fetchPerson = async () => {
        if (!personId) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/persons/${personId}`);
            if (response.ok) {
                const person = await response.json();
                setValue('name', person.name);
                setValue('document', person.document);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados da pessoa.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao se conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Busca dados para edição
    useEffect(() => {
        fetchPerson();
    }, [personId]);

    // Função para salvar ou atualizar a pessoa
    const onSubmit = async (data) => {
        try {
            const url = personId
                ? `http://localhost:8000/api/persons/${personId}`
                : 'http://localhost:8000/api/persons';
            const method = personId ? 'PUT' : 'POST';

            // Remove a máscara do CPF antes de enviar para a API
            data.document = data.document.replace(/\D/g, '');

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const message = personId
                    ? `Pessoa atualizada: ${result.name}`
                    : `Pessoa cadastrada: ${result.name}`;
                Alert.alert('Sucesso', message);
                reset();
                navigation.goBack(); // Volta para a lista
            } else {
                const error = await response.json();
                Alert.alert('Erro', error.detail || 'Erro ao salvar os dados.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível se conectar ao servidor.');
        }
    };

    // Exibe indicador de carregamento enquanto busca os dados
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
                {personId ? 'Editar Pessoa' : 'Cadastrar Pessoa'}
            </Text>

            {/* Nome */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Nome</Text>
                <Controller
                    control={control}
                    name="name"
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Nome da Pessoa"
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

            {/* Documento (CPF) */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Documento (CPF)</Text>
                <Controller
                    control={control}
                    name="document"
                    rules={{ required: "Documento é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInputMask
                            type="cpf"
                            placeholder="Digite o CPF"
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
                {errors.document && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.document.message}</Text>}
            </View>

            {/* Botão de Salvar */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                    backgroundColor: '#3B82F6',
                    padding: 16,
                    borderRadius: 8,
                    marginTop: 16,
                }}
            >
                <Text style={{ color: '#FFFFFF', textAlign: 'center', fontSize: 16 }}>
                    {personId ? 'Atualizar Pessoa' : 'Cadastrar Pessoa'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PersonForm;
