import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { buttonStyles, buttonTextStyles } from "../styles/buttons";
import { globalStyles, textStyles } from "../styles/globalStyles";
import { spacing } from "../styles/spacing";

interface EmptyStateProps {
  onAddNote: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddNote }) => {
  return (
    <View style={globalStyles.centerContainer}>
      <Text style={[textStyles.bodySecondary, { marginBottom: spacing.xl }]}>
        No notes yet
      </Text>
      <TouchableOpacity
        style={[
          buttonStyles.base,
          buttonStyles.primary,
          buttonStyles.round,
          { width: 60, height: 60 },
        ]}
        onPress={onAddNote}
      >
        <Text
          style={[
            buttonTextStyles.base,
            buttonTextStyles.primary,
            { fontSize: 30 },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
