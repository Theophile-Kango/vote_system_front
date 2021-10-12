import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth from '../modules/auth';
import { url } from '../modules/url';

const Nav = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});

  const storage = AsyncStorage;

  useEffect(() => {
    getCurrentUser();
  },[])
  
  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
      setUser(JSON.parse(user))
    });
  }

  const auth = new Auth({ host: url });
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
      { user.role === "admin" && 
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
      { user.role === "candidate" && 
        <Button 
          title="Ajouter description"
          onPress={() => navigation.navigate("NewCandidat")}
        />
      }
    </View>
  )
}

export default Nav;

const styles = StyleSheet.create({
  
})
