import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import MainView from '../MainView';
import iap, { Purchase, PurchaseError } from 'react-native-iap';

const items = Platform.select({
  ios: [],
  android: ['rniap_599_1m'], //recomended by revenue cart
});

const InAppPurchase = (props: any) => {
  const [purchased, setPurchased] = useState(false);
  const [products, setproducts] = useState<any>([]);
  let purchaseUpdateSubscription:any;
  let purchaseErrorSubScription:any;

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
            console.log('sub res', res);
            setproducts(res);
          });
      });
      purchaseUpdateSubscription =iap.purchaseUpdatedListener((purchase)=>setPurchased(true))
      purchaseErrorSubScription= iap.purchaseErrorListener((error)=>{
        if(!(error.responseCode)){
          Alert.alert('Error!','there is an error with your purchase,error code'+error.responseCode);
        }
      })
      return()=>{
        try{
          purchaseUpdateSubscription.remove()
        }catch(error:any){
          console.log("error while removing purchaseUpdateSubscription")
        }
        try{
          purchaseErrorSubScription.remove()
        }catch(error:any){
          console.log("error while removing purchaseErrorSubScription")
        }
        try{
          iap.endConnection();
        }catch(error:any){
          console.log("error while ending purhcase connection")
        }
        
      }
  }, []);

  return (
    <MainView>
      <View style={{flex: 1}}>
        {products.length > 0 ? (
          <View>
                      <Text> In App Purchase for v16</Text>

            {products.map((item: any) => 
              <>
                 <Button
                  key={item?.productId}
                  title={'title '+item?.productId}
                  onPress={() => {
                    iap.requestSubscription(item?.productId);
                  }}></Button>
               
              </>
            )}
             
          </View>
        ) : (
          <Text> In App Purchase</Text>
        )}
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
