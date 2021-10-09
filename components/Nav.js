import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from '../modules/auth';

const Nav = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const storage = AsyncStorage;

  useEffect(() => {
    getCurrentUser();
  },[role])
  
  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
        setRole(JSON.parse(user).role)
    });
  }

  const auth = new Auth({ host: 'http://localhost:3000' });
  const logOutUser = () => {
    auth.signOut().then(response => {
        navigation.navigate("Authentication");
    }).catch(error => setMessage(error));
  }
  return (
    <View>
      { !!message && <Text>{message}</Text>}
      <Button
        title="Deconnexion"
        type='solid'
        color='red'
        onPress={() => logOutUser()}
      />
      { role === "admin" && 
        <>
          <Button 
            title="Enregistrer Utilisateur"
            onPress={() => navigation.navigate("Registration")}
          /> 
          <Button 
            title="Ajouter un vote"
            onPress={() => navigation.navigate("NewDateVote")}
          /> 
        </>
        }
    </View>
  )
}

export default Nav;

const styles = StyleSheet.create({
  
})
