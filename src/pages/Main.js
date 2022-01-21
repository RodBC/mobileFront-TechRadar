import React, { useEffect, useState } from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { StyleSheet, Image, Text, View, TouchableOpacity, Touchable } from 'react-native'
import routes from '../routes'
import { TextInput } from 'react-native-gesture-handler';
import {  MaterialIcons  } from '@expo/vector-icons'
import api from '../services/api';

const Main = ({navigation}) => {   
    const [devs, setDevs] = useState([]);
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

    async function loadDevs(){
        const { latitude, longitude } = currentRegion;
        const response = await api.get('/search', {
            params:{
                latitude,
                longitude,
                techs: 'ReactJS'
            }
        });
        setDevs(response.data.devs);
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    };

    if (!currentRegion){
        return null;
    }
    return (
            <>
        <MapView onRegionChangeComplete={handleRegionChanged}
         initialRegion={currentRegion}
          style={styles.map}
          >
              {devs.map(dev => (
                              <Marker 
                              key={dev._id}
                              coordinate={{
                                  latitude: dev.location.coordinates[1],
                                  longitude: dev.location.coordinates[0] 
                                  }}
                              >
                                  <Image style={styles.avatar} source={dev.avatar_url}/>
                                  <Callout onPress={() =>{
                                      //navigation
                                      navigation.navigate('Profile', {github_username: dev.github_username });
                                  }}>                
                                  <View style={styles.devContainer}>
                                      <Text style={styles.devName}>{dev.name}</Text>
                                      <Text style={styles.devBio}>{dev.bio}</Text>
                                      <Text style={styles.devTech}>{dev.techs.join(', ')}</Text>
                                  </View>
                                  </Callout>
                              </Marker> 
              ))}
        </MapView>
                <View style={styles.searchForm}>
                    <TextInput
                    style={styles.searchInput}
                    placeholder='Bbuscando por Devs...'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    />
                    <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
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