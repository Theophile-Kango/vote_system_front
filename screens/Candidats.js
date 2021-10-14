import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

const Candidats = ({ candidat, navigation }) => {
  return (
    <View
      testID={`candidat-${candidat.id}`}
      style={styles.container}
    >
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
            style={styles.title
          }>
            {candidat.description.split('').slice(0, 20).join("")}...
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
