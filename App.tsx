import React, { useRef } from 'react';
import { View, Animated } from 'react-native';
import Header from './ui/header';
import { appStyle } from './styles';
import TabViewComponent from './ui/tabView';

const App: React.FC = () => {
  const style = appStyle;
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={style.container}>
      <Header scrollY={scrollY} />
      <TabViewComponent scrollY={scrollY} />
    </View>
  );
};

export default App;
