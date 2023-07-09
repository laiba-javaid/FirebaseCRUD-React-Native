import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { firebase } from './config';

export default function Fetch() {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection('Todo');

  useEffect(() => {
    /* const fetchData = async () => {
      try {
        const querySnapshot = await todoRef.get();
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          heading: doc.data().heading,
          text: doc.data().text,
        }));
        setUsers(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    //fetchData();
  }, []); */


  fetchData();
  }, []);

  const fetchData = async () => {
    todoRef.onSnapshot((querySnapshot) => {
      const updatedUsers = [];
      querySnapshot.forEach((doc) => {
        const { heading, text } = doc.data();
        updatedUsers.push({
          id: doc.id,
          heading,
          text,
        });
      });
      setUsers(updatedUsers);
    });
  };

  const handleUpdate = async (id
    , newText) => {
    try {
      await todoRef.doc('4DqdKITSNKiEGUGJ6xXi'
        ).update({ text: 'React Native is an open-source framework for building cross-platform mobile applications using JavaScript and React' });
      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await todoRef.doc('XoWb6gGcVFFiEEYQziiJ').delete();
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <FlatList
        style={{ height: '100%' }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.heading}</Text>
              <Text style={styles.itemText}>{item.text}</Text>
              <Pressable onPress={() => handleUpdate(item.id, 'Updated Text')}>
                <Text style={styles.button}>Update</Text>
              </Pressable>
              <Pressable onPress={() => handleDelete(item.id)}>
                <Text style={styles.button}>Delete</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemHeading: {
    fontWeight: 'bold',
  },
  itemText: {
    fontWeight: '300',
  },
  button: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
