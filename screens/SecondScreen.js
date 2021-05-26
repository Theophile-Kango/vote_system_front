import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

const SecondScreen = (props) => {
  const { article } = props.route.params
  return (
    <>
      <Image
        source={{ uri: article.image }}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.header}>{article.title}</Text>
        <Text style={styles.teaser}> {article.teaser}</Text>
      </View>
    </>
  )
}

export default SecondScreen

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