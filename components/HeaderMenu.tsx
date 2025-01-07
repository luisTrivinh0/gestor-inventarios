import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    Animated,
    Dimensions,
    PanResponder,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Menu from './Menu';

const { width } = Dimensions.get("window");

const HeaderMenu = ({ title = "" }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const [drawerAnim] = useState(new Animated.Value(width)); 
    const navigation = useNavigation();

    const handleNavigation = (route) => {
        if (route) {
            navigation.navigate(route); 
            setIsDrawerOpen(false);
        }
    };

    const toggleSubmenu = (index) => {
        setOpenSubmenu(openSubmenu === index ? null : index);
    };

    const openDrawer = () => {
        setIsDrawerOpen(true);
        Animated.timing(drawerAnim, {
            toValue: width * 0.25,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnim, {
            toValue: width,
            duration: 300,
            useNativeDriver: false,
        }).start(() => setIsDrawerOpen(false));
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dx > 20,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dx > 0) {
                drawerAnim.setValue(width - gestureState.dx);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 100) {
                closeDrawer();
            } else {
                openDrawer();
            }
        },
    });

    return (
        <>
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 bg-blue-500">
                <Text className="text-white text-lg font-bold">Gestor</Text>
                <TouchableOpacity onPress={openDrawer}>
                    <Ionicons name="menu" size={28} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Drawer Menu */}
            <Modal
                transparent={true}
                visible={isDrawerOpen}
                onRequestClose={closeDrawer}
                animationType="none"
            >
                <Pressable
                    className="flex-1 bg-black/40"
                    onPress={closeDrawer}
                />
                <Animated.View
                    style={{
                        transform: [{ translateX: drawerAnim }],
                        position: 'absolute',
                        right: 0,
                        width: '75%',
                        height: '100%',
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: { width: -2, height: 0 },
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 5,
                    }}
                    {...panResponder.panHandlers}
                >
                    <View className="p-4 border-b border-gray-200">
                        <Text className="text-lg font-bold text-gray-800">Menu</Text>
                    </View>
                    <View className="p-4">
                        {Menu.map((item, index) => (
                            <View key={index}>
                                {/* Item Principal */}
                                <TouchableOpacity
                                    onPress={() =>
                                        item.subItems
                                            ? toggleSubmenu(index)
                                            : handleNavigation(item.route)
                                    }
                                    className="flex-row items-center gap-x-3 py-3 px-4 rounded-lg hover:bg-gray-100 border-b-2 border-gray-500"
                                >
                                    <Ionicons name={item.icon} size={20} color="#4F46E5" />
                                    <Text className="text-base text-gray-800">{item.title}</Text>
                                    {item.subItems && (
                                        <Ionicons
                                            name={openSubmenu === index ? 'chevron-up' : 'chevron-down'}
                                            size={16}
                                            color="#4F46E5"
                                            className="ml-auto"
                                        />
                                    )}
                                </TouchableOpacity>

                                {/* Submenu */}
                                {openSubmenu === index && item.subItems && (
                                    <View className="ml-8">
                                        {item.subItems.map((subItem, subIndex) => (
                                            <TouchableOpacity
                                                key={subIndex}
                                                onPress={() => handleNavigation(subItem.route)}
                                                className="flex-row items-center gap-x-3 py-2 px-4 rounded-lg hover:bg-gray-100 border-b-2 border-gray-300"
                                            >
                                                <Ionicons
                                                    name="caret-forward"
                                                    size={16}
                                                    color="#6B7280"
                                                />
                                                <Text className="text-sm text-gray-600">
                                                    {subItem.title}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                </Animated.View>
            </Modal>
        </>
    );
};

export default HeaderMenu;
