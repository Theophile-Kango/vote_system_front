import React from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native';

const Success = ({message}) => {
  
  return (
    <>
        <Text style={styles.error}>{message}</Text>
    </>
  )
}

export default Success;

const styles = StyleSheet.create({
  error: {
    color: '#fff', 
    backgroundColor: '#5cb85c', 
    textAlign: 'center', 
    textAlignVertical: 'center',
    width: '90%',
    height: 55,
    marginBottom: 10,
    marginTop: 10,
  }
})