import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";

export default function TabsLayout() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/login" as any} />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Notes",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18 }}>📝</Text>
          ),
        }}
      />
    </Tabs>
  );
}
