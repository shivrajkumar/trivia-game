import * as React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import colors from "../constants/Colors";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.tintColorLight} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
