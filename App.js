import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import Authentication from './screens/Authentication';
import Logout from './components/Logout';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Authentication'
          component={Authentication}
        />
        <Stack.Screen
          name="My Application"
          component={FirstScreen}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Logout navigation={navigation} />
            ),
            headerStyle: {
              backgroundColor: '#892b2f',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30
            }
          })
          }
        />
        <Stack.Screen
          name='Second Screen'
          component={SecondScreen}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Logout navigation={navigation} />
            ),
            headerBackTitle: 'Take me back',
            headerRight: () => (
              <Logout />
            )
          })
        }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30
  }
});
