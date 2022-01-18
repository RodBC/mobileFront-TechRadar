import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet } from 'react-native'
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
    return <MapView initialRegion={currentRegion} style={styles.map}/> 
};


const styles = StyleSheet.create({
    map:{
        flex: 1
    },

});

export default Main;