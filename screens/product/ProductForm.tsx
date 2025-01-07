import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const ProductForm = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        Alert.alert("Produto Cadastrado", `Nome: ${data.nome}, Descrição: ${data.descricao}, Código: ${data.codigo}, Marca: ${data.marca}`);
    };

    return (
        <View className="p-4">
            <Text className="text-lg font-bold mb-4">Cadastro de Produto</Text>

            <Text className="text-sm font-semibold mb-1">Nome</Text>
            <Controller
                control={control}
                name="nome"
                rules={{ required: "Nome é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Nome do Produto"
                        value={value}
                        onChangeText={onChange}
                        className="border border-gray-300 p-3 rounded-md mb-2"
                    />
                )}
            />
            {errors.nome && <Text className="text-red-500 mb-2">{errors.nome.message}</Text>}

            <Text className="text-sm font-semibold mb-1">Descrição</Text>
            <Controller
                control={control}
                name="descricao"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Descrição do Produto"
                        value={value}
                        onChangeText={onChange}
                        className="border border-gray-300 p-3 rounded-md mb-2"
                    />
                )}
            />

            <Text className="text-sm font-semibold mb-1">Código</Text>
            <Controller
                control={control}
                name="codigo"
                rules={{ required: "Código é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Código do Produto"
                        value={value}
                        onChangeText={onChange}
                        className="border border-gray-300 p-3 rounded-md mb-2"
                    />
                )}
            />
            {errors.codigo && <Text className="text-red-500 mb-2">{errors.codigo.message}</Text>}

            <Text className="text-sm font-semibold mb-1">Marca</Text>
            <Controller
                control={control}
                name="marca"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        placeholder="Marca do Produto"
                        value={value}
                        onChangeText={onChange}
                        className="border border-gray-300 p-3 rounded-md mb-4"
                    />
                )}
            />

            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-500 p-3 rounded-lg"
            >
                <Text className="text-white text-center">Cadastrar Produto</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductForm;
