import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loginCenterContainer: {
    flex: 1,
    justifyContent: "center",
  },

  loginCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 60,
    margin: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 24,
    margin: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  listItem: {
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: colors.white,
    margin: 20,
    padding: 24,
    borderRadius: 12,
    width: "90%",
  },

  row: {
    flexDirection: "row",
  },

  flex1: {
    flex: 1,
  },

  textCenter: {
    textAlign: "center",
  },

  marginBottom: {
    marginBottom: 16,
  },

  paddingHorizontal: {
    paddingHorizontal: 20,
  },
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
  },

  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text,
  },

  body: {
    fontSize: 16,
    color: colors.text,
  },

  bodySecondary: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  small: {
    fontSize: 12,
    color: colors.textLight,
  },

  error: {
    fontSize: 12,
    color: colors.danger,
  },
});
