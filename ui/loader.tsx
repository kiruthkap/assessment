import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { loaderStyle } from '../styles';
import { predefinedTexts } from '../constants';

const Loader: React.FC = () => {
    const style = loaderStyle;
    const defaultTexts = predefinedTexts;

    return (
        <View style={style.loader}>
            <ActivityIndicator size="large" color="grey" />
            <Text>{defaultTexts.loading}</Text>
        </View>
    );
};

export default Loader;
