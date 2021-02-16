import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = props => {
	return (
		<Text 
			style={{...styles.body, ...props.style}}>
			{props.children}
		</Text>
	);
}
	
const styles = StyleSheet.create({
	body: {
		fontFamily: 'openSans',
		fontSize: 16
	}
});

export default BodyText;