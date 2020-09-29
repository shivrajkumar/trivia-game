import React, { useRef, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import HTMLView from "react-native-htmlview";

import screen from "../constants/Layout";
import colors from "../constants/Colors";

import { pointsForQuestion } from "../utils/algo";
import { QuestionProps } from "../types";

interface Props {
  item: QuestionProps;
  index?: number;
  onNext?: () => void;
}

export const QuestionCard = React.forwardRef((props, Props) => {
  const [rightOpacity, setRightOpacity] = useState(1);
  const [wrongOpacity, setWrongOpacity] = useState(1);
  const fillAnim = useRef(new Animated.Value(0)).current;
  const { item, index, onNext }: any = props;
  console.log(item, "sadsadadsad");
  const calculateScore = (answer: boolean) => {
    let scoreForQuestion = 0;
    if (answer.toString().toUpperCase() === item.correct_answer.toUpperCase()) {
      scoreForQuestion = pointsForQuestion(item.difficulty);
    }
    onNext(scoreForQuestion);
  };

  const fillCard = (type: string, answer: boolean) => {
    if (type === "right") {
      setRightOpacity(1);
      setWrongOpacity(0);
    } else {
      setRightOpacity(0);
      setWrongOpacity(1);
    }
    Animated.timing(fillAnim, {
      toValue: 1,
      duration: 500,
      // useNativeDriver: true,
    }).start(() => {
      calculateScore(answer);
    });
  };
  const height = fillAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [60, 160, 360],
  });
  const width = fillAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [60, 160, screen.window.width / 1.3],
  });
  const posValue = fillAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [30, 15, 0],
  });
  const borderRadiusValue = fillAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [60, 30, 0],
  });
  return (
    <View>
      <View style={styles.container} key={index}>
        <View style={{ flex: 1 }}>
          <View style={styles.questionHeader}>
            {/* <Text
              style={{
                fontSize: 20,
                flexWrap: "wrap",
                flex: 4,
                color: "#eee",
                fontWeight: "600",
              }}
            >
              {textDecode(item.category)}
            </Text> */}
            <Text style={styles.countText}>{index + 1}/10</Text>
            <HTMLView
              value={`<p>${item.category}</p>`}
              stylesheet={{
                p: {
                  fontSize: 20,
                  flexWrap: "wrap",
                  color: "#eee",
                  fontWeight: "600",
                  marginTop: 10,
                },
              }}
            />
          </View>
        </View>
        <View style={{ flex: 2, paddingTop: 20 }}>
          <Text style={styles.question}>
            <Text style={{ fontSize: 20, color: "#ccc" }}>Question:</Text>{" "}
            <HTMLView
              stylesheet={{ p: styles.question }}
              value={`<p>${item.question}</p>`}
            />
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <Animated.View
          style={[
            styles.falseButtonStyle,
            {
              height: height,
              width: width,
              bottom: posValue,
              left: posValue,
              borderRadius: borderRadiusValue,
              opacity: wrongOpacity,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              // calculateScore(false);
              fillCard("wrong", false);
            }}
            style={styles.fBtnStyle}
          >
            <Icon name="cross" size={45} color="#224a77" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            styles.trueButtonStyle,
            {
              opacity: rightOpacity,
              height: height,
              width: width,
              bottom: posValue,
              right: posValue,
              borderRadius: borderRadiusValue,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              // calculateScore(false);
              fillCard("right", true);
            }}
            style={styles.fBtnStyle}
          >
            <Icon name="check" size={40} color="#224a77" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#224a77",
    borderRadius: 5,
    width: screen.window.width / 1.3,
    height: 350,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  trueButtonStyle: {
    position: "absolute",
    bottom: 30,
    right: 50,
    height: 60,
    width: 60,
    backgroundColor: colors.light.success,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  falseButtonStyle: {
    position: "absolute",
    bottom: 30,
    left: 50,
    height: 60,
    width: 60,
    backgroundColor: colors.light.error,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  fBtnStyle: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  questionHeader: {
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
  countText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "right",
  },
});
