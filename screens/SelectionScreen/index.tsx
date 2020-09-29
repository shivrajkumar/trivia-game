import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";

import { Loader, CheckBox, Header, Button } from "../../components";

import {
  getQuestionsRequest,
  getCategoriesRequest,
} from "../../services/apiServices";

import colors from "../../constants/Colors";

import styles from "./styles";

export default function SelectionScreen({ navigation }: StackScreenProps<{}>) {
  const [isLoading, setLoading] = useState(true);
  const [categoryData, setcategoryData] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    getCategoriesRequest().then((response) => {
      const categories = response.trivia_categories;
      setcategoryData(categories);
      setLoading(false);
    });
  }, []);

  const Categoty = ({ data }: any) => {
    const selected = selectedCategory === data.id;
    return (
      <TouchableOpacity
        style={[
          styles.categoryBox,
          selectedCategory && selected
            ? { borderColor: colors.tintColorLight }
            : {},
        ]}
        onPress={() => {
          if (selected) {
            setselectedCategory("");
          } else setselectedCategory(data.id);
        }}
      >
        <Text style={styles.categoryText}>{data.name}</Text>
        {selectedCategory && selected ? (
          <Icon name="check" color="green" size={30} />
        ) : (
          <Icon name="check" color="transparent" size={30} />
        )}
      </TouchableOpacity>
    );
  };

  const getQuestions = (navigation: any) => {
    setLoading(true);
    getQuestionsRequest(difficulty, selectedCategory).then((response) => {
      console.log(response, "responseresponseresponse");
      if (response.results.length) {
        navigation.navigate("QuizScreen", {
          questions: response.results,
          difficulty,
        });
      } else {
        Alert.alert(
          "Something went wrong 🤔!",
          "Try Selecting a different Category or Difficulty",
          [
            {
              text: "OK",
              onPress: () => {
                setselectedCategory("");
                setDifficulty("easy");
              },
            },
          ],
          { cancelable: false }
        );
      }
      setLoading(false);
    });
  };

  if (isLoading) {
    return <Loader />;
  } else
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <Header title={"Trivia Challenge"} />
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
            <Text style={styles.title}>Choose Difficulty</Text>
            <View style={styles.chooseDifficulty}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setDifficulty("hard")}
              >
                <CheckBox
                  color={colors.light.error}
                  checked={difficulty === "hard"}
                />
                <Text style={[styles.buttonText, styles.difficultButtonText]}>
                  Hard
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setDifficulty("medium")}
              >
                <CheckBox
                  color={colors.tintColorLight}
                  checked={difficulty === "medium"}
                />
                <Text style={[styles.buttonText, styles.mediumButtonText]}>
                  Medium
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setDifficulty("easy")}
              >
                <CheckBox
                  color={colors.light.success}
                  checked={difficulty === "easy"}
                />
                <Text style={[styles.buttonText, styles.easyButtonText]}>
                  Easy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[styles.title, { paddingHorizontal: 20, marginBottom: 10 }]}
          >
            Select a Categoty
          </Text>
          <FlatList
            data={categoryData}
            contentContainerStyle={styles.categoryContainer}
            renderItem={({ item, index }) => {
              return <Categoty key={index} data={item} />;
            }}
          />
          <Button text="Let's Begin" onPress={() => getQuestions(navigation)} />
        </View>
      </SafeAreaView>
    );
}
