import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// hack, Gesture.Pan doesn't rerender on window resize for some reason
const store = { width: 0 };
const SIZE = 120;

export default function App() {
  const offset = useSharedValue(0);
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  store.width = width;

  const setWrapperWidth = () => {
    setWidth(ref?.current?.clientWidth);
  };

  useEffect(() => {
    setWrapperWidth();
    window.addEventListener("resize", setWrapperWidth);
    return () => {
      window.removeEventListener("resize", setWrapperWidth);
    };
  }, []);

  const pan = Gesture.Pan()
    .onChange((event) => {
      offset.value += event.changeX;
    })
    .onFinalize((event) => {
      // highlight-start
      offset.value = withDecay({
        velocity: event.velocityX / 1000,
        clamp: [-(store.width / 2) + SIZE / 2, store.width / 2 - SIZE / 2],
        rubberBandEffect: true,
      });
      // highlight-end
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={ref} style={styles.wrapper}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
  wrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    cursor: "grab",
    alignItems: "center",
    justifyContent: "center",
  },
});
