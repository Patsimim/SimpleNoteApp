import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../src/store";

export default function AuthLayout() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (isAuthenticated) {
    return <Redirect href='/(tabs)' />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' />
    </Stack>
  );
}
