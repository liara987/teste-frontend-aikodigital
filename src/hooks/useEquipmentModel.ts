import { useContext, useMemo } from "react";
import {
  EquipmentContext,
  EquipmentModelContext,
} from "../context/EquipmentContext";

export interface EquipmentModel {
  id: string;
  name: string;
}

function useEquipmentModel(equipmentId: string | null): EquipmentModel | null {
  const equipmentList = useContext(EquipmentContext);
  const equipmentModels = useContext(EquipmentModelContext);

  return useMemo(() => {
    if (!equipmentId) return null;

    const equipment = equipmentList.find((eq) => eq.id === equipmentId);
    if (!equipment) return null;

    return (
      equipmentModels.find(
        (model) => model.id === equipment.equipmentModelId,
      ) || null
    );
  }, [equipmentId, equipmentList, equipmentModels]);
}

export default useEquipmentModel;
