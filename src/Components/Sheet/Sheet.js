import React from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    PixelRatio as PR
} from 'react-native';

const Sheet = ({ data, modalVisible, close }) => {
    return (
        <Modal
            visible={modalVisible}
            transparent={true} 
            animationType="fade" 
            style={styles.modalContainer}
        >
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={close} style ={{width:'100%', height:'100%', flex : 1}}>
                </TouchableOpacity>
                <View style={styles.container}>
                    <Image source={{ uri: data.avatar, width: 240, height: 280 }} style={styles.imageContainer} />
                    <Text style={styles.textContainer}>{`${data.first_name} ${data.last_name}`}</Text>
                    <Text style={styles.textContainer}>{data.email}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,1)',
        alignItems: 'center',
        paddingHorizontal: PR.getPixelSizeForLayoutSize(24) / PR.get(),
        borderWidth: 2,
        borderColor: '#b03070',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        justifyContent: 'center',
        maxHeight: Dimensions.get('window').height / 1.1,
        flex: 1.1
    },
    imageContainer: {
        borderRadius: 10,
        borderColor: '#242945',
        borderWidth: 2
      },
      textContainer: {
          fontSize: 18,
          fontFamily: 'SpaceGrotesk-Bold',
          color: 'white'
      }
})

export default Sheet;