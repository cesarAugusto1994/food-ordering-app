import React from 'react'
import { StackNavigator } from 'react-navigation'

import Init from '../nav/Init';


const routeConfig = {
  Init: { screen: Init }
}

const StackNav = StackNavigator(routeConfig)

class Nav extends React.Component {
  render() {
    return (
      <StackNav />
    )
  }
}

export default StackNav
