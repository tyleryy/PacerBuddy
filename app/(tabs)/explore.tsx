import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { CartesianChart, Line, useChartPressState, Area } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import SpaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/supabase";
import type { SharedValue } from "react-native-reanimated";
import StepTracker from "@/components/StepTracker";
import DistanceTracker from "@/components/DistanceTracker";

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function TabTwoScreen() {
  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex flex-col items-center justify-center">
          <DistanceTracker />
          <View>
            <StepTracker />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
