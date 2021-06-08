import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './src/Store';
import HomeScreen from './src/Screens/HomeScreen';
import UserListScreen from './src/Screens/UserListScreen';

const App = createStackNavigator();

const MyStack = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App.Navigator>
          <App.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <App.Screen
            name="UserList"
            component={UserListScreen}
            options={{ title: 'Users' }}
          />
        </App.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MyStack;