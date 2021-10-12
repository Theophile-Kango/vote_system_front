import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Platform } from 'react-native';
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
  const [promotion, setPromotion] = useState("");

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

    if (image != null) {
      endPoint.newCandidate(
        {
          user_id: user.id,
          image: base64Img,
          promotion,
          description
        }
      ).then(res => {
        setUserCandidate({...user, candidat: res.data});
        storage.setItem("current-user",userCandidate);
        navigation.navigate('Accueil');
      }).catch(error => {
        setMessage("Erreur enregistrement");
      });
    } else {
      setMessage('Please Select File first');
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      { !!message && <Text>{message}</Text>}
      <>
        <Text>Candidat</Text>
      
        <View>
          <Button style={{backgroundColor: 'red'}} title="Pick an image from camera roll" onPress={pickImage} />
          {image &&  <Image source={{ uri: image }} style={{ width: 300, height: 300, marginTop: 10 }} />}
        </View>

        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={10}
          placeholder='Description'
          onChangeText={text => setDescription(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Promotion'
          onChangeText={text => setPromotion(text)}
          value={promotion}
        />

        <Button
          title="Enregistrer"
          type='solid'
          color='#A9A9A9'
          onPress={() => createCandidate()}
        />
      </>
    </View>
  )
}

export default NewCandidat;

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'black',
    width: '80%', 
    textAlignVertical: 'top',
    borderWidth: 1
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  }
})
