import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function App() {
  const tap = Gesture.Tap()
    .onBegin(() => {
      console.log("View tapped!");
    })
    .onFinalize(() => {
      console.log("Tap finished!");
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {/* highlight-next-line */}
        <GestureDetector gesture={tap}>
          <Animated.View style={styles.circle} />
          {/* highlight-next-line */}
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
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});
