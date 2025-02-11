import React from 'react';
import { View } from 'react-native';
import Header from './ui/header';
import { appStyle } from './styles';
import TabViewComponent from './ui/tabView';

const App: React.FC = () => {
  const style = appStyle;

  return (
    <View style={style.container}>
      <Header />
      <TabViewComponent />
    </View>
  );
};

export default App;
