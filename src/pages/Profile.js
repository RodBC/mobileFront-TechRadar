import { Text, View } from "react-native";
import {WebView} from 'react-native-webview'

const Profile = ({navigation}) => {
    const githunUsername = navigation.getParam('github_username');

    return <WebView style={{flex: 1}} source={{uri: `https://github.com/${githunUsername}`}}/>

};
export default Profile;