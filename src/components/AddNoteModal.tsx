import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { addNote, Note, updateNote } from "../store/notesSlice";
import { buttonStyles, buttonTextStyles } from "../styles/buttons";
import { colors } from "../styles/colors";
import { globalStyles, textStyles } from "../styles/globalStyles";
import { inputStyles } from "../styles/input";

interface AddNoteModalProps {
  visible: boolean;
  onClose: () => void;
  editNote?: Note | null;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  visible,
  onClose,
  editNote = null,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setDescription(editNote.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editNote, visible]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    if (editNote) {
      dispatch(
        updateNote({
          id: editNote.id,
          title: title.trim(),
          description: description.trim(),
        })
      );
    } else {
      dispatch(
        addNote({
          title: title.trim(),
          description: description.trim(),
        })
      );
    }

    onClose();
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContent}>
          <Text
            style={[
              textStyles.title,
              globalStyles.textCenter,
              globalStyles.marginBottom,
            ]}
          >
            {editNote ? "Edit Note" : "Add New Note"}
          </Text>

          <TextInput
            style={inputStyles.base}
            placeholder='Note title'
            value={title}
            onChangeText={setTitle}
            autoFocus
            placeholderTextColor={colors.textLight}
          />

          <TextInput
            style={[inputStyles.base, inputStyles.multiline]}
            placeholder='Note description'
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor={colors.textLight}
          />

          <View style={[globalStyles.row, { gap: 12, marginTop: 16 }]}>
            <TouchableOpacity
              style={[
                buttonStyles.base,
                buttonStyles.secondary,
                globalStyles.flex1,
              ]}
              onPress={handleCancel}
            >
              <Text style={[buttonTextStyles.base, buttonTextStyles.secondary]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                buttonStyles.base,
                buttonStyles.primary,
                globalStyles.flex1,
              ]}
              onPress={handleSave}
            >
              <Text style={[buttonTextStyles.base, buttonTextStyles.primary]}>
                {editNote ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNoteModal;
