import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import Header from './ui/header';
import { appStyle } from './styles';
import TabViewComponent from './ui/tabView';

const HEADER_HEIGHT = 200;
const App: React.FC = () => {
  const style = appStyle;
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={style.container}>
      <Header headerTranslate={headerTranslate} />
      <TabViewComponent />
    </View>
  );
};

export default App;
