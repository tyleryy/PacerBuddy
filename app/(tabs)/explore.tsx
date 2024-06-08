import { StyleSheet, ScrollView, SafeAreaView, View } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import SpaceMono from "@/assets/fonts/SpaceMono-Regular.ttf";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/utils/supabase";
import type { SharedValue } from "react-native-reanimated";

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

export default function TabTwoScreen() {
  const [data, setData] = useState([{}]);

  const { state, isActive } = useChartPressState({ x: 0, y: { distance: 0 } });
  const font = useFont(SpaceMono, 16);

  useEffect(() => {
    async function fetchData() {
      const res = await supabase.from("Session").select("*");
      const data = res.data[0];
      // console.log(data);
      const graphData = data.distance.map((item, i) => {
        return {
          time: i,
          distance: item,
        };
      });
      // console.log(graphData);

      // console.log(DATA);
      setData(graphData);
    }

    const channelA = supabase
      .channel("distance_updates")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Session",
        },
        (payload) => {
          const graphData = payload.new?.distance.map((item, i) => {
            return {
              time: i,
              distance: item,
            };
          });
          console.log(graphData);
          setData(graphData);
        }
      )
      .subscribe();

    fetchData();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="flex flex-col items-center justify-center">
          <View className="w-3/4 h-56 m-10 border">
            <CartesianChart
              data={data}
              xKey="time"
              yKeys={["distance"]}
              axisOptions={{ font }}
              chartPressState={state}
            >
              {({ points }) => (
                // 👇 and we'll use the Line component to render a line path.
                <>
                  <Line points={points.distance} color="red" strokeWidth={3} />
                  {isActive ? (
                    <ToolTip
                      x={state.x.position}
                      y={state.y.distance.position}
                    />
                  ) : null}
                </>
              )}
            </CartesianChart>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
