import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  PixelRatio as PR,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import Sheet from '../Components/Sheet/Sheet';
import store from '../Store';

const UserListScreen = () => {
  // filteredDataSource is the reference to the masterDataSource. filteredDataSource will be used to represent the list so as to use it for the searchBox too.
  // masterDataSource will be used to compare the text in the searchBox with the userList elements
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  // user variable is used to store single user data to show in modal
  const [user, setUser] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [showFullSheet, setShowFullSheet] = useState(false);

  useEffect(() => {
    // latest data will be fetched from the redux store and updated in filteredDataSource and masterDataSource
    let value = store.getState();
    value = value?._W.users.data;
    setFilteredDataSource(value);
    setMasterDataSource(value);
  }, [])

  // function to perform search operation
  const searchFilterFunction = (text) => {
    // check if there is any text in the searchBox
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = `${item.first_name} ${item.last_name}`
          ? `${item.first_name} ${item.last_name}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        // return the items for every matching letter
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchValue(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchValue(text);
    }
  };

  return (
    <View
      style={{ padding: PR.getPixelSizeForLayoutSize(10) / PR.get(), marginBottom: PR.getPixelSizeForLayoutSize(48) / PR.get() }}
    >
      <View style={{ alignItems: 'center' }}>
        <SearchBar
          // clearIcon='false'
          onChangeText={(text) => { searchFilterFunction(text) }}
          placeholder="Search User"
          value={searchValue}
          containerStyle={{ backgroundColor: '#70186f', borderRadius: 20, width: Dimensions.get('screen').width / 1.04 }}
          inputContainerStyle={{ backgroundColor: 'lightgrey', borderRadius: 20 }}
        />
      </View>
      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={filteredDataSource}
        style={{ marginVertical: PR.getPixelSizeForLayoutSize(24) / PR.get()}}
        keyExtractor={i => i.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.cardContainer} onPress={() => {
              setUser(item);
              setShowFullSheet(true)
            }}>
              <View style={styles.idStyle}>
                <Text>{item.id}</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Image source={{ uri: item.avatar, width: 40, height: 40 }} style={styles.imageContainer} />
              </View>
              <View style={{ flex: 3, alignItems: 'center' }}>
                <Text style={styles.textContainer}>{`${item.first_name} ${item.last_name}`}</Text>
                <Text style={styles.textContainer}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )
        }
        }
      />
      // modal to show a single user detail when clicked on the list item
      <Sheet
        modalVisible={showFullSheet}
        data={user}
        close={() => setShowFullSheet(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: PR.getPixelSizeForLayoutSize(24) / PR.get(),
    marginVertical: PR.getPixelSizeForLayoutSize(12) / PR.get(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#b03070',
    borderRadius: 12,
    backgroundColor: 'white'
  },
  idStyle: {
    alignItems: 'center',
    padding: PR.getPixelSizeForLayoutSize(4) / PR.get(),
    width: 32,
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: '#ed87a6'
  },
  imageContainer: {
    borderRadius: 10,
    borderColor: '#242982',
    borderWidth: 1
  },
  textContainer: {
    marginVertical: PR.getPixelSizeForLayoutSize(2) / PR.get(),
    fontFamily: 'SpaceGrotesk-Bold',
  }
})

export default UserListScreen;
