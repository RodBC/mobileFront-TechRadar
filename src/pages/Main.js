import React, { useEffect, useState } from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, Text, View } from 'react-native'
import routes from '../models/UserProfile'

const Main = () => {   

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
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: currentRegion.latitude, longitude: currentRegion.longitude }}>
                <Image style={styles.avatar} source={{uri: 'https://avatars.githubusercontent.com/u/82513713?v=4'}}/>
                <Callout onPress={() =>{
                    navigation.navigate('Profile', {github_username: 'RodBC'});
                }}>                
                <View style={styles.devContainer}>
                    <Text style={styles.devName}>Digao</Text>
                    <Text style={styles.devName}>Working@CITi</Text>
                    <Text style={styles.devName}>React.js React-native</Text>
                </View>
                </Callout>
            </Marker>
        </MapView>
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
        fontWeight: 'bold',
    },


});

export default Main;