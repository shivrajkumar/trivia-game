import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Feather as FIcon, Ionicons as Icon } from "@expo/vector-icons";

import { auth } from "../services/firebaseService";

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header(props: Props) {
  const playerName = auth.currentUser?.displayName;
  const { title, onBack } = props;
  const showAlert = () => {
    Alert.alert(
      "Want to Sign Out?",
      `${playerName}`,
      [
        {
          text: "No",
          onPress: () => console.log("Close Alert"),
        },
        {
          text: "Yes",
          onPress: () => {
            auth.signOut();
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {onBack && (
          <TouchableOpacity style={styles.backBtnStyle} onPress={onBack}>
            <Icon name="md-arrow-back" size={23} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.userBtnStyle} onPress={showAlert}>
          <FIcon name="user" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: Platform.OS === "android" ? 60 : 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: { elevation: 5 },
    }),
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 3,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "800",
  },
  userBtnStyle: {
    padding: 16,
  },
  backBtnStyle: {
    padding: 16,
  },
});
