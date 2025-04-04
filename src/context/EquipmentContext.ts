import { createContext } from "react";
import equipment from "../data/equipment.json";
import equipmentModel from "../data/equipmentModel.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";

export const EquipmentContext = createContext(equipment);
export const EquipmentStateContext = createContext(equipmentState);
export const EquipmentStateHistoryContext = createContext(
  equipmentStateHistory,
);
export const EquipmentModelContext = createContext(equipmentModel);
export const EquipmentPositionHistoryContext = createContext(
  equipmentPositionHistory,
);
