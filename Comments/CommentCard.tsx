import React, {useState} from 'react';
import {FlatList, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {comment} from '../store/userSlice';
interface ICommentCard {
  comment: comment;
  selectedPost: Number;
  setSelectedPost: Function;
}
const CommentCard = ({
  comment,
  selectedPost,
  setSelectedPost,
}: ICommentCard) => {
  const [replyVisible, setReplyVisible] = useState(false);

  const showReply = () => {
    setReplyVisible(visible => !visible);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(comment.id, selectedPost);
        setSelectedPost(comment);
      }}
      style={{
        width: '80%',
        minHeight: 80,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        alignSelf: 'center',
        marginVertical: 10,
        borderColor: selectedPost?.id == comment.id ? 'blue' : 'black',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text numberOfLines={1}>{comment.text}</Text>
          <Text
            onPress={showReply}
            style={{color: comment?.replies?.length ? 'blue' : 'black'}}>
            {!replyVisible ? 'show' : 'hide'} replies -{' '}
            {comment?.replies?.length}
          </Text>
        </View>
        <Text numberOfLines={1}>@{comment.author}</Text>
      </View>
      {replyVisible && (
        <FlatList
          data={comment?.replies}
          renderItem={item => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  alignSelf: 'center',
                }}>
                <Text>{item.item.text}</Text>
                <Text>{item.item.author}</Text>
              </View>
            );
          }}
        />
      )}
    </TouchableOpacity>
  );
};
export default CommentCard;
