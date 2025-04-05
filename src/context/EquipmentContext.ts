import { createContext } from "react";
import equipment from "../data/equipment.json";
import equipmentModel from "../data/equipmentModel.json";
import equipmentPositionHistory from "../data/equipmentPositionHistory.json";
import equipmentState from "../data/equipmentState.json";
import equipmentStateHistory from "../data/equipmentStateHistory.json";
import {
  Equipment,
  EquipmentModel,
  EquipmentPositionHistory,
  EquipmentState,
  EquipmentStateHistory,
} from "../types/equipmentTypes";

export const EquipmentContext = createContext<Equipment[]>(equipment);
export const EquipmentStateContext =
  createContext<EquipmentState[]>(equipmentState);
export const EquipmentStateHistoryContext = createContext<
  EquipmentStateHistory[]
>(equipmentStateHistory);
export const EquipmentModelContext =
  createContext<EquipmentModel[]>(equipmentModel);
export const EquipmentPositionHistoryContext = createContext<
  EquipmentPositionHistory[]
>(equipmentPositionHistory);
