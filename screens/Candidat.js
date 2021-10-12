import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

const Candidat = (props) => {
  const { candidat } = props.route.params
  return (
    <>
      <Image
        source={{ uri: candidat.image }}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.header}>{candidat.description}</Text>
        {candidat.promotion && <Text style={styles.teaser}> {candidat.promotion}</Text>}
      </View>
    </>
  )
}

export default Candidat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  header: {
    fontSize: 30
  },
  teaser: {
    fontSize: 20
  },
  image: {
    height: 250,
    width: Dimensions.get('window').width,
  }
});