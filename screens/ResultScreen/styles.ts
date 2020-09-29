import { StyleSheet, Platform } from "react-native";
import colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 20,
    marginTop: 5,
  },
  resultReaction: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    flexWrap: "wrap",
    marginRight: 50,
  },
  resultContainer: {
    paddingHorizontal: 20,
  },
  leaderboardBtnStyle: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 8,
  },
  leaderboardText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.tintColorLight,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonStyle: {
    paddingVertical: 12,
    marginHorizontal: 20,
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
