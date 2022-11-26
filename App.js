import React from "react";
import Login from "./views/Login";
import Registre from "./views/Registre";
import Dashboard from "./views/Dashboard";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDDdCSJHWu4F-Ae6O6L3g9wrqY7lkXdGZE",
  authDomain: "smart-pod-e1793.firebaseapp.com",
  projectId: "smart-pod-e1793",
  storageBucket: "smart-pod-e1793.appspot.com",
  messagingSenderId: "581330641745",
  appId: "1:581330641745:web:7c1d1c66d6c2ccb1756970",
  databaseURL: "https://smart-pod-e1793-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const authContext = React.createContext({
  changeUser: null,
  user: null,
});

const Stack = createNativeStackNavigator();

const DashboardStack = createNativeStackNavigator();
export default function App() {
  const [user, changeUser] = React.useState(null);

  return (
    <authContext.Provider value={{ changeUser, user }}>
      <NavigationContainer>
        {user ? (
          <DashboardStack.Navigator>
            <DashboardStack.Screen name="dashboard" component={Dashboard} />
          </DashboardStack.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registro" component={Registre} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </authContext.Provider>
  );
}
