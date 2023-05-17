import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Animated, {
  measure,
  runOnJS,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function App() {
  const aref = useAnimatedRef();
  const width = useSharedValue(100);
  const [text, setText] = React.useState(width.value);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  // highlight-start
  useAnimatedReaction(
    () => width.value,
    () => {
      const measurement = measure(aref);

      if (measurement !== null) {
        const measuredWidth = parseInt(measurement.width, 10);
        runOnJS(setText)(measuredWidth);
      }
    }
  );
  // highlight-end

  return (
    <View style={styles.container}>
      <Animated.View ref={aref} style={{ ...styles.box, width }} />
      <Text style={styles.label}>Width: {text}</Text>
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  box: {
    height: 100,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
  label: {
    fontSize: 24,
    marginVertical: 16,
  },
});
