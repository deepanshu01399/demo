import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';

const AppActivityIndicator = () => {
  return(
    <View
      style={{
        backgroundColor: '#00000000' ,

        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
    <View
      style={{
        backgroundColor: 'cyan' ,
        width:100,
        height:100,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <ActivityIndicator
        size={'large'}
        animating={true}
        color="white"
      />
      <Text style={styles.profileHeadertext}>processing...</Text>
     </View>
     </View>
  );
};

export default AppActivityIndicator;

const styles = StyleSheet.create({
  profileHeadertext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    alignContent: 'center',
    color:"white"
  },
});
