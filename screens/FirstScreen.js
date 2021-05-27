import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import axios from 'axios'
import Article from './Article'

const FirstScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([])

  const fetchArticles = async () => {
    const response = await axios.get('https://fakest-newzz.herokuapp.com/api/articles')
    setArticles(response.data.articles)
  }
  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(article) => article.id.toString()}
        renderItem={({ item }) => {
          return <Article  article={item} navigation={navigation} />
        }}
      />
    </View>
  )
}

export default FirstScreen

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
