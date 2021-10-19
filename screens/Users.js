import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Alert,
  View,
  Image,
} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons'; 
import { DataTable } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../modules/url";
import { getCandidat } from '../helpers/getCandidat';
import EndPoint from '../modules/endPoints';


const Users = ({ user, navigation }) => {

  const storage = AsyncStorage;
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
    getCurrentUser();
  },[]);

  const getCurrentUser = () => {
    storage.getItem("current-user").then(user => {
      setCurrentUser(JSON.parse(user));
      }).catch(err => console.warn(err));
  }

  // const initialUser = {
  //   matricule: '',
  //   nom: '',
  //   post_nom: '',
  //   prenom: ''
  // }
  // const [selectedUser, setSelectedUser] = useState(initialUser);

  const endPoint = new EndPoint({ host: url });

  useEffect(() => {
    usersList();
  },[]);

  const usersList = () => {
    endPoint.getUsers().then((res) => {
      setUsers(res.data)
      //setSelectedUser(user.id)
    }).catch(error => {
      console.log(error)
    });
  }

  //const { matricule, nom, post_nom, prenom } = selectedUser;
  const deleteUser = (user) => {

    Alert.alert(
        "",
        `Vous allez supprimer l'utilisateur ${user.nom}`,
        [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                endPoint.deleteUser(user)
                .then(() => {
                    alert("Utilisateur supprime avec success");
                    //const index = users.findIndex(x => x.id === user.id)
                    setUsers(users.filter(us => us.id !== user.id))
                })
                .catch(error => console.log(error)) }
            }
          ],
          { cancelable: false }
    )
    // Alert.alert()
    
    
  }

  return (
    <View
    //testID={`user-${user.id}`}
    style={styles.container}
    >
        <View style={styles.table}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex: 2}}>Matricule</DataTable.Title>
                    <DataTable.Title style={{flex: 2}}>Nom</DataTable.Title>
                    <DataTable.Title style={{flex: 2}}>Post Nom</DataTable.Title>
                    <DataTable.Title style={{flex: 1}}></DataTable.Title>
                </DataTable.Header>

                {users && users.map(user => (
                    <DataTable.Row key={user.id}>
                        <DataTable.Cell style={{flex: 2}}>{user.matricule}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 2}}>{user.nom}</DataTable.Cell>
                        <DataTable.Cell style={{flex: 2}}>{user.post_nom}</DataTable.Cell>
                        {user.id !== currentUser.id && <DataTable.Cell style={{flex: 1, justifyContent: 'center'}} onPress={() => deleteUser(user)}>
                            <AntDesign name="deleteuser" size={24} color="#d9534f"  />
                          </DataTable.Cell>}
                    </DataTable.Row>
                ))}

          </DataTable>
        </View>
    </View>
  )
}

export default Users;

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
