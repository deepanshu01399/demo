/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
import RootStack from './src/navigation/RootStack';
import {store} from './src/redux/store';
import { Platform } from 'react-native';
import CodePush from 'react-native-code-push';
import { MenuProvider } from 'react-native-popup-menu';

let codePushOption = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
}

 
const App = () => {
  useEffect(()=>{
    checkForCPUpdate();

  },[])

  const codepushKeys:any = {
 
    "kPRODBASEURL": Platform.select({
      ios: '',
      android: 'TyjfSIHvi_8QdAS63hjdIdVkvgLE39TnysmOw',
    }),
    "kSTGBASEURL": Platform.select({
      ios: '',
      android: 'fLhAGT1OksP4aVENtwwsZ5QViDgQ1mQGWOcxP',
    }),
  };

  const deploymentKey = codepushKeys['kSTGBASEURL'];

  const checkForCPUpdate = () => {
    CodePush.checkForUpdate(deploymentKey)
      .then(update => {
        syncCodePush();
      })
      .catch(err => {});
  };

  const syncCodePush = (immediate: boolean = true) => {
    CodePush.sync(
      {
        deploymentKey,
         //agar bta kar karna hai aur dialog open karwana hai... mendatory or not
        updateDialog: {
          appendReleaseDescription: true,
          title: "Hey User new update is available",   
          descriptionPrefix:"DesciptionPrefix",
          mandatoryContinueButtonLabel:"mandConBtn",
          mandatoryUpdateMessage:"mandUpdate message",
          optionalIgnoreButtonLabel:"optIgnore",
          optionalInstallButtonLabel:"optInstall",
          optionalUpdateMessage:"optionUpdateMsg",   
      } ,   
      
          installMode: immediate
          ? CodePush.InstallMode.IMMEDIATE
          : CodePush.InstallMode.ON_NEXT_RESUME,
      },
      status => {
        switch (status) {
          case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log(
              `Checking for updates | immediate installation -> ${immediate} `,
            );
            break;
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('Downloading package.');
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            console.log('Installing update.');
            break;
          case CodePush.SyncStatus.UP_TO_DATE:
            console.log('Up-to-date.');
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            console.log('Update installed.');
            break;
        }
      },
    );
  };


  return (
    <Provider store={store}>
        <MenuProvider>
      <RootStack></RootStack>
      </MenuProvider>
    </Provider>
  );
};

export default CodePush(codePushOption)(App);

