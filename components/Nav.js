import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, FontAwesome5, Fontisto } from '@expo/vector-icons';
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
    <View style={styles.main}>
      { !!message && <Text>{message}</Text>}
      {/* <Button
        title="Deconnexion"
        type='solid'
        color='red'
        onPress={() => logOutUser()}
      /> */}
      <TouchableOpacity 
        onPress={() => logOutUser()}
        style={[styles.logout, styles.commun]}
      >
        <FontAwesome name="power-off" style={{textAlign: 'center'}} size={24} color="#fff" />
      </TouchableOpacity>
      { user.role === "admin" && 
        <>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Enregistrement")}
            style={[styles.add, styles.commun]}
          >
            <FontAwesome style={{textAlign: 'center'}} name="user-plus" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate("NewDateVote")}
            style={[styles.date, styles.commun]}
          >
            <Fontisto name="date" style={{textAlign: 'center'}} size={24} color="#fff" />
          </TouchableOpacity>
        </>
      }
      { user.role === "candidate" && 
        <TouchableOpacity 
            onPress={() => navigation.navigate("NewCandidat")}
            style={[styles.date, styles.commun]}
          >
            <FontAwesome5 name="user-edit" style={{textAlign: 'center'}} size={24} color="white" />
          </TouchableOpacity>
      }
    </View>
  )
}

export default Nav;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingRight: 10
  },
  add: {
    backgroundColor: '#5cb85c',
  },
  commun: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: 'center'
  },
  date: {
    backgroundColor: '#0275d8'
  },
  logout: {
    backgroundColor: '#d9534f'
  }
})
