import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from './screens/Accueil';
import Candidats from './screens/Candidats';
import Authentication from './screens/Authentication';
import Registration from './screens/Registration';
import Nav from './components/Nav';
import NewDateVote from './screens/dateVotes/NewDateVote';
import Candidat from './screens/Candidat';
//import Route from './components/Route'
import NewCandidat from './screens/NewCandidat';

const Stack = createStackNavigator()

const App = () => {
  return (
    // <>
    //   <Route name='Authentication' component={Authentication} />
    //   <Route name='Registration' component={Registration} />
    //   <Route name='Accueil' component={Registration} />
    //   <Route name='Candidat' component={Candidat} />
    //   <Route name='Candidats' component={Candidats} />
    // </>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Authentication'
          component={Authentication}
          options={{
            headerShown: false
          }}
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
          name='Candidats'
          component={Candidats}
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
          name='NewCandidat'
          component={NewCandidat}
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
          name="Accueil"
          component={Accueil}
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
