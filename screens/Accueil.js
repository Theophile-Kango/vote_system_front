import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Candidats from './Candidats';
import { url } from './../modules/url';
import EndPoint from '../modules/endPoints';

const Accueil = ({ navigation, successMessage }) => {
  const [candidats, setCandidats] = useState([]);
  const [message, setMessage] = useState([]);
  const endPoint = new EndPoint({ host: url });
  const storage = AsyncStorage;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  

  useEffect(() => {
    usersList();
  },[currentUser, users]);

  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
      setCurrentUser(JSON.parse(user));
      }).catch(err => console.warn(err));
  }

  const usersList = () => {
    getCurrentUser();
    endPoint.getUsers().then((res) => {
      setUsers(res.data)
      //setSelectedUser(user.id)
    }).catch(error => {
      console.log(error)
    });
  }

  useEffect(() => {
    candidatList();
  },[]);

  const candidatList = () => {
    endPoint.getCandidates().then((res) => {
      let listCandidats = [];
      let userVotes = users.filter(user => user.date_vote_id === currentUser.date_vote_id);
      res.data.forEach(result => {
        if(userVotes.map(user => user.id).includes(result.user_id)){
          listCandidats.push(result);
        }
      })
      setCandidats(listCandidats)
    }).catch(error => {
      console.warn(error)
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
