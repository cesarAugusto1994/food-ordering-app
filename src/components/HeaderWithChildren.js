import React from 'react';
import {Header} from 'react-native-elements';

export default ({
  color,
  placement,
  statusBar,
  children = () => null,
  outerContainer,
  innerContainer
}) => {
  return (
    <Header
      backgroundColor={color}
      placement={placement}
      statusBarProps={statusBar}
      outerContainerStyles={outerContainer}
      innerContainerStyles={innerContainer}
    >
    {children()}
    </Header>
  )
};
