import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addReply, comment} from '../store/userSlice';
import {users} from '../store/userSlice';
import {changeCurrentUser, addPost} from '../store/userSlice';
import CommentCard from './CommentCard';
const Comments = ({goBack = () => {}}) => {
  const selector = useSelector(state => state.user);
  const [posts, setPosts] = useState<[]>([]);
  const [text, setText] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<comment>();
  const dispatch = useDispatch();

  useEffect(() => {
    // const userPosts = selector.posts?.map(item => {
    //   if (item.user == selector.currentUser) {
    //     console.log(item.posts);
    //     setPosts(item.posts);
    //     return;
    //   }
    // });
    let localposts = [];
    Object.keys(selector.data).map(key => {
      Object.keys(selector.data[key].posts).map(item => {
        localposts.push(selector.data[key].posts[item]);
      });
    });
    setPosts(localposts);
  }, [selector]);

  const changeUser = () => {
    let user;
    if (selector.currentUser == users[0]) {
      user = users[1];
    } else {
      user = users[0];
    }
    dispatch(changeCurrentUser(user));
  };

  const AddPost = (text: string = '') => {
    if (text.length) {
      dispatch(addPost(text));
      setText('');
    } else {
      Alert.alert('Error', 'Please Enter Text');
    }
  };
  const AddReply = () => {
    if (selectedPost && text.length) {
      const payload = {
        user: selectedPost?.author,
        id: selectedPost?.id,
        text: text,
      };
      dispatch(addReply(payload));
      setText('');
    } else {
      Alert.alert('error');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text
        onPress={goBack}
        style={{color: 'blue', paddingLeft: 10, paddingTop: 10}}>
        Go Back
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text onPress={changeUser} style={{color: 'blue'}}>
          Change User
        </Text>
        <Text>
          current user -{' '}
          <Text style={{fontWeight: '800'}}> {selector.currentUser}</Text>
        </Text>
      </View>
      <View style={{width: '100%', borderWidth: 2}} />
      <FlatList
        data={posts}
        renderItem={item => {
          return (
            <CommentCard
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              comment={item.item}
            />
          );
        }}
      />
      <View
        style={{
          width: '90%',
          height: 70,
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: 'center',
          marginVertical: 10,
          padding: 5,
          flexDirection: 'row',
        }}>
        <TextInput
          style={{flex: 5}}
          numberOfLines={1}
          maxLength={30}
          value={text}
          onChangeText={text => setText(text)}
          placeholder="Add Reply"
        />
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'blue',
            borderRadius: 10,
            alignItems: 'center',
          }}
          onPress={AddReply}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: '500'}}>
            Add Reply
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'blue',
            borderRadius: 10,
            alignItems: 'center',
            marginHorizontal: 5,
          }}>
          <Text
            onPress={() => AddPost(text)}
            style={{color: 'white', textAlign: 'center', fontWeight: '500'}}>
            Add Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Comments;
