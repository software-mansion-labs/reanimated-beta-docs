import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { StyleSheet, View } from "react-native";
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

const SIZE = 120;

export default function App() {
  const offset = useSharedValue(0);
  const ref = useRef(null);

  const [width, setWidth] = useState(0);

  console.log(width);

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
      offset.value = withDecay({
        velocity: event.velocityX,
        clamp: [-200, 200],
      });
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
    border: "1px solid red",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: SIZE,
    width: SIZE,
    backgroundColor: "#001A72",
    borderRadius: 20,
    cursor: "grab",
  },
});