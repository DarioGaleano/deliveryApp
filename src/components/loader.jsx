import React, { Component } from 'react';
import { StyleSheet,  View, Modal, ActivityIndicator, Image, Text} from 'react-native';

const Loader = props => {
  const {
    loading,
    message,
    ...attributes
  } = props;
  
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="red" />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: "100" + "%",
    width: "100" + "%",
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default Loader;