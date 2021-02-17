import React, { useState, useRef, useEffect } from 'react';
import {
	Text,
	View,
	StyleSheet,
	Alert,
	ScrollView,
	Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import BodyText from '../components/BodyText';

const generateRandomNumber = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);

	const randomNum = Math.floor(Math.random() * (max - min)) + min;
	if (randomNum === exclude) {
		return generateRandomNumber(min, max, exclude);
	} else {
		console.log("Next number: ",randomNum);
		return randomNum;
	}
};

const renderListItem = (value, numOfRound) =>
	(
		<View
			key={value}
			style={styles.listItem}
		>
			<BodyText>
				#{numOfRound}
			</BodyText>
			<BodyText>
				{value}
			</BodyText>
		</View>
	);

const GameScreen = props => {

	const initialGuess = generateRandomNumber(1, 100, props.userChoice)

	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props; // destructured props here

	useEffect(() => { //runs after a state is rendered
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [ currentGuess, userChoice, onGameOver ]);

	const nextGuessHandler = direction => {
		if ((direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)) {
			Alert.alert('Don\'t lie!', 'You know this is wrong...', [
				{text: 'Sorry!', style:'cancel'}
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomNumber(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		// setRounds(currentRounds => currentRounds + 1);
		setPastGuesses(currentPastGuesses => [nextNumber, ...currentPastGuesses]);
	};

	return (
		<View style={styles.screen}>
			<Text>
				Opponent's Guess
			</Text>
			<NumberContainer>
				{ currentGuess }
			</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton 
					onPress={() => {nextGuessHandler('lower')}}
				>
				  	<Ionicons name="md-remove" size={30} color="white"/>
				</MainButton>
				<MainButton
					onPress={() => {nextGuessHandler('greater')}}
				> 
					<Ionicons name="md-add" size={30} color="white"/>
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				<ScrollView contentContainerStyle={styles.listContent}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView>
			</View>
				
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
		padding: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
		width: 270,
		maxWidth: '80%'
	},
	listContainer: {
		width: '80%',
		height: 300
	},
	listContent: {
		alignItems: 'center'
	},
	listItem: {
		borderColor: '#ccc',
		width: '80%',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

export default GameScreen;