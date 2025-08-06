import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../src/store/authSlice";
import { buttonStyles, buttonTextStyles } from "../../src/styles/buttons";
import { colors } from "../../src/styles/colors";
import { globalStyles, textStyles } from "../../src/styles/globalStyles";
import { errorTextStyles, inputStyles } from "../../src/styles/input";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //mock credentials
  const handleLogin = () => {
    if (!validateForm()) return;

    if (username === "test" && password === "password123") {
      dispatch(login({ username }));
      router.replace("/(tabs)");
    } else {
      Alert.alert("Error", "Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.loginCenterContainer}>
        <View style={globalStyles.loginCard}>
          <Text
            style={[
              textStyles.title,
              globalStyles.textCenter,
              globalStyles.marginBottom,
            ]}
          >
            Login
          </Text>

          <TextInput
            style={[
              inputStyles.loginwide,
              errors.username && inputStyles.error,
              globalStyles.marginBottom,
            ]}
            placeholder='Username'
            value={username}
            onChangeText={setUsername}
            autoCapitalize='none'
            placeholderTextColor={colors.textLight}
          />
          {errors.username && (
            <Text style={errorTextStyles.base}>{errors.username}</Text>
          )}

          <TextInput
            style={[
              inputStyles.loginwide,
              errors.password && inputStyles.error,
              globalStyles.marginBottom,
            ]}
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={colors.textLight}
          />
          {errors.password && (
            <Text style={errorTextStyles.base}>{errors.password}</Text>
          )}

          <TouchableOpacity
            style={[buttonStyles.base, buttonStyles.primary]}
            onPress={handleLogin}
          >
            <Text style={[buttonTextStyles.base, buttonTextStyles.primary]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
