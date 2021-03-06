import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EndPoint from '../modules/endPoints';
import { url } from '../modules/url';
import Error from '../components/Error';

const Candidat = (props, { navigation }) => {

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { candidat, nom, post_nom, prenom } = props.route.params;

  const { user, votes, doesVote } = props.route.params;

  const endPoint = new EndPoint({ host: url });

  const createVote = () => {
    setIsLoading(true);
    endPoint.newVote(
      {
        user_id: user.id,
        candidat_id: candidat.id
      }
    ).then(res => {
      setDoesVote(true);
      setIsLoading(false);
    }).catch(error => {
      setIsLoading(false);
      navigation.navigate("Accueil");
      setMessage("Erreur enregistrement");
    });
  }

  return (
    <View style={styles.main}>
      {!!message && <Error message={message} />}
      {votes.length >= 1 && user.role === "admin" && 
        <View style={styles.card, { backgroundColor: '#317AFF', paddingTop: 10} }>
        <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}>
          {`${votes.filter(vote => vote.candidat_id === candidat.id).length} voix`}
        </Text>
      </View>
      }
      <View style={styles.card, { backgroundColor: '#317AFF', paddingTop: 10} }>
        <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}>
          {`${nom.toUpperCase()} ${post_nom.toUpperCase()} ${prenom.toUpperCase()}`}
        </Text>
      </View>
      <Image
        source={{ uri: candidat.image }}
        style={styles.image}
        resizeMode='contain'
      />
      <View style={styles.card}>
        <Text style={styles.title}>{candidat.description}</Text>
        {candidat.promotion && <Text style={styles.teaser}> {candidat.promotion}</Text>}
      </View>
      {!doesVote &&
        (<View 
            style=
            {styles.card, 
              { 
                backgroundColor: '#5cb85c', 
                paddingTop: 10, 
                marginTop: 10, 
                alignItems: 'center',
                justifyContent: 'center'
              } 
            }
          >
          {isLoading ? 
            <Image
              source={require('./../assets/loaderimg.gif')}
              style={styles.imageButton}
            />
            :
            <Text 
              style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}
              onPress={() => createVote()}
            >
              VOTER
          </Text>}
      </View>)
      }
    </View>
  )
}

export default Candidat;

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
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
  imageButton: {
    width: 45,
    height: 45
  },
  image: {
    width: '100%',
    height: 320
  }
});