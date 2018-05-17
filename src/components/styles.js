import { StyleSheet, Dimensions, Platform } from 'react-native';

let { height, width } = Dimensions.get("window");

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  horizontal: {
		flexDirection: 'row',
		margin: 'auto'
  },
  vertical: {
    flex: 1,
    flexDirection: 'column',
    margin: 'auto',
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#fff"
  },
  drawerImage: {
    position: "absolute",
    // left: (Platform.OS === 'android') ? 30 : 40,
    left: Platform.OS === "android" ? width / 10 : width / 9,
    // top: (Platform.OS === 'android') ? 45 : 55,
    top: Platform.OS === "android" ? height / 13 : height / 12,
    width: 210,
    height: 75,
    resizeMode: "cover"
  },
  titleText: {
    fontSize: 18,
    marginTop: height * 0.01,
    alignItems: 'center',
		fontWeight: 'bold',
		color: 'white'
  },
  labelText: {
		fontSize: 16,
		fontWeight: 'bold'
	},
  halfTextInput: {
		fontSize: 18,
    width: width / 2
	},
  button: {
		alignItems: 'center',
    backgroundColor: '#03618D',
    height: height * 0.05
  },
  bodyText: {
		fontSize: 18,
		color: 'grey'
  },
  loding: {
		flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  smallPicker: {
    width: width / 2
  }
});
