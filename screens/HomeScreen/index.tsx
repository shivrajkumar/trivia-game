import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Text, View, Image, TextInput, ScrollView, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../../components";
import { auth } from "../../services/firebaseService";

import styles from "./styles";

export default function HomeScreen({ navigation }: StackScreenProps<{}>) {
  const [playerName, setPlayerName] = React.useState("");
  const loginPlayer = () => {
    if (playerName.length) {
      auth
        .signInAnonymously()
        .then((User) => {
          if (User.user) {
            User.user
              .updateProfile({ displayName: playerName })
              .then(() => console.log("playerName added"));
          }
        })
        .catch((err) => console.log(err));
    } else {
      Alert.alert("Invalid Name!", "Please enter a valid name", [
        {
          text: "OK",
          onPress: () => {
            setPlayerName("");
          },
        },
      ]);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.contentStyle}
      >
        <Image
          source={require("../../assets/images/trivia.png")}
          style={styles.logo}
        />
        <View style={styles.paddingStyle}>
          <Text style={styles.title}>Welcome to the Trivia Challenge</Text>
          <Text style={styles.topic}>
            You will be presented with 10{" "}
            <Text style={{ color: "green" }}>True</Text> or{" "}
            <Text style={{ color: "red" }}>False</Text> questions
          </Text>
          <Text style={styles.question}>Can you score 100%?</Text>
        </View>
        <TextInput
          placeholder="Please Enter Your Name"
          value={playerName}
          onChangeText={(name) => {
            setPlayerName(name);
          }}
          style={styles.inputStyle}
        />
        <Button text="Let's Begin" onPress={() => loginPlayer()} />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
