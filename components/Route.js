import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from './Nav';

const Stack = createStackNavigator()

const Route = ({name, component, route}) => {
    const [user, setUser] = useState();

    const storage = AsyncStorage;
    useEffect(() => {
        getCurrentUser();
    },[]);

    const getCurrentUser = () => {
        storage.getItem("current-user").then(user => {
            setUser(JSON.parse(user));
        });
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    user ?
                    <Stack.Screen
                        name={name}
                        component={component}

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
                    :
                    <Stack.Screen
                        name={name}
                        component={component}
                    />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Route;

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
