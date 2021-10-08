import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, InteractionManager } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Auth from '../modules/auth'

const Registration = () => {
  const [matricule, setMatricule] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [role, setRole] = useState();


  const auth = new Auth({ host: 'http://localhost:3000' })
  
  const signUpUser = () => { 
    auth.signUp(
        {
            matricule,
            password,
            role: parseInt(role)
        }
    )
    .then(userDatas => {
        setMessage(`Utilisateur ${JSON.parse(userDatas.config.data).matricule} créé avec succès`)
        // .then(() =>{
        //         navigation.navigate('My Application');
        //     }
        // );
    })
    .catch(error => {
        setMessage("Erreur enregistrement");
    });
    }
    
  return (
    <View>
      { message && <Text>{message}</Text>}
      <>
        <Text>Creation Compte</Text>
        <TextInput
          style={styles.input}
          placeholder='Matricule'
          onChangeText={text => setMatricule(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          defaultValue={""}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />

        <Picker
            selectedValue={role}
            onValueChange={(itemValue, itemIndex) =>{
                setRole(itemValue)
                console.log(role)}
            }>
            <Picker.Item label="selectionner un role" value="" />  
            <Picker.Item label="Admin" value="1" />
            <Picker.Item label="Cp" value="2" />
            <Picker.Item label="candidat" value="3" />
        </Picker>

        <Button
          title="Enregistrer"
          type='solid'
          color='#A9A9A9'
          onPress={() => signUpUser()}
        />
      </>

    </View>
  )
}

export default Registration;

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#d3d3d3'
  }
})
