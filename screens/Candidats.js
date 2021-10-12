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
    <TouchableOpacity
      testID={`candidat-${candidat.id}`}
      onPress={() => {
        navigation.navigate('Candidat', { candidat: candidat })
      }}
    >
      <Image
        source={{ uri: candidat.image }}
        style={styles.image}
      />
      <View style={styles.card}>
        <Text testID="title" style={styles.title}>{candidat.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Candidats;

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    padding: 7,
    paddingLeft: 10,
    paddingRight: 8,
    bottom: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 22,
    paddingBottom: 10,
    color: 'white'
  },

  image: {
    height: 250,
    width: Dimensions.get('window').width,

  }
})
