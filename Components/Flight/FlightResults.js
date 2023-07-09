import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FlightResultsScreen = ({ route }) => {
  const { flightOffers } = route.params;
  console.log(flightOffers);

  const renderFlightOffer = ({ item }) => {
    const { id, price, itineraries } = item;
    const { total, currency } = price;

    return (
      <View style={styles.flightOffer}>
        <Text style={styles.offerText}>Offer ID: {id}</Text>
        <Text style={styles.offerText}>Total Price: {total} {currency}</Text>
        {/* <Text style={styles.offerText}>Tickets Available: {numberOfBookableSeats}</Text> */}
        {itineraries.map((itinerary, index) => (
          <View key={index} style={styles.itinerary}>
            <Text style={styles.itineraryText}>Itinerary {index + 1}</Text>
            <Text style={styles.itineraryText}>Duration: {itinerary.duration}</Text>
            {itinerary.segments.map((segment, index) => (
              <View key={index} style={styles.segment}>
                <Text style={styles.segmentText}>Segment {index + 1}</Text>
                <Text style={styles.segmentText}>Departure: {segment.departure.iataCode}</Text>
                <Text style={styles.segmentText}>Arrival: {segment.arrival.iataCode}</Text>
                <Text style={styles.segmentText}>Departure Time: {segment.departure.at}</Text>
                <Text style={styles.segmentText}>Arrival Time: {segment.arrival.at}</Text>
                <Text style={styles.segmentText}>Departure Terminal: {segment.departure.terminal}</Text>
                <Text style={styles.segmentText}>Arrival Terminal: {segment.arrival.terminal}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Offers</Text>
      <FlatList
        data={flightOffers}
        renderItem={renderFlightOffer}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    width: '80%',
  },
  flightOffer: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 16,
    marginBottom: 8,
  },
  itinerary: {
    marginTop: 16,
  },
  itineraryText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  segment: {
    marginLeft: 16,
  },
  segmentText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default FlightResultsScreen;
