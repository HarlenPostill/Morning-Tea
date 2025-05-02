import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface StorageItem {
  key: string;
  value: string;
}

export const AsyncStorageViewer = () => {
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);
  const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
  const [editedValue, setEditedValue] = useState('');

  const getAllStorageItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      const formattedItems = items.map(([key, value]) => ({
        key,
        value: value || 'null',
      }));
      setStorageItems(formattedItems);
    } catch (error) {
      console.error('Error fetching AsyncStorage items:', error);
    }
  };

  useEffect(() => {
    getAllStorageItems();
    const interval = setInterval(getAllStorageItems, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (item: StorageItem) => {
    setEditingItem(item);
    setEditedValue(item.value);
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      await AsyncStorage.setItem(editingItem.key, editedValue);
      setEditingItem(null);
      setEditedValue('');
      getAllStorageItems();
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleDelete = async (key: string) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem(key);
            getAllStorageItems();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete item');
          }
        },
      },
    ]);
  };

  const handleDeleteAll = () => {
    Alert.alert(
      'Confirm Delete All',
      'Are you sure you want to delete all items? This cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              getAllStorageItems();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete all items');
            }
          },
        },
      ]
    );
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditedValue('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AsyncStorage Contents</Text>
      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={() => handleDeleteAll()}>
        <Text style={styles.buttonText}>Delete All</Text>
      </TouchableOpacity>
      <Text>(reboot app to see any changes saved)</Text>
      <ScrollView style={styles.scrollView}>
        {storageItems.map(item => (
          <View key={item.key} style={styles.itemContainer}>
            {editingItem?.key === item.key ? (
              // Editing mode
              <View style={styles.editContainer}>
                <Text style={styles.itemKey}>{item.key}</Text>
                <TextInput
                  style={styles.editInput}
                  value={editedValue}
                  onChangeText={setEditedValue}
                  multiline
                />
                <View style={styles.editButtons}>
                  <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // View mode
              <View>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemKey}>{item.key}</Text>
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => handleEdit(item)}>
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleDelete(item.key)}>
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.itemValue}>
                  {item.value.length > 50 ? `${item.value.substring(0, 50)}...` : item.value}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 200,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemKey: {
    fontWeight: 'bold',
    flex: 1,
  },
  itemValue: {
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editContainer: {
    width: '100%',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    minHeight: 60,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#4a90e2',
  },
  deleteButton: {
    backgroundColor: '#e25c5c',
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
});
