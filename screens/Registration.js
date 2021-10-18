import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Error from '../components/Error';
import EndPoint from '../modules/endPoints';
import Auth from '../modules/auth';
import { url } from '../modules/url';

const Registration = ({navigation}) => {
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [postNom, setPostNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [promotion, setPromotion] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("");
  const [dateVotes, setDateVotes] = useState([]);
  const [dateVote, setDateVote] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const auth = new Auth({ host: url });
  const endPoint = new EndPoint({ host: url })

  useEffect(() => { getDateVote() },[]);

  const getDateVote = () => {
    endPoint.getDateVotes().then(res => setDateVotes(res.data))
  }

  
  const signUpUser = () => { 
    if([matricule, nom, postNom, password, role, dateVote].includes("")){
      alert("Les champs matricule, nom, post nom, mot de passe et date vote doivent etre remplis");
    }else{
      auth.signUp(
        {
          matricule,
          nom,
          post_nom: postNom,
          prenom,
          password,
          role: parseInt(role),
          date_vote_id: parseInt(dateVote),
          promotion
        }
      )
      .then(() => {
        alert(`Utilisateur ${nom} ${postNom} ${prenom} créé avec succès`);
        setIsLoading(false);
        navigation.navigate('Accueil');
      })
      .catch(error => {
        alert("Erreur enregistrement");
        setIsLoading(false);
        console.log(error)
      });
    }
  }
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Système de vote en ligne</Text>
      <View style={styles.connexion}>
        <Text style={[styles.text, styles.commun]}>Creation Compte</Text>
        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Matricule'
          onChangeText={text => setMatricule(text)}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Nom'
          onChangeText={text => setNom(text)}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Post nom'
          onChangeText={text => setPostNom(text)}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Prenom'
          onChangeText={text => setPrenom(text)}
          value={prenom}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Promotion'
          onChangeText={text => setPromotion(text)}
          value={promotion}
        />

        <TextInput
          style={[styles.input, styles.commun]}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
        />

          <View 
            style={[styles.commun, styles.input, {justifyContent: 'center'}]}
          >
            <Picker
              selectedValue={role}
              onValueChange={(itemValue, itemIndex) =>{
                  setRole(itemValue)}
              }>
                <Picker.Item label="selectionner un role" value="" />  
                <Picker.Item label="Admin" value="1" />
                <Picker.Item label="Cp" value="2" />
                <Picker.Item label="candidat" value="3" />
            </Picker>
          </View>
          <View 
            style={[styles.commun, styles.input, {justifyContent: 'center'}]}
          >
            <Picker
              selectedValue={dateVote}
              onValueChange={(itemValue, itemIndex) =>{
                  setDateVote(itemValue)}
              }>
                <Picker.Item label="selectionner une date vote" value="" />
                {!!dateVotes && dateVotes.map(element => (
                  <Picker.Item label={element.title} key={element.id} value={String(element.id)} />
                ))} 
            </Picker>
          </View>

        <TouchableOpacity
          style={[styles.button, styles.commun]}
          onPress={() => signUpUser()}
        >
          {isLoading ? 
            <Image
              source={require('./../assets/loaderimg.gif')}
              style={styles.image}
            />
            :
            <Text style={{color: '#fff'}}>
              Enregistrer
            </Text>
          }
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

export default Registration;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#317AFF',
    width: '90%',
    height: 55,
    color: '#fff',
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  image: {
    width: 45,
    height: 45
  },
  connexion: {
    width: '90%',
    backgroundColor: 'white',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: '#454545',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 22
  },
  commun: {
    width: '90%',
    height: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#317AFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  }
})
