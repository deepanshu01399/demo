import React, {useEffect, useState} from 'react';
import {Button, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import MainView from '../MainView';
import iap from 'react-native-iap';

const items = Platform.select({
  ios: [],
  android: ['rniap_599_1m'], //recomended by revenue cart
});

const InAppPurchase = (props: any) => {
  const [purchase, setPurchase] = useState(false);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    //it take a callback fun and a dependency array as an argument inside useeffect fun
    iap
      .initConnection()
      .catch(() => {
        console.log('error connecting to store');
      })
      .then(() => {
        iap
          .getSubscriptions(items ?? [])
          .catch(() => {
            console.log('error in finding items');
          })
          .then(res => {
            console.log('sub res:', res);
            setproducts(res);
          });
      });
  }, []);

  return (
    <MainView>
      <View style={{flex: 1}}>
        {products.length > 0 ? 
        <View>
          {products.map((item)=>{
          
            <Button key={item['productId']} title={item['title']} onPress={() => { iap.requestSubscription(item['productId']); } }></Button>
          })}
          </View>
          :
           <Text> in App purchase</Text>
           }

      </View>
        
    </MainView>
  );
};

interface stateProps {
  commonReducer: any;
  isLoading: boolean;
  error: string;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
    error: state.commonReducer.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(InAppPurchase);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },
});
