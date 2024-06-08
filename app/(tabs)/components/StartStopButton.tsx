import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

function StartStopButton({ startState, setter }) {
  return (
    <>
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
    </>
  );
}

export default StartStopButton;
