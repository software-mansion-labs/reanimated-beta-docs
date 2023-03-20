import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

const initialOffset = 200;
const duration = 800;

export default function App() {
  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  React.useEffect(() => {
    const id = setInterval(() => {
      offset.value = withSequence(
        withTiming(-initialOffset, { duration, easing: Easing.cubic }),
        withTiming(0, { duration, easing: Easing.cubic }),
        withTiming(initialOffset, { duration, easing: Easing.cubic })
      );
    }, duration * 3);
    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#001A72",
    borderRadius: 20,
  },
});
