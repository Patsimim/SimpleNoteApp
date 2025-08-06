import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AddNoteModal from "../../src/components/AddNoteModal";
import EmptyState from "../../src/components/Empty";
import NoteItem from "../../src/components/NoteItem";
import { RootState } from "../../src/store";
import { logout } from "../../src/store/authSlice";
import { setSearchQuery, toggleTheme } from "../../src/store/notesSlice";
import { buttonStyles, buttonTextStyles } from "../../src/styles/buttons";
import { colors, darkColors } from "../../src/styles/colors";
import { globalStyles, textStyles } from "../../src/styles/globalStyles";
import { inputStyles } from "../../src/styles/input";
import { spacing } from "../../src/styles/spacing";

export default function NotesScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { notes, searchQuery, isDarkMode } = useSelector(
    (state: RootState) => state.notes
  );

  // Get current theme colors
  const currentColors = isDarkMode ? darkColors : colors;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/(auth)/login" as any);
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const dynamicStyles = {
    container: {
      ...globalStyles.container,
      backgroundColor: currentColors.background,
    },
    header: {
      ...globalStyles.header,
      backgroundColor: currentColors.white,
      borderBottomColor: currentColors.border,
    },
    card: {
      ...globalStyles.card,
      backgroundColor: currentColors.white,
    },
    listItem: {
      ...globalStyles.listItem,
      backgroundColor: currentColors.white,
    },
    modalContent: {
      ...globalStyles.modalContent,
      backgroundColor: currentColors.white,
    },
    title: {
      ...textStyles.title,
      color: currentColors.text,
    },
    input: {
      ...inputStyles.base,
      backgroundColor: currentColors.white,
      borderColor: currentColors.border,
      color: currentColors.text,
    },
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.header}>
        <Text style={dynamicStyles.title}>My Notes</Text>
        <View
          style={[globalStyles.row, { alignItems: "center", gap: spacing.md }]}
        >
          <View
            style={[
              globalStyles.row,
              { alignItems: "center", gap: spacing.sm },
            ]}
          >
            <Text
              style={[textStyles.small, { color: currentColors.textLight }]}
            >
              {isDarkMode ? "🌙" : "☀️"}
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{
                false: currentColors.border,
                true: currentColors.primary,
              }}
              thumbColor={
                isDarkMode ? currentColors.white : currentColors.lightGray
              }
            />
          </View>
          <TouchableOpacity
            style={[buttonStyles.base, buttonStyles.danger, buttonStyles.small]}
            onPress={handleLogout}
          >
            <Text
              style={[
                buttonTextStyles.base,
                buttonTextStyles.danger,
                buttonTextStyles.small,
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          globalStyles.row,
          globalStyles.paddingHorizontal,
          { gap: spacing.md, paddingVertical: spacing.lg },
        ]}
      >
        <TextInput
          style={[dynamicStyles.input, globalStyles.flex1]}
          placeholder='Search notes...'
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={currentColors.textLight}
        />
        <TouchableOpacity
          style={[buttonStyles.base, buttonStyles.primary, buttonStyles.round]}
          onPress={() => setIsModalVisible(true)}
        >
          <Text
            style={[
              buttonTextStyles.base,
              buttonTextStyles.primary,
              { fontSize: 24 },
            ]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      {filteredNotes.length === 0 ? (
        <EmptyState onAddNote={() => setIsModalVisible(true)} />
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NoteItem note={item} />}
          contentContainerStyle={dynamicStyles.listItem}
        />
      )}

      <AddNoteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
