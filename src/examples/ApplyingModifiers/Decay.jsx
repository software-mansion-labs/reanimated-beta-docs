import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import { View, Button, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const OFFSET = 10;
  const TIME = 100;
  const EASING = Easing.elastic(1.5);
  const DELAY = 250;

  const handlePress = () => {
    // highlight-next-line
    offset.value = withDelay(
      DELAY,
      withSequence(
        // start from -OFFSET
        withTiming(-OFFSET, { duration: TIME / 2, easing: EASING }),
        // shake between -OFFSET and OFFSET 5 times
        withRepeat(
          withTiming(OFFSET, { duration: TIME, easing: EASING }),
          5,
          true
        ),
        // go back to 0 at the end
        withTiming(0, { duration: TIME / 2, easing: EASING })
      )
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
      <Button title="shake" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    margin: 50,
    borderRadius: 15,
    backgroundColor: "#001a72",
  },
});
