import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'openSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'openSansBold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
        <AppLoading 
          startAsync={fetchFonts}
          onFinish={() => {setDataLoaded(true)}}
          onError={(err) => {"AppLoading Error: ", console.log(err)}}
        />
      );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen 
      userChoice={userNumber}
      onGameOver={gameOverHandler}
    />

  } else if (guessRounds > 0) {
    content = <GameOverScreen 
      roundsNumber={guessRounds} 
      userNumber={userNumber}
      onRestart={configureNewGameHandler}
     />;
  }

  return (
    <View styles={styles.screen}>
       <Header title="Guess a Number" />
       { content }
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
