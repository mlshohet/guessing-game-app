import React, { useState } from 'react';
import { 
	View,
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert // calls a native API in mobile
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = props => {

	const [enteredValue, setEnteredValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const inputHandler = inputText => {
		setEnteredValue(inputText.replace(
			/[^0-9]/g, ''
		));
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
				Alert.alert(
					'Invalid number!',
					'Number has to be between 1 and 99',
					[{text: 'OK', style: 'destructive', onPress: resetInputHandler }]
				)
				return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue('');
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
					<NumberContainer>
						{selectedNumber}
					</NumberContainer>
				<MainButton
					onPress={() => { props.onStartGame(selectedNumber) }}
				>
					START GAME
				</MainButton>
			</Card>
		)
	}

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a New Game!</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText>Select a Number</BodyText>
					<Input 
						style={styles.input}
						blurOnSubmit
						autoCapitalized='none'
						autoCorrect={false}
						keyboardType='numeric'
						maxLength={2}
						onChangeText={inputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="RESET"
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
						<View style={styles.button}>
							<Button 
								title="CONFIRM"
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 10,
		alignItems: 'center'
	},
	title : {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		width: '45%'
	},
	input: {
		height: 100,
		width: 100,
		textAlign: 'center',
		fontSize: 45,
	},
	summaryContainer: {
		width: '80%',
		marginTop: 20,
		alignItems: 'center'
	}
});

export default StartGameScreen;