import { StyleSheet, Platform } from "react-native";

import colors from "../../constants/Colors";
import screen from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingTop: 10,
    marginTop: 5,
  },
  chooseDifficulty: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    color: "#444",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  categoryBox: {
    width: screen.window.width / 2.5,
    minHeight: screen.window.width / 2.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    margin: 12,
    padding: 8,
    borderColor: "transparent",
    borderWidth: 3,
    borderRadius: 8,
    shadowOpacity: 0.2,
    ...Platform.select({
      ios: {
        shadowOffset: { height: 1, width: 1 },
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  overlayBox: {
    width: screen.window.width / 2.8,
    minHeight: screen.window.width / 2.8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.5,
    backgroundColor: "black",
  },
  overlayCheck: {
    width: screen.window.width / 2.8,
    minHeight: screen.window.width / 2.8,
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    alignItems: "flex-end",
  },
  buttonStyle: {
    // padding: 12,
    flexDirection: "row",
    // backgroundColor: "#4630EB",
    // justifyContent: "center",
    alignItems: "center",
  },
  mediumButtonText: {
    color: colors.tintColorLight,
  },
  easyButtonText: {
    color: colors.light.success,
  },
  difficultButtonText: {
    color: colors.light.error,
  },
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

export default styles;
