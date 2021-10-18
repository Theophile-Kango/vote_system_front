import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Platform, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import EndPoint from '../modules/endPoints';
import { url } from '../modules/url';

const NewCandidat = ({ navigation }) => {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState();
  const [message, setMessage] = useState();
  const [user, setUser] = useState({});
  const [userCandidate, setUserCandidate] = useState({});
  const [base64Img, setBase64Img] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const storage = AsyncStorage;

  const endPoint = new EndPoint({ host: url });

  useEffect(() => {
    getCurrentUser();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
    )();
  },[]);
  
  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
        setUser(JSON.parse(user));
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [6, 6],
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.uri);
      Platform.OS !== 'web' ? setBase64Img(`data:image/jpg;base64,${result.base64}`) : setBase64Img(result.uri);
    }
  }

  const createCandidate = () => {
    setIsLoading(true);
    if (image != null) {
      endPoint.newCandidate(
        {
          user_id: user.id,
          image: base64Img,
          description
        }
      ).then(res => {
        setUserCandidate({...user, candidat: res.data});
        storage.setItem("current-user",userCandidate);
        alert("Candidat ajouté avec succès")
        setIsLoading(false);
        navigation.navigate('Accueil');
      }).catch(error => {
        alert("Erreur enregistrement");
      });
    } else {
      alert('Veuillez d\'abord sélectionner le fichier');
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <>
        <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          {image &&  <Image source={{ uri: image }} style={{ width: 300, height: 300, marginTop: 10 }} />}
          <Text style={[styles.button, styles.commun, {color: "#fff", textAlign: "center", textAlignVertical: "center"}]} onPress={pickImage} >Prenez une image</Text>
        </View>

        <TextInput
          style={[styles.input, styles.commun]}
          multiline={true}
          numberOfLines={10}
          placeholder='Description'
          onChangeText={text => setDescription(text)}
        />

        <TouchableOpacity
          style={[styles.button, styles.commun]}
          onPress={() => createCandidate()}
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
      </>
    </View>
  )
}

export default NewCandidat;

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
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#317AFF',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ddd',
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  }
})
