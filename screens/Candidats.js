import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../modules/url";
import { getCandidat } from '../helpers/getCandidat';
import EndPoint from '../modules/endPoints';

const Candidats = ({ candidat, navigation, message }) => {

  const storage = AsyncStorage;

  const [users, setUsers] = useState([]);
  const initialCandidat = {
    nom: '',
    post_nom: '',
    prenom: ''
  }
  const [currentCandidat, setCurrentCandidat] = useState(initialCandidat);

  const [user, setUser] = useState({});

  const [doesVote, setDoesVote] = useState(false);

  const [votes, setVotes] = useState([]);

  const endPoint = new EndPoint({ host: url });

  useEffect(() => {
    usersList();
  },[currentCandidat]);

  const usersList = () => {
    getCurrentUser();
    endPoint.getUsers().then((res) => {
      setUsers(res.data)
      setCurrentCandidat(getCandidat(candidat.user_id, res.data))
    }).catch(error => {
      console.log(error)
    });
  }

  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
      setUser(JSON.parse(user));
      endPoint.getVotes().then(res => {
        setVotes(res.data);
        const result = res.data.map(vote => vote.user_id).includes(JSON.parse(user).id);
        setDoesVote(result)
        //console.warn(result);
        //setDoesVote();
       
      }).catch(err => console.warn(err))
      
    });
  }

  const { nom, post_nom, prenom } = currentCandidat;

  return (
    <View
      testID={`candidat-${candidat.id}`}
      style={styles.container}
    >
      {!!users && !!currentCandidat &&
        <View style={styles.card, { backgroundColor: '#317AFF', paddingTop: 10} }>
          <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}>
            {nom && nom.toUpperCase()} {post_nom && post_nom.toUpperCase()} {prenom && prenom.toUpperCase()}
          </Text>
        </View>
      }
      {!!candidat && 
        <Image
          source={{ uri: candidat.image }}
          style={styles.image}
          resizeMode='contain'
      />
      }
      {!!candidat && 
        <View style={styles.card}>
          <Text 
            onPress={() => {
              navigation.navigate('Candidat', { candidat: candidat, nom: nom, post_nom: post_nom, prenom: prenom, user: user, doesVote: doesVote, votes: votes })
            }} 
              testID="title" 
              style={styles.title}
            >
            {candidat.description && candidat.description.split('').slice(0, 100).join("")} ...
          </Text>
        </View>
      }
      </View>
      
  )
}

export default Candidats;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  card: {
    padding: 7,
    paddingLeft: 10,
    paddingRight: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    paddingBottom: 10,
    color: '#454545'
  },

  image: {
    width: '100%',
    height: 320
  }
})
