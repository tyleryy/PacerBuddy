import { Pedometer } from "expo-sensors";
import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { CartesianChart, Line, useChartPressState, Area } from "victory-native";
import { useEffect, useState } from "react";
import { useFont } from "@shopify/react-native-skia";
import SpaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { Text } from "@/components/ui/text";

export default function StepTracker() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [DATA, setDATA] = useState([{ x: 0, y: 0 }]);
  const font = useFont(SpaceMono, 16);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setDATA((prev) => {
          return [...prev, { x: prev.length, y: result.steps }];
        });
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription?.remove();
  }, []);

  return (
    <View className="">
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <View className="w-3/4 h-56 border border-black dark:text-white dark:border-white ">
        <Text className="text-lg">Steps Taken over Time</Text>
        <CartesianChart
          data={DATA}
          xKey="x"
          yKeys={["y"]}
          axisOptions={{ font }}
        >
          {({ points, chartBounds }) => (
            //👇 pass a PointsArray to the Line component, y0, as well as options.
            <Line
              points={points.y}
              color="green"
              animate={{ type: "timing", duration: 300 }}
              strokeWidth={3}
            />
          )}
        </CartesianChart>
      </View>
    </View>
  );
}
