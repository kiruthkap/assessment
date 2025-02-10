import { Dimensions, StyleSheet } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const appStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        backgroundColor: '#f4511e',
    },
    indicatorStyle: {
        backgroundColor: 'black'
    }
});

export const loaderStyle = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT
    },
    loadingText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export const headerStyle = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export const videoListStyle = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 20
    },
    noVideoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: SCREEN_HEIGHT
    },
    noVideoText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
});

export const videoItemStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
    },
    videoWrapper: {
        width: '100%',
        height: 250,
    },
    video: {
        width: '100%',
        height: '100%',
    },
});