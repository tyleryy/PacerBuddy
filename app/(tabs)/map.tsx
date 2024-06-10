import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";

import { Platform, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
      setLocation(location);
    })();
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }
  return (
    <View style={styles.container}>
      {!location ? (
        <Text>{errorMsg}</Text>
      ) : (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          // cameraZoomRange={{
          //   minCenterCoordinateDistance: 0,
          //   maxCenterCoordinateDistance: 5,
          // }}
          minZoomLevel={15}
          showsCompass={true}
          showsTraffic={true}
          mapType="terrain"
          loadingEnabled={true}
          // initialRegion={{
          //   latitude: location.coords.latitutde,
          //   longitude: location.coords.longitude,
          //   latitudeDelta: 0.0001,
          //   longitudeDelta: 0.0001,
          // }}
        />
      )}
    </View>
  );
}
