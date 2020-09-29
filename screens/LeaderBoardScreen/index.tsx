import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { auth, firestoreDatabase } from "../../services/firebaseService";

import { Loader, CheckBox, Header } from "../../components";

import colors from "../../constants/Colors";

import { ScoreDataProps } from "../../types";

import styles from "./styles";

const ScoreItem = (props: any) => {
  const { item, index, difficulty, currentPlayer } = props;
  return (
    <View
      key={index}
      style={[
        styles.tableCellStyle,
        item.uid === currentPlayer ? { backgroundColor: "#eee" } : {},
      ]}
    >
      <Text style={styles.rankStyle}>{index + 1}</Text>
      <Text style={styles.playerNameStyle}>{item?.username}</Text>
      {difficulty === "all" && (
        <Text style={styles.playerNameStyle}>
          {item?.difficulty.toUpperCase()}
        </Text>
      )}
      <Text style={styles.scoreStyle}>{item?.score}</Text>
    </View>
  );
};

export default function LeaderBoardScreen({
  navigation,
}: StackScreenProps<{}>) {
  const [isLoading, setLoading] = useState(true);
  const [scoreData, setscoreData] = useState<ScoreDataProps[]>([]);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    if (difficulty === "all") {
      firestoreDatabase
        .collection("leaderboard")
        .orderBy("score", "desc")
        .get()
        .then((result) => {
          const leaderboardData: any = [];
          result.forEach((doc) => {
            leaderboardData.push(doc.data());
          });
          setscoreData(leaderboardData);
          setLoading(false);
        });
    } else {
      firestoreDatabase
        .collection("leaderboard")
        .where("difficulty", "==", difficulty)
        .orderBy("score", "desc")
        .get()
        .then((result) => {
          const leaderboardData: any = [];
          result.forEach((doc) => {
            leaderboardData.push(doc.data());
          });
          setscoreData(leaderboardData);
          setLoading(false);
        });
    }
  }, [difficulty]);

  const CheckBoxButton = (props: any) => {
    const { onPress, checked, textStyle, text, color } = props;
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <CheckBox color={color} checked={checked} />
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };
  const currentPlayer = auth.currentUser?.uid;
  console.log(scoreData, "scoreData");
  if (isLoading) {
    return <Loader />;
  } else
    return (
      <SafeAreaView style={styles.container}>
        <Header onBack={() => navigation.goBack()} title="LeaderBoard" />
        <View style={{ paddingHorizontal: 20, paddingVertical: 12 }}>
          <Image
            source={require("../../assets/images/trivia.png")}
            style={styles.logo}
          />
          <Text style={styles.SelectText}>Select Difficulty</Text>
          <View style={styles.chooseDifficulty}>
            <CheckBoxButton
              text="Hard"
              color={colors.light.error}
              textStyle={[styles.buttonText, styles.difficultButtonText]}
              checked={difficulty === "hard"}
              onPress={() => {
                setscoreData([]);
                setDifficulty("hard");
              }}
            />
            <CheckBoxButton
              text="Medium"
              color={colors.tintColorLight}
              textStyle={[styles.buttonText, styles.mediumButtonText]}
              checked={difficulty === "medium"}
              onPress={() => {
                setscoreData([]);
                setDifficulty("medium");
              }}
            />
            <CheckBoxButton
              text="Easy"
              color={colors.light.success}
              textStyle={[styles.buttonText, styles.easyButtonText]}
              checked={difficulty === "easy"}
              onPress={() => {
                setscoreData([]);
                setDifficulty("easy");
              }}
            />
            <CheckBoxButton
              text="All"
              color="#224a77"
              textStyle={[styles.buttonText, { color: "#224a77" }]}
              checked={difficulty === "all"}
              onPress={() => {
                setscoreData([]);
                setDifficulty("all");
              }}
            />
          </View>
        </View>
        <View style={styles.tableStyle}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerTextStyle}>Rank</Text>
            <Text style={styles.headerTextStyle}>Player Name</Text>
            {difficulty === "all" && (
              <Text style={styles.headerTextStyle}>Difficulty</Text>
            )}
            <Text style={styles.headerTextStyle}>Score</Text>
          </View>
          {scoreData.length ? (
            <ScrollView>
              {scoreData.map((item, index) => {
                console.log(item, "itemitemitem");
                return (
                  <ScoreItem
                    item={item}
                    index={index}
                    difficulty={difficulty}
                    currentPlayer={currentPlayer}
                  />
                );
              })}
            </ScrollView>
          ) : (
            <View style={styles.emptyComponent}>
              <Text style={styles.rankStyle}>No Data Yet</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
}
