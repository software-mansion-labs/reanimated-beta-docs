import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const initialOffset = 200;

export default function App() {
  const offset = useSharedValue(initialOffset);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const handlePress = () => {
    offset.value = withSpring(offset.value * -1);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
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
    width: 100,
    backgroundColor: "#001A72",
    borderRadius: 20,
    marginVertical: 64,
  },
  next: {},
  previous: {},
});
