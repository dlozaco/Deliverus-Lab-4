/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { API_BASE_URL } from '@env'
import { getDetail } from '../../api/RestaurantEndpoints'

export default function RestaurantDetailScreen({ route }) {
  const { id } = route.params
  const [restaurants, setRestaurants] = useState({})

  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurants(getDetail(id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])

  const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
          <TextRegular>
            {item.name}
          </TextRegular>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <TextRegular style={{ fontSize: 16, alignSelf: 'center', margin: 20 }}>Restaurant details. Id: {id}</TextRegular>
      <TextRegular style={styles.textTitle}>{restaurants.name}</TextRegular>
            <TextRegular style={styles.text}>{restaurants.description}</TextRegular>
            <TextRegular style={styles.text}>shippingCosts: {restaurants.shippingCosts}</TextRegular>
            <FlatList
              style={styles.container}
              data={restaurants.products}
              renderItem={renderProduct}
              keyExtractor={item => item.id.toString()}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
