import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SecondScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello {props.route.params.name}</Text>
    </View>
  )
}

export default SecondScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    fontSize: 30
  }
});