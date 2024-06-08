import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { View } from "react-native";

function StartStopButton({ startState, setter }) {
  return (
    <View className="min-w-1/2">
      {!startState ? (
        <Button
          variant="outline"
          className="bg-red-500"
          onPress={() => setter(true)}
        >
          <Text>Stop</Text>
        </Button>
      ) : (
        <Button
          variant="outline"
          className="bg-green-500"
          onPress={() => setter(false)}
        >
          <Text>Start</Text>
        </Button>
      )}
    </View>
  );
}

export default StartStopButton;
