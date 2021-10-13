import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
//import{ Vote} from '../assets/vote.jpg'
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
      navigation.navigate('Accueil');
      storage.setItem(currentUser, JSON.stringify(response.data));
    }).catch(error => {
      setMessage("Erreur d'identification, vérifiez votre matricule et votre mot de passe")
    })
  }
  return (
    <ImageBackground 
      style={styles.container}
      resizeMode='cover'
      source={require('./../assets/vote.png')}
    >
      { message && <Text>{message}</Text>}
      <Text style={styles.header}>Système de vote en ligne</Text>
      <View style={styles.connexion}>
        <Text style={[styles.text, styles.commun]}>Connexion</Text>
        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Matricule'
          onChangeText={text => setMatricule(text)}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

          <TouchableOpacity
            style={[styles.button, styles.commun]}
            onPress={() => authenticateUser()}
          >
          <Text style={{color: '#fff'}}>Se connecter</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  )
}

export default Authentication;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#317AFF',
    width: '90%',
    height: 55,
    color: '#fff',
    opacity: 0.8,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  connexion: {
    width: '90%',
    backgroundColor: 'white',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#454545',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  commun: {
    width: '90%',
    height: 55,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#317AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  }
})
