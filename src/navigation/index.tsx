import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { Image } from 'react-native';
import cart from '../assets/icons8-cart-24.png';
import graph from '../assets/icons8-graph-24.png';
import { Home } from './screens/Home';
import { Analytics } from './screens/Analytics';

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    headerShown: false,
    tabBarPosition: "left",
    tabBarVariant: "material",
    tabBarLabelPosition: "below-icon",
  },
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Transaction',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={cart}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Analytics: {
      screen: Analytics,
      options: {
        title: 'Analytics',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={graph}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

export const Navigation = createStaticNavigation(HomeTabs);

type HomeTabsParamList = StaticParamList<typeof HomeTabs>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeTabsParamList { }
  }
}
