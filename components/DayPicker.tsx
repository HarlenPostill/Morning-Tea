import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useDayContext } from "@/app/contexts/DayContext";

interface DayPickerProps {
  maxDay?: number;
}

export const DayPicker: React.FC<DayPickerProps> = ({ maxDay = 365 }) => {
  const { currentDay, setCurrentDay } = useDayContext();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(currentDay);

  const handleConfirm = async () => {
    await setCurrentDay(selectedDay);
    setShowPicker(false);
  };

  const days = Array.from({ length: maxDay }, (_, i) => i + 1);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.dayPickerButton}
      >
        <Text style={styles.dayPickerText}>Day {currentDay}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showPicker}
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Select Day</Text>

            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue) => setSelectedDay(itemValue)}
              style={styles.picker}
            >
              {days.map((day) => (
                <Picker.Item key={day} label={`Day ${day}`} value={day} />
              ))}
            </Picker>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPicker(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dayPickerButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.tint,
    alignItems: "center" as const,
  },
  dayPickerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold" as const,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center" as const,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    height: 200,
  },
  buttonRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    width: "100%",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center" as const,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: Colors.light.tint,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold" as const,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold" as const,
  },
});
