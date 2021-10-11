import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from './screens/FirstScreen';
import SecondScreen from './screens/SecondScreen';
import Authentication from './screens/Authentication';
import Registration from './screens/Registration';
import Nav from './components/Nav';
import NewDateVote from './screens/dateVotes/NewDateVote';
import Candidat from './screens/Candidat';

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
          name='Registration'
          component={Registration}
          options={({route, navigation}) => ({
              headerRight: () => (
                <Nav navigation={navigation} />
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
          name='NewDateVote'
          component={NewDateVote}
          options={({route, navigation}) => ({
              headerRight: () => (
                <Nav navigation={navigation} />
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
          name='Candidat'
          component={Candidat}
          options={({route, navigation}) => ({
              headerRight: () => (
                <Nav navigation={navigation} />
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
          name="My Application"
          component={FirstScreen}
          options={({route, navigation}) => ({
            headerRight: () => (
              <Nav navigation={navigation} />
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
              <Nav navigation={navigation} />
            ),
            headerBackTitle: 'Take me back'
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
