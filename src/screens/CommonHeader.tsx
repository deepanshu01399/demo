import React from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../resources/theme';
import {commonStyling} from '../resources/styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Assets} from '../resources/Assets';
import AnimatedLottieView from 'lottie-react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {renderers} from 'react-native-popup-menu';
import {FILE_NAMES} from '../static/Constants';
const {SlideInMenu, Popover} = renderers;

const CommonHeader = (props: any) => {
  const leftButtonAssetType = () => {
    switch (props.leftButtonType) {
      case 'hamburger':
        return Assets.hanmburger;
      case 'back':
        return Assets.blueBackArrow;
      default:
        return Assets.blueBackArrow;
    }
  };

  const rightButtonAssetType = () => {
    switch (props.rightButtonType) {
      case 'search':
        return Assets.avatar;
      case 'notification':
        return Assets.notification1;
      default:
        return Assets.EditIcon;
    }
  };
  const CheckedOption = (props:any) => (
    <MenuOption value={props.value} text={(props.checked ? '\u2713 ' : '') + props.text} />
  )
  return (
    <View style={styles.containerStyle}>
      {props.isBackButton ? (
        <TouchableOpacity onPress={() => props.onPressLeftButton()}>
          <Image
            style={styles.leftButton}
            source={leftButtonAssetType()}
            resizeMode="contain"></Image>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.profileHeader}>{props.title}</Text>

      {props.isRightButton ? (
        <Menu renderer={SlideInMenu}
          onSelect={value => console.log(value)}
          //renderer={Popover}
        >
          <MenuTrigger
            children={
              <Image
                style={styles.rightButton}
                source={Assets.moreIcon}
                resizeMode="contain"></Image>
            }
           // customStyles={triggerStyles}
          />
          <MenuOptions>
          <ScrollView style={{ maxHeight: 140 }}>
            <MenuOption
              style={{borderBottomWidth:1}}
              onSelect={() =>
                props.navigation.navigate(FILE_NAMES.COMMENTLIST_SCREEN)
              }
              text="Go to Comments"
            />
          <MenuOption 
            style={{borderBottomWidth:1}}
          onSelect={() => Alert.alert(`Save`)} text="Save" />
            <MenuOption
              style={{borderBottomWidth:1}}
             onSelect={() => Alert.alert(`Delete`)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </MenuOption>

            <MenuOptions>
  <CheckedOption checked value={1} text='One' />
  <CheckedOption checked value={2} text='Two' />
</MenuOptions>

            <MenuOption
              onSelect={() => Alert.alert(`Not called`)}
              disabled={true}
              text="Disabled"
              style={{borderBottomWidth:1}}
            />
            </ScrollView>
          </MenuOptions>
        </Menu>
      ) : null}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  containerStyle: {
    flexShrink: 1,
    //justifyContent:'space-between',
    alignItems: 'center',
    height: 55,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    elevation: 2,
    shadowRadius: 2,
    backgroundColor: 'cyan',
    marginLeft: 5,
    flexDirection: 'row',
  },
  profileHeader: {
    padding: 5,
    fontFamily: '',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  leftButton: {
    width: 18,
    height: 18,
  },
  rightButton: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pickerWrapper: {
    flex: 1,
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.lightGrayColor,
    minHeight: commonStyling._fieldHeight,
    justifyContent: 'center',
    marginHorizontal: commonStyling._sideScreenSpacing,
    paddingHorizontal: commonStyling._textLeftSpacing,
  },
  commentItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    //backgroundColor: 'red',
    marginHorizontal: 10,
  },
  commentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
    //backgroundColor: 'red',
    marginHorizontal: 10,
  },
  profileHeadertext: {
    //backgroundColor: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  profileTagtext: {
    //backgroundColor: 'white',
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postLikeText: {
    //backgroundColor: 'white',
    fontSize: 12,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  profileHeaderImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  postImage: {
    height: 250,
    width: 384,
    borderRadius: 10,
  },
});
