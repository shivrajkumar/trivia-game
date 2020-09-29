import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
} from "react-native";

import colors from "../constants/Colors";

interface Props extends TouchableOpacityProps {
  text: string;
}

export default function Loader(props: Props) {
  const { text, onPress, ...rest } = props;
  return (
    <TouchableOpacity
      {...rest}
      style={styles.mainButtonStyle}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginLeft: 4,
  },
  mainButtonStyle: {
    marginHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: colors.tintColorLight,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
