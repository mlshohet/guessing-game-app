import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
	console.log("Props in game over: ",props);
	return (
		<View style={styles.screen}>
			<TitleText>
				Game Over!
			</TitleText>
			<View style={styles.imageContainer}>
				<Image 
					source={{uri: 'https://media.istockphoto.com/photos/mount-ama-dablam-within-clouds-picture-id938914580?k=6&m=938914580&s=612x612&w=0&h=-tQlNL-xuFYSRHAbQ12ms74LG7vjlLfvNwR0AjUPh-o='}}
					//source={require('../assets/success.png')}
					style={styles.image}
				/>
			</View>
			<BodyText style={styles.resultText}>
				Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess <Text style={styles.highlight}>{props.userNumber}</Text>
			</BodyText>
			<View style={styles.buttonContainer}>
				<MainButton 
					onPress={props.onRestart}
				>
					NEW GAME
				</MainButton>
			</View>
		</View> 
	)
};

const styles = StyleSheet.create({
	screen: {
		height: 550,
		justifyContent: 'center',
		alignItems: 'center'
	},
	  imageContainer: {
	  	width: 220,
	  	height: 220,
	  	borderRadius: 110,
	  	overflow: 'hidden',
	  	marginVertical: 30
	  },
	  image: {
	    width: '100%',
	    height: '100%',
	  },
	  highlight: {
	  	color: Colors.primary,
	  	fontFamily: 'openSansBold',
	  },
	  resultText: {
	  	textAlign: 'center'
	  },
	  buttonContainer: {
	  	marginVertical: 20
	  }
});

export default GameOverScreen;