import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const duration = 1800;

export default function App() {
  const defaultAnim = useSharedValue(200);
  const linear = useSharedValue(200);

  const animatedDefault = useAnimatedStyle(() => ({
    transform: [{ translateX: defaultAnim.value }],
  }));
  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: linear.value }],
  }));

  React.useEffect(() => {
    const run = () => {
      linear.value = withTiming(-linear.value, {
        duration,
        easing: Easing.linear,
      });
      defaultAnim.value = withTiming(-defaultAnim.value, {
        duration,
      });
    };
    run();
    const id = setInterval(run, duration * 2);

    return () => clearInterval(id);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedDefault]}>
        <Text style={styles.text}>inout</Text>
      </Animated.View>
      <Animated.View style={[styles.box, animatedChanged]}>
        <Text style={styles.text}>linear</Text>
      </Animated.View>
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
    height: 80,
    width: 80,
    margin: 20,
    borderWidth: 1,
    borderColor: "#001A72",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#001A72",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
