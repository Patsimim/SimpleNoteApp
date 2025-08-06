import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const inputStyles = StyleSheet.create({
  base: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },

  loginwide: {
    height: 50,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
    width: "100%",
  },

  error: {
    borderColor: colors.danger,
  },

  multiline: {
    height: 100,
    paddingVertical: 12,
    textAlignVertical: "top",
  },
});

export const errorTextStyles = StyleSheet.create({
  base: {
    fontSize: 12,
    color: colors.danger,
    marginBottom: 8,
  },
});
