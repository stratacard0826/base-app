
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const cardPadding = 12;

export default {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FBFAFA',
    },
    content: {
        padding: 20
    },

    card: {
        height: deviceHeight * 0.3,
        padding: cardPadding
    },
    cardHeader: {
        borderBottomWidth: 1,
        borderColor: '#EEE'
    },
    cardTitle: {
        fontSize: 14
    },
    
    cardBody: {
        marginBottom: 12,
        flex: 1,
        overflow: 'hidden',
    },

    cardListItem: {
        marginTop: 8,
    }


};
