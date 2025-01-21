import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const ProductForm = ({ route, navigation }) => {
    const { productId } = route.params || {}; // ID do produto passado via rota
    const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);

    // Função para buscar os dados do produto
    const fetchProduct = async () => {
        if (!productId) return;
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`);
            if (response.ok) {
                const product = await response.json();
                setValue('nome', product.nome);
                setValue('descricao', product.descricao);
                setValue('codigo', product.codigo);
                setValue('marca', product.marca);
            } else {
                Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao se conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    // Chama fetchProduct quando o component for montado
    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const onSubmit = async (data) => {
        try {
            const url = productId
                ? `http://localhost:8080/products/${productId}`
                : 'http://localhost:8080/products';
            const method = productId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                const message = productId
                    ? `Produto atualizado: ${result.nome}`
                    : `Produto cadastrado: ${result.nome}`;
                Alert.alert('Sucesso', message);
                reset();
                navigation.goBack();
            } else {
                const error = await response.json();
                Alert.alert('Erro', error.detail || 'Erro ao salvar os dados.');
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
                {productId ? 'Editar Produto' : 'Cadastrar Produto'}
            </Text>

            {/* Nome */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Nome</Text>
                <Controller
                    control={control}
                    name="nome"
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Nome do Produto"
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

            {/* Descrição */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Descrição</Text>
                <Controller
                    control={control}
                    name="descricao"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Descrição do Produto"
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
            </View>

            {/* Código */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Código</Text>
                <Controller
                    control={control}
                    name="codigo"
                    rules={{ required: "Código é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Código do Produto"
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
                {errors.codigo && <Text style={{ color: '#EF4444', fontSize: 12 }}>{errors.codigo.message}</Text>}
            </View>

            {/* Marca */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8 }}>Marca</Text>
                <Controller
                    control={control}
                    name="marca"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            placeholder="Marca do Produto"
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
            </View>

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
                    {productId ? 'Atualizar Produto' : 'Cadastrar Produto'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProductForm;
