```jsx
import Animated from "react-native-reanimated";
import { View, Button, StyleSheet } from "react-native";
import React from "react";

export default function App() {
  const handlePress = () => {};

  return (
    <View style={styles.container}>
      <Animated.View style={styles.box} />
      <Button title="start" onPress={handlePress} />
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
```
