import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Animated,
  FlatList,
} from "react-native";
import Emoji from "react-native-emoji";
import { Entypo as Icon } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";

import { Header, Button } from "../../components";

import { emojiSelector } from "../../utils/algo";

import colors from "../../constants/Colors";

import styles from "./styles";

const Answers = ({ data }) => {
  console.log(data.question, "data.question");
  const emoji = data.correct ? "check" : "cross";
  const color = data.correct ? colors.light.success : colors.light.error;
  return (
    <View style={styles.questionContainer}>
      <Icon name={emoji} size={45} color={color} />
      <View style={{ flexWrap: "wrap" }}>
        <HTMLView
          value={`<p>${data.question}</p>`}
          stylesheet={{
            p: styles.question,
          }}
        />
      </View>
    </View>
  );
};

export default function ResultScreen({
  route,
  navigation,
}: StackScreenProps<{}>) {
  const emojiAnim = React.useRef(new Animated.Value(0)).current;
  const { resultScore, maxScore, answeredQuestion }: any = route.params;
  let scorePercentage = Math.ceil((resultScore / maxScore) * 100);
  let emoji = emojiSelector(scorePercentage);
  Animated.spring(emojiAnim, {
    toValue: 1,
    friction: 1,
    useNativeDriver: true,
  }).start();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header title={"Result"} />
      <View style={styles.container}>
        <View style={styles.resultReaction}>
          <Text style={styles.title}>Result of the Trivia</Text>
          <Animated.Text
            style={{ fontSize: 50, transform: [{ scale: emojiAnim }] }}
          >
            <Emoji name={emoji} />
          </Animated.Text>
          <Text style={styles.title}>
            {resultScore} / {maxScore}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("LeaderBoardScreen")}
          style={styles.leaderboardBtnStyle}
        >
          <Text style={styles.leaderboardText}>Check LeaderBoard</Text>
        </TouchableOpacity>
        <View style={{ paddingBottom: 20, flex: 1 }}>
          <FlatList
            style={styles.resultContainer}
            data={answeredQuestion}
            renderItem={({ item, index }) => {
              return <Answers key={index} data={item} />;
            }}
          />
        </View>
        <Button
          text="Play Again!?"
          onPress={() => navigation.replace("SelectionScreen")}
        />
      </View>
    </SafeAreaView>
  );
}
