import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Candidats from './Candidats';
import { url } from './../modules/url';
import EndPoint from '../modules/endPoints';

const Accueil = ({ navigation, successMessage }) => {
  const [candidats, setCandidats] = useState([]);
  const [listCandidat, setListCandidat] = useState([]);
  const [message, setMessage] = useState([]);
  const [users, setUsers] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const endPoint = new EndPoint({ host: url });

  const storage = AsyncStorage;

  useEffect(() => {
    getCurrentUser();
    //candidatList();
   // usersList();
  },[]);

  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
       setCurrentUser(JSON.parse(user));
    });
    endPoint.getCandidates().then((res) => {
      setCandidats(res.data)
    }).catch(error => {
      console.warn(error)
    });
    endPoint.getUsers().then((res) => {
      setUsers(res.data)
    }).catch(error => {
      console.log(error)
    });
  }
  
  return (
    <View style={styles.container}>
      {!!successMessage && <Text>{successMessage}</Text>}
      {!!message && <Text>{message}</Text>}
      <FlatList
        data={candidats}
        keyExtractor={(candidat) => candidat.id.toString()}
        renderItem={({ item }) => {
          return <Candidats  candidat={item} navigation={navigation} />
        }}
      />
    </View>
  )
}

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
