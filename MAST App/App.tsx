import React from 'react';
import { Text, StyleSheet} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './screens/Homepage';
import MenuScreen from './screens/MenuPage';
import ManageScreen from './screens/ManageMenuPage';
import { MenuProvider } from './MenuContent';
import FilterPage from './screens/Filterpage';




export type RootStackParamList = {
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e53935',
        tabBarStyle: { height: 64, paddingBottom: 10, paddingTop: 6 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      {/*Items linking each page to their own page*/}
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '🏠' : '🏠'}</Text>,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '📕' : '📕'}</Text>,
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterPage}
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '🧪' : '🧪'}</Text>,
        }}
      />
      <Tab.Screen
        name="Manage"
        component={ManageScreen}
        options={{
          tabBarIcon: ({ focused }) => <Text>{focused ? '➕' : '➕'}</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
{/*Exporting bottom tab to all pages */}
export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18
  }
});
