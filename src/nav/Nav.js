import React from 'react'
import { createStackNavigator } from 'react-navigation'

import Init from '../nav/Init';


const routeConfig = {
  Init: { screen: Init }
}

const StackNav = createStackNavigator(routeConfig)

class Nav extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default StackNav
