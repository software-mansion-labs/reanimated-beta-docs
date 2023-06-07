import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  cancelAnimation,
  InterpolateConfig,
  withTiming,
  InterpolationOptions,
} from "react-native-reanimated";
import ColorSpace from "./index";

interface Props {
  baseOptions: InterpolateConfig;
  interpolationOptions: InterpolationOptions;
}

const initialProgress = 0;

export default function App({ baseOptions, interpolationOptions }: Props) {
  const progress = useSharedValue(initialProgress);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [baseOptions.outputRange[0], baseOptions.outputRange[1]],
        ColorSpace[baseOptions.colorSpace],
        interpolationOptions
      ),
    };
  });

  useEffect(() => {
    cancelAnimation(progress);

    progress.value = initialProgress;
  }, [baseOptions]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyle]} />
      <Button
        onPress={() => {
          progress.value = withTiming(1 - progress.value, { duration: 1000 });
        }}
        title="run animation"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 20,
    marginVertical: 64,
  },
});
