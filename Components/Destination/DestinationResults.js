import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PointOfInterestResults = ({ route }) => {
  const { poiResults } = route.params;

  const openMapLink = (latitude, longitude) => {
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(mapLink);
  };

  const renderTags = (tags) => {
    return tags.map((tag, index) => (
      <View style={styles.tagContainer} key={index}>
        <Text style={styles.tagText}>{tag}</Text>
      </View>
    ));
  };

  const renderPOIItem = ({ item }) => (
    <TouchableOpacity style={styles.poiItem} onPress={() => openMapLink(item.geoCode.latitude, item.geoCode.longitude)}>
      <Text style={styles.poiName}>{item.name}</Text>
      <Text style={styles.poiCategory}>{item.category}</Text>
      <View style={styles.tagsContainer}>{renderTags(item.tags)}</View>
      <TouchableOpacity style={styles.locationIconContainer} onPress={() => openMapLink(item.geoCode.latitude, item.geoCode.longitude)}>
        <Feather name="map-pin" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={poiResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPOIItem}
        contentContainerStyle={styles.flatlistContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#162447',
  },
  flatlistContent: {
    paddingVertical: 16,
  },
  poiItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  poiName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  poiCategory: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagContainer: {
    backgroundColor: '#ebebeb',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#555',
  },
  locationIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#162447',
    borderRadius: 16,
    padding: 8,
  },
});

export default PointOfInterestResults;
