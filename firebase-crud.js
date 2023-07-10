import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { firebase, firestore } from './config';

export default function Fetch() {
  const [users, setUsers] = useState([]);
  const todoRef = firebase.firestore().collection('Todo');

  // Function to Add Data to Firebase Firestore
  const addDataToFirestore = async (data) => {
    try {
      const collectionRef = firestore.collection('Todo');
      await collectionRef.add(data);
      console.log('Data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const newData = {
    name: 'xyz',
    age: 25,
    email: 'xyz@gmail.com',
  };

  useEffect(() => {
    addDataToFirestore(newData);
    fetchData();

    return () => {
      unsubscribeSnapshot(); // Clean up the snapshot listener
    };
  }, []);

  // Function to Fetch Data from Firebase Firestore
  const fetchData = () => {
    const unsubscribeSnapshot = todoRef.onSnapshot((querySnapshot) => {
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

  //Function to update Data from Firebase Firestore
  const handleUpdate = async (id, newText) => {
    try {
      await todoRef.doc(id).update({ text: newText });
      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  // Function to Delete Data from Firebase Firestore
  const handleDelete = async (id) => {
    try {
      await todoRef.doc(id).delete();
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
