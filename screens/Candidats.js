import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { url } from "../modules/url";
import { getCandidat } from '../helpers/getCandidat';
import EndPoint from '../modules/endPoints';

const Candidats = ({ candidat, navigation }) => {

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);

  const endPoint = new EndPoint({ host: url });

  useEffect(() => {
    usersList();
  },[]);

  const usersList = () => {
    endPoint.getUsers().then((res) => {
      setUsers(res.data)
    }).catch(error => {
      console.log(error)
    });
  }

  const { nom, post_nom, prenom } = getCandidat(candidat.user_id, users);

  return (
    <View
      testID={`candidat-${candidat.id}`}
      style={styles.container}
    >
      {!!users &&
        <View style={styles.card, { backgroundColor: '#317AFF', paddingTop: 10} }>
          <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}>
            {`${nom.toUpperCase()} ${post_nom.toUpperCase()} ${prenom.toUpperCase()}`}
          </Text>
        </View>
      }
      <Image
        source={{ uri: candidat.image }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.card}>
        <Text 
          onPress={() => {
            navigation.navigate('Candidat', { candidat: candidat })
          }} 
            testID="title" 
            style={styles.title}
          >
            {candidat.description.split('').slice(0, 100).join("")} ...
          </Text>
      </View>
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
