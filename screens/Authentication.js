import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'

import Auth from '../modules/auth'

const Authentication = ({ navigation }) => {
  const [matricule, setMatricule] = useState()
  const [password, setPassword] = useState()
  const [message, setMessage] = useState()

  const auth = new Auth({ host: 'http://localhost:3000' })
  const authenticateUser = () => {
    auth.signIn(matricule, password).then(response => {
      navigation.navigate('My Application')
    }).catch(error => {
      setMessage(error.response.data.errors[0])
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
