import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Candidats from './Candidats';
import { url } from './../modules/url';
import EndPoint from '../modules/endPoints';

const Accueil = ({ navigation }) => {
  const [candidats, setCandidats] = useState([]);
  const [message, setMessage] = useState([]);
  const endPoint = new EndPoint({ host: url });

  useEffect(() => {
    candidatList();
  },[]);

  const candidatList = () => {
    endPoint.getCandidates().then((res) => {
      setCandidats(res.data)
    }).catch(error => {
      setMessage(error);
    });
  }
  

  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30
  }
});
