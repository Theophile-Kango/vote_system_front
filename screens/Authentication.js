import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../modules/url";
import Auth from '../modules/auth';

const Authentication = ({ navigation }) => {
  const [matricule, setMatricule] = useState()
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const storage = AsyncStorage;
  const currentUser = "current-user";

  const auth = new Auth({ host: url })
  const authenticateUser = () => {
    auth.signIn(matricule, password).then(response => {
      navigation.navigate('My Application');
      storage.setItem(currentUser, JSON.stringify(response.data));
    }).catch(error => {
      setMessage("Erreur d'identification, vérifiez votre matricule et votre mot de passe")
    })
  }
  return (
    <View>
      { message && <Text>{message}</Text>}
      <>
        <Text>Log in</Text>
        <TextInput
          style={styles.input}
          placeholder='Matricule'
          onChangeText={text => setMatricule(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Button
          title="Log in"
          type='solid'
          color='#A9A9A9'
          onPress={() => authenticateUser()}
        />
      </>

    </View>
  )
}

export default Authentication;

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#d3d3d3'
  }
})
