import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";
import { colors, darkColors } from "../../src/styles/colors";

export default function TabsLayout() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { isDarkMode } = useSelector((state: RootState) => state.notes);

  const currentColors = isDarkMode ? darkColors : colors;

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)/login" as any} />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentColors.white,
          borderTopColor: currentColors.border,
        },
        tabBarActiveTintColor: currentColors.primary,
        tabBarInactiveTintColor: currentColors.textLight,
        tabBarLabelStyle: {
          color: isDarkMode ? currentColors.text : colors.text,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Notes",
          tabBarIcon: ({ color, focused }) => (
            <Text
              style={{
                color: focused
                  ? currentColors.primary
                  : isDarkMode
                  ? currentColors.text
                  : currentColors.textLight,
                fontSize: 18,
              }}
            >
              📝
            </Text>
          ),
          tabBarLabelStyle: {
            color: isDarkMode ? currentColors.text : currentColors.text,
          },
        }}
      />
    </Tabs>
  );
}
