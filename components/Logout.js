import React, { useState } from 'react'
import { StyleSheet, Button } from 'react-native'

import Auth from '../modules/auth'

const Logout = ({ navigation }) => {
  const [message, setMessage] = useState()

  const auth = new Auth({ host: 'http://localhost:3000' });
  const logOutUser = () => {
    auth.signOut().then(response => {
        navigation.navigate("Authentication");
    }).catch(error => setMessage(error));
  }
  return (
    <Button
        title="Logout"
        type='solid'
        color='red'
        onPress={() => logOutUser()}
    />
  )
}

export default Logout;

const styles = StyleSheet.create({
  
})
