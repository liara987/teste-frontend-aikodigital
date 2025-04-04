import { useEffect, useState } from "react";
import useFormattedEquipmentHistory from "./useEquipmentHistory";
import useEquipmentModel, { EquipmentModel } from "./useEquipmentModel";

export default function useSelectedEquipment() {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(
    null,
  );
  const [lastEquipmentModel, setLastEquipmentModel] =
    useState<EquipmentModel | null>(null);

  const equipmentModel = useEquipmentModel(selectedEquipment);
  const history = useFormattedEquipmentHistory(selectedEquipment);

  useEffect(() => {
    if (equipmentModel) {
      setLastEquipmentModel(equipmentModel);
    }
  }, [equipmentModel]);

  return {
    selectedEquipment,
    setSelectedEquipment,
    lastEquipmentModel,
    history,
  };
}
