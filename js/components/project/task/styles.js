
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const padding = 20;

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
        // paddingHorizontal: 20
    },

    taskItem: {
        paddingHorizontal: padding,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomBar: {
        height: 48,
        borderTopWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBarContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    editor: {
        height: 120
    }
};
