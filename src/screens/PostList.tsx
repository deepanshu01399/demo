import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  Share,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {aboutPost} from '../models/postList';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as RootNavigation from '../navigation/RootNavigation';
import {FILE_NAMES} from '../static/Constants';
import {RESETCOMMENT} from '../redux/actionTypes';
import crashlytics from '@react-native-firebase/crashlytics';
import CommonHeader from './CommonHeader';
import {useFocusEffect} from '@react-navigation/native';

const PostList = (props: any) => {
  let backClickCount = 0;
  const [postListData, setpostlistData] = useState<any>([]);

  //   useEffect(() => {
  //     const backAction = () => {
  //         if (props.navigation.isFocused()) {
  //             Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
  //                 {
  //                     text: "Cancel",
  //                     onPress: () => null,
  //                     style: "cancel"
  //                 },
  //                 { text: "YES", onPress: () => BackHandler.exitApp() }
  //             ]);
  //             return true;
  //         }

  //     };
  //     const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
  //     return () => backHandler.remove();
  // }, [])

  // useEffect(() => {
  //   if (index == 0) {
  //       BackHandler.addEventListener('hardwareBackPress', backAction)
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', backAction);
  //   }
  // }, [index]);//inside tab navigation bhaidya chal ..

  useFocusEffect(() => {
    setpostlistData(
      props.route.params?.callFor !== 'UserPost'
        ? props.postList.data
        : props.userPostList?.data,
    );
    console.log('userpost----------',props.route.params?.callFor !== 'UserPost'
    ? props.postList.data
    : props.userPostList?.data)

    const backAction = () => {
      // Alert.alert("Hold on!", "Are you sure you want to Exit App?", [
      //     {
      //         text: "Cancel",
      //         onPress: () => null,
      //         style: "cancel"
      //     },
      //     { text: "YES", onPress: () => BackHandler.exitApp() }
      // ]);

      if (props?.route?.params?.leftIconName == 'hamburger') {
        setTimeout(() => {
          backClickCount = 0;
          console.log('exituseeffect------', backClickCount);
        }, 2000); // 2 seconds to tap second-time
        console.log('exitapp------', backClickCount);

        if (backClickCount == 0) {
          backClickCount = 1;
          ToastAndroid.show(
            'press double back btn to exit ',
            ToastAndroid.SHORT,
          );
        } else if (backClickCount == 1) BackHandler.exitApp();
      } else props.navigation.pop();
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
    
  });

  let postLimit = 10;

  function getPersonDetail(id: Number) {
    props._showProgressBar();
    props._getPerSonDetail(id);
  }

  const showComments = (id: Number, image: string) => {
    props._showProgressBar();
    props._resetComment();
    //RootNavigation.push(FILE_NAMES.POSTLIST_SCREEN,{callFor:"UserPost"});
    //props.navigation.dispatch(StackActions.push(FILE_NAMES.POSTLIST_SCREEN, {callFor:"UserPost"}))

    RootNavigation.navigate(FILE_NAMES.COMMENTLIST_SCREEN, {
      id,
      commentImage: image,
    });
  };

  const clickedOnlikeBtn = (id: number, index: number, isliked: boolean) => {
    let item = postListData[index];
    postListData[index] = {...item, isLiked: !isliked,likes:!isliked?item.likes+1:item.likes-1};

    //setpostlistData(postListData);
    setpostlistData([...postListData]);
  };

  const renderItems = (item: aboutPost, index: number) => {
    return (
      <View style={styles.constainerStyle}>
        <TouchableOpacity  onPress={() => getPersonDetail(item.owner.id)}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.profileHeaderImage}
              source={{uri: item.owner.picture}}
            />
            <Text style={styles.profileHeadertext}>
              {item.owner.title}.{item.owner.firstName} {item.owner.lastName}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.profileTagtext}>#{item.tags?.join(' #')}</Text>
        <Text style={[styles.profileTagtext,{fontSize:12}]}>{item.text}</Text>

        <TouchableOpacity
          onPress={() => {
            showComments(item.id, item.image);
          }}
          activeOpacity={.6}
          >
          <Image
            style={{
              width: '100%',
              aspectRatio: 3 / 4,
            }}
            source={{uri: item.image}}
          />
        </TouchableOpacity>
        <Text style={styles.postLikeText}>{item.likes} Likes </Text>

        <View style={styles.likeCommentShareView}>
          <TouchableOpacity
          style={{flex:1}}
            onPress={() => {
              //	crashlytics().crash();
              clickedOnlikeBtn(item.id, index, item.isLiked);
            }}>
            {item.isLiked ||item.isLiked==undefined ? (
              <View style={styles.commentItem}>
                <Icon
                  name="thumbs-up"                  
                  color={item.isLiked==undefined ?'grey':'cyan'}
                  size={25}></Icon>
                <Text style={styles.profileTagtext}>{item.isLiked==undefined?"like":"Unlike"} </Text>
              </View>
            ) : (
              <View style={styles.commentItem}>
                <Icon
                  name="thumbs-down"
                  color={'red'}
                  size={25}></Icon>
                <Text style={styles.profileTagtext}>Like </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex:1}}
            onPress={() => {
              //crashlytics().log('taps on comments...');
              showComments(item.id, item.image);
            }}>
            <View style={styles.commentItem}>
              <Icon
                name="comment"
                size={25}></Icon>
              <Text style={styles.profileTagtext}>Comment</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex:1}}
            onPress={() => {
              onShare(item.image);
            }}>
            <View style={styles.commentItem}>
              <Icon name="share" 
              //color={'cyan'}
               size={30} light />
              <Text style={styles.profileTagtext}>Share </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loadMorePost = () => {
    postLimit = postLimit + 10;
    props._getPostList(postLimit);
  };
  const onPressLeftButton = (needToShow: string) => {
    console.log('---', props.navigation);
    if (needToShow == 'hamburger') props.navigation.openDrawer();
    else props.navigation.pop();
  };

  return (
    <MainView>
      <CommonHeader
        title={'Posts'}
        isBackButton={true}
        leftButtonType={props?.route?.params?.leftIconName}
        onPressLeftButton={() =>
          onPressLeftButton(props?.route?.params?.leftIconName)
        }
        navigation={props?.navigation}
        isRightButton={props?.route?.params?.needToShowRightIcon}
        rightButtonType={'search'}
        onPressRightButton={() => {
          Alert.alert('clicked on Notification!');
        }}
      />

      <FlatList
        keyExtractor={(item, index: any) => index}
        renderItem={({item, index}) => renderItems(item, index)}
        data={postListData}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.profileHeadertext}>Loading from ...</Text>
        }
        onEndReached={loadMorePost}
      />
    </MainView>
  );
};

interface stateProps {
  //[x: string]: any;
  commonReducer: any;
  isLoading: boolean;
  error: string;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
    error: state.commonReducer.error,
    postList: state.commonReducer.postList,
    userPostList: state.commonReducer.userPostList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _getPostList: (data: Number) => dispatch(actions.getPostList(data)),
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _getPerSonDetail: (id: Number) => dispatch(actions.getPersonDetail(id)),
    _resetComment: () => dispatch({type: RESETCOMMENT}),
  };
};
const onShare = async (url: string) => {
  console.log('api mimage :', url);
  try {
    const result = await Share.share({
      title: 'Post by Dummy Api',
      message: `Just watch this post...${url}`,
      url: url,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    crashlytics().recordError(error);

    Alert.alert('Error', 'Something went wrong...');
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(PostList);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },
  profileHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    marginHorizontal: 10,
  },
  likeCommentShareView: {
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
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
    //fontFamily: 'Raaoboto',
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
});
