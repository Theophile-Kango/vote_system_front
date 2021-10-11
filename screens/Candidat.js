import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import EndPoint from '../modules/endPoints';
import { url } from '../modules/url';

const Candidat = () => {
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState();
  const [message, setMessage] = useState();
  const [userId, setUserId] = useState();
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
        setUserId(JSON.parse(user).id);
    });
  }

  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      //const imgEncode = base64.encode(result.uri);
      setImage(result.uri); 
      //console.log(result.uri)
      //console.warn(result.base64);
      //const data = new FormData();
     // data.append('name',{
          //name: image, /* name your image whatever you want*/
          //type: 'image/jpeg', /* type of image that you're uploading*/
          //uri: result.uri /*data, file or image from ImagePicker here you should pass uri data but not all data from ImagePicker*/
      //})
      // let uriParts = image.split('.');
      // let fileType = uriParts[uriParts.length - 1];
    }
  };

  
  const createCandidate = () => {

    if (image != null) {
      endPoint.newCandidate(
        {
          user_id: userId,
          image,
          description
        }
      ).then(() => {
        setMessage(`image et description ajoutées avec succès`);
      }).catch(error => {
        setMessage("Erreur enregistrement");
        console.warn(error)
      });
      //const data = new FormData();
      //data.append('image', fileToUpload);
      //data.append('description', description);
      // Please change file upload URL
      // let res = await fetch(
      //   'http://localhost/upload.php',
      //   {
      //     method: 'post',
      //     body: data,
      //     headers: {
      //       'Content-Type': 'multipart/form-data; ',
      //     },
      //   }
      // );
    //   let responseJson = await res.json();
    //   if (responseJson.status == 1) {
    //     setMessage('Upload Successful');
    //   }
    } else {
       // If no file selected the show alert
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
          <Text>{image && image}</Text>
        </View>

        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={10}
          placeholder='Description'
          onChangeText={text => setDescription(text)}
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

export default Candidat;

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
