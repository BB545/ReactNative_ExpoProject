import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const MyButton = () => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#3498db',
                padding: 16,
                margin: 10,
                borderRadius: 8,
            }}
            onPress={() => alert('Click')}
        >
            <Text style={{ color: 'white', fontSize: 24 }}>My Button</Text>
        </TouchableOpacity>
    )
}

export default MyButton