import React from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native';

const Error = ({message}) => {
  return (
    <>
        <Text style={styles.error}>{message}</Text>
    </>
  )
}

export default Error;

const styles = StyleSheet.create({
  error: {
    color: '#fff', 
    backgroundColor: '#d9534f', 
    textAlign: 'center', 
    textAlignVertical: 'center',
    width: '90%',
    height: 55,
    marginBottom: 10,
    marginTop: 10,
  }
})
