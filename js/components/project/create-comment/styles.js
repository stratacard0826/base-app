
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const padding = 20;

export default {
    editor: {
        height: deviceHeight * 0.4
    }
};
