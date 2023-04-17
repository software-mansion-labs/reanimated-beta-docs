import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import React from "react";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function BouncingBoxExample() {
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(0)
    .onChange((event) => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]}></Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
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
    cursor: "grab",
  },
});
