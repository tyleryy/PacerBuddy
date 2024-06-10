import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import StartStopButton from "../../components/StartStopButton";
import SpeedInput from "@/components/SpeedInput";
import { useState, useEffect } from "react";

import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function HomeScreen() {
    const [start, setStart] = useState(true);
    const [pace, setPace] = useState("");

    const showToastError = () => {
        Toast.show({
            type: "error",
            text1: "Rover Stopped 🛑",
        });
    };

    const showToastSuccess = () => {
        Toast.show({
            type: "success",
            text1: "Rover Started 🚀",
        });
    };

    useEffect(() => {}, [start]);

    async function StartRover() {
        await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/startrover`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pace: parseInt(pace) }),
        });
        showToastSuccess();
    }

    async function KillRover() {
        console.log(process.env.EXPO_PUBLIC_API_BASE_URL);
        await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/killrover`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pace: parseInt(pace) }),
        });
        showToastError();
    }

    return (
        <SafeAreaView className="h-full">
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="h-screen w-screen flex flex-col px-5 items-center justify-center gap-5">
                    <View className="min-w-3/4">
                        <SpeedInput value={pace} setValue={setPace} />
                    </View>
                    <View className="min-w-1/2">
                        {!start ? (
                            <Button
                                variant="outline"
                                className="bg-red-500 hover:bg-red-600"
                                onPress={() => {
                                    setStart(true);
                                    KillRover();
                                }}
                            >
                                <Text>Stop</Text>
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                className="bg-green-500"
                                onPress={() => {
                                    setStart(false);
                                    StartRover();
                                }}
                            >
                                <Text>Start</Text>
                            </Button>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
