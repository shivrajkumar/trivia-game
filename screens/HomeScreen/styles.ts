import { StyleSheet, Platform } from "react-native";
import colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  contentStyle: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    paddingHorizontal: 20,
  },
  paddingStyle: {
    // paddingHorizontal: 20,
  },
  logo: {
    height: 240,
    width: 240,
    left: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  topic: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
    fontWeight: "600",
    color: "#333",
  },
  question: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#444",
  },
  inputStyle: {
    height: 45,
    alignSelf: "stretch",
    borderBottomWidth: 1,
    borderColor: colors.tintColorLight,
    borderRadius: 8,
    margin: 20,
    paddingHorizontal: 8,
  },
  buttonStyle: {
    paddingVertical: 12,
    backgroundColor: colors.tintColorLight,
    borderRadius: 8,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
});

export default styles;
