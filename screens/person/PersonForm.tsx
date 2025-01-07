import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInputMask } from 'react-native-masked-text';

const PersonForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        Alert.alert("Pessoa Cadastrada", `Nome: ${data.nome}, Documento: ${data.documento}`);
    };

    return (
        <View className="p-4">
            <Text className="text-lg font-bold mb-4">Cadastro de Pessoa</Text>

            {/* Label e Campo Nome */}
            <View className="mb-4">
                <Text className="text-sm font-semibold mb-1">Nome</Text>
                <Controller
                    control={control}
                    name="nome"
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Nome da Pessoa"
                            value={value}
                            onChangeText={onChange}
                            className="border border-gray-300 p-3 rounded-md"
                        />
                    )}
                />
                {errors.nome && <Text className="text-red-500 text-sm">{errors.nome.message}</Text>}
            </View>

            {/* Label e Campo Documento */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Documento</Text>
                <Controller
                    control={control}
                    name="documento"
                    rules={{ required: "Documento é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInputMask
                            type={'cpf'}
                            placeholder="CPF"
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
                {errors.documento && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.documento.message}</Text>}
            </View>

            {/* Botão de Submissão */}
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-500 p-3 rounded-lg mt-4"
            >
                <Text className="text-white text-center">Cadastrar Pessoa</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PersonForm;
