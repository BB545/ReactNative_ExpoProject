import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ClassStyle = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Class Styling - Text</Text>
        <Text style={styles.error}>Class Styling - Error</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        padding: 10,
        fontSize: 26,
        fontWeight: '600',
        color: 'black',
    },
    error: {
        padding: 10,
        fontSize: 26,
        fontWeight: '400',
        color: 'red',
    }
})

export default ClassStyle