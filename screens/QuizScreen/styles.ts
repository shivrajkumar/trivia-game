import { StyleSheet, Platform } from "react-native";
import colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 20,
    paddingVertical: 60,
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
  progress: {
    marginVertical: 20,
    alignSelf: "center",
  },
  points: {
    textAlign: "center",
    color: "#7591af",
    fontSize: 28,
    fontWeight: "500",
  },
});

export default styles;
