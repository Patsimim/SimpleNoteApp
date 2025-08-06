import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { deleteNote, Note } from "../store/notesSlice";
import { buttonStyles, buttonTextStyles } from "../styles/buttons";
import { globalStyles, textStyles } from "../styles/globalStyles";
import AddNoteModal from "./AddNoteModal";

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <View style={globalStyles.listItem}>
      <View style={globalStyles.marginBottom}>
        <Text style={[textStyles.heading, globalStyles.marginBottom]}>
          {note.title}
        </Text>
        <Text style={[textStyles.bodySecondary, globalStyles.marginBottom]}>
          {note.description}
        </Text>
        <Text style={textStyles.small}>
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
