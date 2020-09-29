import { StyleSheet, Platform } from "react-native";

import colors from "../../constants/Colors";
import screen from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    backgroundColor: "#FFF",
  },
  chooseDifficulty: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  tableStyle: {
    flex: 1,
    marginHorizontal: 20,
  },
  tableCellStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: "800",
  },
  headerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#CCC",
  },
  playerNameStyle: {
    flex: 2,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: colors.tintColorLight,
  },
  rankStyle: {
    flex: 1,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "900",
    color: colors.tintColorLight,
  },
  scoreStyle: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "800",
    color: colors.tintColorLight,
  },
  SelectText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    paddingVertical: 8,
  },
  emptyComponent: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: 40,
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
