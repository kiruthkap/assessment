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
        backgroundColor: '#000',
        height: 4,
    },
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    image: { borderRadius: 20, marginRight: 10 },
    imageView: {
        borderRadius: 50
    },
    headerText: {
        left: 8,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export const videoListStyle = StyleSheet.create({
    container: {
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
        height: 300,
    },
    titleContainer: {
        paddingVertical: 8,
    },
    titleStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 8,
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