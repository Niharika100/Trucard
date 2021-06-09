import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  PixelRatio as PR
} from 'react-native';


const HomeScreen = ({ navigation }) => {
  
  // useDispatch to call the reducer for the redux store update
  const dispatch = useDispatch();

  // function to fetch the list from server
  const getUserList = async () => {
    const options = { method: 'GET' }
    const userList = await fetch('https://reqres.in/api/users?page=2', options)
      .then(result => result.json())
      .then(res => { return res })

    if (userList) {
      // if the fetch is success, the data will be updated to the redux store and navigate the app to the User List View screen
      dispatch({ type: 'loadData', payload: userList })
      navigation.navigate('UserList');
    }
  }

  return (
    <View style={{padding: PR.getPixelSizeForLayoutSize(24) / PR.get()}}>
      // button to load the user list
      // TouchableOpacity is used to add styling
      <TouchableOpacity style= {styles.buttonContainer} onPress={() => { getUserList() }}>
        <Text style={styles.textContainer}>Add Load List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer : {
    backgroundColor: 'white',
    alignItems:'center',
    padding: PR.getPixelSizeForLayoutSize(8) / PR.get(),
    borderWidth: 2,
    borderColor: '#f2749a',
    borderRadius: 10
  },
  textContainer:{
    fontFamily: 'Helvetica',
  },
})

export default HomeScreen;
