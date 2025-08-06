import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
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
import { setSearchQuery } from "../../src/store/notesSlice";
import { buttonStyles, buttonTextStyles } from "../../src/styles/buttons";
import { colors } from "../../src/styles/colors";
import { globalStyles, textStyles } from "../../src/styles/globalStyles";
import { inputStyles } from "../../src/styles/input";
import { spacing } from "../../src/styles/spacing";

export default function NotesScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { notes, searchQuery } = useSelector((state: RootState) => state.notes);

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

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={textStyles.title}>My Notes</Text>
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

      <View
        style={[
          globalStyles.row,
          globalStyles.paddingHorizontal,
          { gap: spacing.md, paddingVertical: spacing.lg },
        ]}
      >
        <TextInput
          style={[inputStyles.base, inputStyles.base, globalStyles.flex1]}
          placeholder='Search notes...'
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={colors.textLight}
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
          contentContainerStyle={globalStyles.listItem}
        />
      )}

      <AddNoteModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
