import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteNote, Note } from "../store/notesSlice";
import { buttonStyles, buttonTextStyles } from "../styles/buttons";
import { colors, darkColors } from "../styles/colors";
import { globalStyles, textStyles } from "../styles/globalStyles";
import AddNoteModal from "./AddNoteModal";

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state: RootState) => state.notes);

  const currentColors = isDarkMode ? darkColors : colors;

  const handleDelete = () => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteNote(note.id)),
      },
    ]);
  };

  const dynamicStyles = {
    listItem: {
      ...globalStyles.listItem,
      backgroundColor: currentColors.white,
    },
    heading: {
      ...textStyles.heading,
      color: currentColors.text,
    },
    bodySecondary: {
      ...textStyles.bodySecondary,
      color: currentColors.textSecondary,
    },
    small: {
      ...textStyles.small,
      color: currentColors.textLight,
    },
  };

  return (
    <View style={dynamicStyles.listItem}>
      <View style={globalStyles.marginBottom}>
        <Text style={[dynamicStyles.heading, globalStyles.marginBottom]}>
          {note.title}
        </Text>
        <Text style={[dynamicStyles.bodySecondary, globalStyles.marginBottom]}>
          {note.description}
        </Text>
        <Text style={dynamicStyles.small}>
          {new Date(note.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={[globalStyles.row, { gap: 12 }]}>
        <TouchableOpacity
          style={[buttonStyles.base, buttonStyles.primary, buttonStyles.small]}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text
            style={[
              buttonTextStyles.base,
              buttonTextStyles.primary,
              buttonTextStyles.small,
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.base, buttonStyles.danger, buttonStyles.small]}
          onPress={handleDelete}
        >
          <Text
            style={[
              buttonTextStyles.base,
              buttonTextStyles.danger,
              buttonTextStyles.small,
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>

      <AddNoteModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        editNote={note}
      />
    </View>
  );
};

export default NoteItem;
