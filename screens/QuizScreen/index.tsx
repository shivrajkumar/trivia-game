import { StackScreenProps } from "@react-navigation/stack";
import React, { useRef, useState, useEffect } from "react";
import { Text, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { AnimatedCircularProgress } from "react-native-circular-progress";

import { QuestionCard } from "../../components";
import { readingTime, pointsForQuestion, isEmpty } from "../../utils/algo";
import { auth, firestoreDatabase } from "../../services/firebaseService";

import screen from "../../constants/Layout";
import colors from "../../constants/Colors";

import styles from "./styles";

export default function QuizScreen({
  route,
  navigation,
}: StackScreenProps<{}>) {
  const { questions, difficulty }: any = route.params;
  const maxScore = pointsForQuestion(difficulty) * 10;
  const carouselRef = useRef(null);
  const [currentNum, setCurrentNum] = useState(0);
  const timer = readingTime(questions[currentNum].question, difficulty);
  let x = 360 / timer;
  const [seconds, setSeconds] = useState(360);
  const [fill, setFill] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredQuestion, setAnsweredQuestion] = useState([{}]);
  useEffect(() => {
    let interval: any = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        console.log(seconds, "newSec");
        setSeconds((seconds) => seconds - x);
        const newFill = fill + x;
        setFill(newFill);
        console.log(seconds, fill, "each iteration");
      }, 1000);
    } else {
      clearInterval(interval);
      setFill(0);
      setScore(score + 0);
      let answeredCorrect = {
        question: questions[currentNum].question,
        correct: false,
      };
      let answerArray: any = [];
      if (isEmpty(answeredQuestion[0])) {
        answerArray = [answeredCorrect];
      } else {
        answerArray = [...answeredQuestion, answeredCorrect];
      }
      setAnsweredQuestion(answerArray);
      if (currentNum === questions.length - 1) {
        firestoreDatabase
          .collection("leaderboard")
          .add({
            uid: auth.currentUser?.uid,
            username: auth.currentUser?.displayName,
            score: score,
            difficulty,
          })
          .then((doc) => {
            if (doc) {
              navigation.replace("ResultScreen", {
                resultScore: score,
                maxScore,
                answeredQuestion: answerArray,
              });
            }
          });
      } else {
        carouselRef.current.snapToNext();
      }
    }
    return () => clearInterval(interval);
  }, [seconds, currentNum, fill]);
  const _renderItem = ({ item, index }: any) => {
    return (
      <QuestionCard
        item={item}
        index={index}
        onNext={(e: number) => {
          let answeredCorrect = {};
          if (e > 0) {
            answeredCorrect = {
              question: item.question,
              correct: true,
            };
          } else {
            answeredCorrect = {
              question: item.question,
              correct: false,
            };
          }
          let answerArray: any = [];
          if (Object.keys(answeredQuestion[0]).length === 0) {
            answerArray = [answeredCorrect];
          } else {
            answerArray = [...answeredQuestion, answeredCorrect];
          }
          console.log(answerArray, "answerArrayanswerArray");
          setAnsweredQuestion(answerArray);
          if (index === questions.length - 1) {
            firestoreDatabase
              .collection("leaderboard")
              .add({
                uid: auth.currentUser?.uid,
                username: auth.currentUser?.displayName,
                score: score,
                difficulty,
              })
              .then((doc) => {
                if (doc) {
                  navigation.replace("ResultScreen", {
                    resultScore: score,
                    maxScore,
                    answeredQuestion: answerArray,
                  });
                }
              });
          } else {
            setScore(score + e);
            carouselRef.current.snapToNext();
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Your Score: {score}</Text>
        <AnimatedCircularProgress
          onAnimationComplete={() => console.log("onAnimationComplete")}
          size={120}
          width={14}
          backgroundWidth={10}
          fill={(fill * 100) / 360}
          tintColor={colors.light.success}
          tintColorSecondary={colors.light.error}
          backgroundColor="#3d5875"
          arcSweepAngle={360}
          rotation={360}
          lineCap="round"
          style={styles.progress}
        >
          {(fill) => (
            <Text style={styles.points}>{Math.ceil(seconds / x)}</Text>
          )}
        </AnimatedCircularProgress>
      </View>
      <Carousel
        layout={"default"}
        ref={carouselRef}
        initialNumToRender={1}
        windowSize={1}
        data={questions ?? []}
        sliderWidth={screen.window.width}
        itemWidth={screen.window.width - 20}
        scrollEnabled={false}
        renderItem={_renderItem}
        onSnapToItem={(index) => {
          setCurrentNum(index);
          const timer = readingTime(questions[index].question, difficulty);
          let x = 360 / timer;
          setSeconds(360);
          setFill(0);
        }}
      />
    </View>
  );
}
