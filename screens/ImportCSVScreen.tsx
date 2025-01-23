import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const ImportCSVScreen: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileUri, setFileUri] = useState<string | null>(null);

    const types = [
        { label: 'Pessoa', value: 'person' },
        { label: 'Área', value: 'area' },
        { label: 'Produto', value: 'product' },
    ];

    // Seleciona um arquivo
    const selectFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/csv',
                copyToCacheDirectory: true,
            });

            if (result.type === 'success') {
                setFileName(result.name);
                setFileUri(result.uri);
                return result;
            } else {
                Alert.alert('Cancelado', 'Nenhum arquivo selecionado.');
            }
        } catch (err) {
            Alert.alert('Erro', 'Erro ao selecionar o arquivo.');
        }
    };

    // Faz o upload do arquivo
    const uploadFile = async () => {
        if (!selectedType) {
            Alert.alert('Erro', 'Por favor, selecione o tipo de cadastro.');
            return;
        }

        if (!fileUri) {
            Alert.alert('Erro', 'Por favor, selecione um arquivo.');
            return;
        }

        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (!fileInfo.exists) {
            Alert.alert('Erro', 'Arquivo não encontrado.');
            return;
        }

        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            type: 'text/csv',
            name: fileName || 'arquivo.csv',
        } as any);

        try {
            const response = await fetch(`http://localhost:8000/api/import/${selectedType}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                Alert.alert('Sucesso', result.message);
            } else {
                const error = await response.json();
                Alert.alert('Erro', error.error || 'Erro ao importar o arquivo.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao conectar com o servidor.');
        }
    };

    return (
        <View style={{ padding: 16, flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Importar CSV</Text>

            {/* Seleção de tipo */}
            <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8, fontSize: 14, fontWeight: '600' }}>Selecione o tipo:</Text>
                {types.map((type) => (
                    <TouchableOpacity
                        key={type.value}
                        onPress={() => setSelectedType(type.value)}
                        style={{
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 8,
                            backgroundColor: selectedType === type.value ? '#3B82F6' : '#E5E7EB',
                        }}
                    >
                        <Text style={{ color: selectedType === type.value ? '#FFF' : '#000' }}>
                            {type.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Upload do arquivo */}
            <TouchableOpacity
                onPress={selectFile}
                style={{
                    backgroundColor: '#E5E7EB',
                    padding: 16,
                    borderRadius: 8,
                    marginBottom: 16,
                }}
            >
                <Text style={{ color: '#000', textAlign: 'center', fontSize: 16 }}>
                    {fileName || 'Selecionar Arquivo'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={uploadFile}
                style={{
                    backgroundColor: '#3B82F6',
                    padding: 16,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 16 }}>
                    Enviar Arquivo
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ImportCSVScreen;
