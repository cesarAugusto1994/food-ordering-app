import React from 'react';
import {Header} from 'react-native-elements';

export default ({
  color,
  placement,
  statusBar,
  children = () => null,
  outerContainer,
  innerContainer,
  leftComponent,
  centerComponent,
  rightComponent
}) => {
  return (
    <Header
      backgroundColor={color}
      centerComponent={centerComponent}
      leftComponent={leftComponent}
      rightComponent={rightComponent}
      placement={placement}
      statusBarProps={statusBar}
      outerContainerStyles={outerContainer}
      innerContainerStyles={innerContainer}
    >
    {children()}
    </Header>
  )
};
