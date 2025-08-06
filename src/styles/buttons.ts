import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const buttonStyles = StyleSheet.create({
  // Base button
  base: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  // Blue button
  primary: {
    backgroundColor: colors.primary,
  },

  // Red button
  danger: {
    backgroundColor: colors.danger,
  },

  // Gray button
  secondary: {
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Small button
  small: {
    height: 32,
    paddingHorizontal: 16,
  },

  // Round button
  round: {
    width: 44,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 0,
  },
});

export const buttonTextStyles = StyleSheet.create({
  base: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  primary: {
    color: colors.white,
  },

  danger: {
    color: colors.white,
  },

  secondary: {
    color: colors.text,
  },

  small: {
    fontSize: 14,
  },
});
