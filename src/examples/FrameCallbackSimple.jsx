import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  runOnJS,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

export default function App() {
  const fps = useSharedValue(0);
  const [text, setText] = React.useState(fps.value);

  // highlight-start
  useFrameCallback((frameInfo) => {
    const { timeSincePreviousFrame } = frameInfo;

    if (timeSincePreviousFrame != null) {
      runOnJS(setText)(Math.round(1000 / timeSincePreviousFrame));
    }
  });
  // highlight-end

  return (
    <View style={styles.container}>
      <Text style={styles.label}>FPS: {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    marginVertical: 16,
    color: "#b58df1",
    fontWeight: "bold",
  },
});
