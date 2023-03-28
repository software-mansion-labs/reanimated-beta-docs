import React from "react";
import { Button, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function App() {
  const r = useSharedValue(50);

  const handlePress = () => {
    r.value += 10;
  };

  const animatedProps = useAnimatedProps(() => ({
    r: withSpring(r.value),
  }));

  return (
    <View style={styles.container}>
      <Svg style={styles.svg}>
        <AnimatedCircle
          cx="50%"
          cy="50%"
          fill="#001A72"
          strokeWidth="2"
          animatedProps={animatedProps}
        />
      </Svg>

      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
    height: 300,
    top: 0,
    width: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
