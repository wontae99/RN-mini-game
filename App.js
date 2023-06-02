import { StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screen/StartGameScreen";
import GameScreen from "./screen/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screen/GameOverScreen";

export default function App() {
  const [userNum, setUserNum] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [gameRounds, setGameRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumHandler(pickedNum) {
    setUserNum(pickedNum);
    setGameIsOver(false);
  }

  function gameOverHandler(numOfRounds) {
    setGameIsOver(true);
    setGameRounds(numOfRounds);
  }

  function startNewGameHandler() {
    setUserNum(null);
    setGameRounds(0);
  }

  let screen = <StartGameScreen onPickedNum={pickedNumHandler} />;

  if (userNum) {
    screen = <GameScreen userNumber={userNum} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNum) {
    screen = (
      <GameOverScreen
        userNumber={userNum}
        roundNumber={gameRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary400, Colors.yellow]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
