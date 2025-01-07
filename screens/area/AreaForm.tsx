import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const AreaForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [entrada, setEntrada] = useState('');
    const [saida, setSaida] = useState('');

    const onSubmit = data => {
        Alert.alert("Área Cadastrada", `Nome: ${data.nome}, Entrada: ${entrada}, Saída: ${saida}`);
    };

    return (
        <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Cadastro de Área</Text>

            {/* Nome da Área */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Nome</Text>
                <Controller
                    control={control}
                    name="nome"
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
                {errors.nome && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.nome.message}</Text>}
            </View>

            {/* Entrada */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Entrada</Text>
                <TextInput
                    placeholder="Digite a Entrada (Ex: Porta A)"
                    value={entrada}
                    onChangeText={setEntrada}
                    style={{
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        padding: 12,
                        borderRadius: 8,
                    }}
                />
            </View>

            {/* Saída */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Saída</Text>
                <TextInput
                    placeholder="Digite a Saída (Ex: Porta B)"
                    value={saida}
                    onChangeText={setSaida}
                    style={{
                        borderWidth: 1,
                        borderColor: '#D1D5DB',
                        padding: 12,
                        borderRadius: 8,
                    }}
                />
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
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>Cadastrar Área</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AreaForm;
