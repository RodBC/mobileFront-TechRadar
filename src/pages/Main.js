import React, { useEffect, useState } from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, Text, View, TouchableOpacity, Touchable } from 'react-native'
import routes from '../models/UserProfile'
import { TextInput } from 'react-native-gesture-handler';
import {  MaterialIcons  } from '@expo/vector-icons'

const Main = ({navigation}) => {   

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect( () => {
        async function loadInitialPosition(){
            const { granted } = await requestForegroundPermissionsAsync();
            if (granted){
                const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });
                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                })
            }
        }
        loadInitialPosition();
    }, []);
    if (!currentRegion){
        return null;
    }
    return (
            <>
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }}>
                <Image style={styles.avatar} source={{uri: 'https://avatars.githubusercontent.com/u/82513713?v=4'}}/>
                <Callout onPress={() =>{
                    //navigation
                    navigation.navigate('Profile', {github_username: 'RodBC'});
                }}>                
                <View style={styles.devContainer}>
                    <Text style={styles.devName}>Digao</Text>
                    <Text style={styles.devBio}>Working@CITi</Text>
                    <Text style={styles.devTech}>React.js React-native</Text>
                </View>
                </Callout>
            </Marker>
        </MapView>
                <View style={styles.searchForm}>
                    <TextInput
                    style={styles.searchInput}
                    placeholder='Bbuscando por Devs...'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    />
                    <TouchableOpacity onPress={() => {}} style={styles.loadButton}>
                        <MaterialIcons name='my-location' size={20} color='#FFF'></MaterialIcons>
                    </TouchableOpacity>
                </View>
        
            </>

    )
};


const styles = StyleSheet.create({
    map:{
        flex: 1
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    devContainer:{
        width: 260
    },
    devName:{
        fontWeight: 16,
        fontWeight: 'bold',
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTech:{
        marginTop: 5,
    },
    searchForm:{
        position: 'absolute',
        bottom: 20,
        right: 20,
        left: 20,
        zIndex: 5,
        flexDirection: 'row',

    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton:{
        height: 50,
        width: 50,
        backgroundColor: '#8E4Dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },


});

export default Main;