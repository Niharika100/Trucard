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
  const dispatch = useDispatch();

  const getUserList = async () => {
    const options = { method: 'GET' }
    const userList = await fetch('https://reqres.in/api/users?page=2', options)
      .then(result => result.json())
      .then(res => { return res })

    if (userList) {
      dispatch({ type: 'loadData', payload: userList })
      navigation.navigate('UserList');
    }
  }

  return (
    <View style={{padding: PR.getPixelSizeForLayoutSize(24) / PR.get()}}>
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