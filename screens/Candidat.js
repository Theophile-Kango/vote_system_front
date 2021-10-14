import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

const Candidat = (props) => {
  const { candidat, nom, post_nom, prenom } = props.route.params
  return (
    <View style={styles.main}>
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
      <View style={styles.card, { backgroundColor: '#5cb85c', paddingTop: 10, marginTop: 10} }>
        <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }]}>
          VOTER
        </Text>
      </View>
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

  image: {
    width: '100%',
    height: 320
  }
});