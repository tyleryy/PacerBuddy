import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { useState } from "react";

function SpeedInput({ value, setValue }) {
  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <Input
      placeholder="Enter Speed..."
      value={value}
      onChangeText={onChangeText}
      aria-labelledbyledBy="inputLabel"
      aria-errormessage="inputError"
    />
  );
}
export default SpeedInput;
