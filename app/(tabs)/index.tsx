import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  SafeAreaView,
  View,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import StartStopButton from "./components/StartStopButton";
import { useState } from "react";
export default function HomeScreen() {
  const [start, setStart] = useState(true);
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-screen w-screen flex flex-col items-center justify-center">
          <StartStopButton startState={start} setter={setStart} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
