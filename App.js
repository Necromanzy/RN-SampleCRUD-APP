/**
 * @author Shanilka
 */
import React, { Component } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LocalDBConnection from "./src/singleton/LocalDBConnection";
// import LocalDBService from "./services/LocalDBService";

import Home from './src/screens/Home';
import AddCustomer from "./src/screens/AddCustomer";

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    //create new local DB connection
    LocalDBConnection.createDBConnection();
  }

  render() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="AddCustomer" component={AddCustomer} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;

