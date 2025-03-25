/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, ImageBackground, Image } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getDetail } from '../../api/RestaurantEndpoints'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandSecondary } from '../../styles/GlobalStyles'
import ImageCard from '../../components/ImageCard'

export default function RestaurantDetailScreen ({ route }) {
  const { id } = route.params
  const [restaurant, setRestaurants] = useState([])

  const renderHeader = () => {
    return (
      <ImageBackground source={(restaurant.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
        <View style={styles.restaurantHeaderContainer}>
            <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
            <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
            <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
        </View>
      </ImageBackground>
    )
  }

  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurants(getDetail(id))
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])
  /*
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
    */

  const renderProductWithImage = ({ item }) => {
    return (
      <ImageCard
        style={styles.row}
        imageUri={item.image ? { uri: process.env.API_BASE_URL + '/' + item.image } : restaurant.logo}
        title={item.name}
      >
        <TextRegular numberOfLines={2}>{item.description}</TextRegular>
        <TextSemiBold>Price: <TextSemiBold style={{ color: brandPrimary }}>{item.price}€</TextSemiBold></TextSemiBold >
      </ImageCard>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={restaurant.products}
        renderItem={renderProductWithImage}
        ListHeaderComponent={renderHeader}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})
