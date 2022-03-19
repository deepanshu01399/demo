import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../redux/actionCreatorsTs';
import MainView from './MainView';
import {commentOwner, CommentsData} from '../models/commentList';

const Comments = (props: any) => {
  const commentList = props?.commentList?.data ?? [];
  let commentImage = props.route.params.commentImage;

  useEffect(() => {
    props._showProgressBar();
    props._getCommentList(props.route.params.id);
  }, []);

  function getPersonDetail(id: Number) {
    props._showProgressBar();
    props._getPerSonDetail(id);
  }

  const renderItems = (item: commentOwner, index: number) => {
    return (
      <View style={styles.constainerStyle}>
        <TouchableOpacity onPress={() => getPersonDetail(item.owner.id)}>
          <View style={styles.profileHeader}>
            <Image
              style={styles.profileHeaderImage}
              source={{uri: item.owner.picture}}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.commentSection}>
          <Text style={styles.profileHeadertext}>
            {item.owner.title}.{item.owner.firstName} {item.owner.lastName} by codepushed
          </Text>
          <Text style={styles.postLikeText}>{item.message} </Text>
        </View>
      </View>
    );
  };
  return (
    <MainView>
      <View style={{flexDirection: 'column'}}>
        <Image
          style={styles.postImage}
          source={{
            uri: commentImage,
          }}
        />
        {typeof commentList != 'undefined' &&
        commentList != null &&
        commentList.length != null &&
        commentList.length > 0 ? (
          <FlatList
            keyExtractor={(item, index: any) => index}
            renderItem={({item, index}) => renderItems(item, index)}
            data={commentList}
            showsVerticalScrollIndicator={false}         
          />
        ) : (
          props.isLoading?
          
          <Text style={styles.nodataTxt}>Data Loading...</Text>:
          <Text style={styles.nodataTxt}>No comment til now...</Text>
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
    commentList: state.commonReducer.commentList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    _showProgressBar: () => dispatch(actions.showProgressBar()),
    _getPerSonDetail: (id: Number) => dispatch(actions.getPersonDetail(id)),
    _getCommentList: (id: Number) => dispatch(actions.getCommentList(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },
  commentSection: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    marginVertical: 3,
    marginEnd: 3,
    borderRadius: 10,
  },
  profileHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  profileHeadertext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    alignContent: 'center',
  },
  nodataTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    alignContent: 'center',
  },
  profileTagtext: {
    fontSize: 13,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  postLikeText: {
    fontSize: 12,
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'grey',
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
