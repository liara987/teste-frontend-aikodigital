import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EquipmentContext,
  EquipmentModelContext,
} from "../context/EquipmentContext";
import { Equipment, EquipmentModel } from "../types/equipmentTypes";
import useEquipmentModel from "./useEquipmentModel";

const mockEquipmentList: Equipment[] = [
  {
    id: "eq1",
    equipmentModelId: "model1",
    name: "Caminhão 01",
  },
];

const mockEquipmentModels: EquipmentModel[] = [
  {
    id: "model1",
    name: "Caminhão de carga",
    hourlyEarnings: [],
  },
];

// Wrapper para fornecer os contextos
const wrapper =
  (equipmentList: Equipment[] | null, modelList: EquipmentModel[] | null) =>
  ({ children }: { children: React.ReactNode }) => (
    <EquipmentContext.Provider value={equipmentList || []}>
      <EquipmentModelContext.Provider value={modelList || []}>
        {children}
      </EquipmentModelContext.Provider>
    </EquipmentContext.Provider>
  );

describe("useEquipmentModel", () => {
  it("retorna null se o equipmentId for null", () => {
    const { result } = renderHook(() => useEquipmentModel(null), {
      wrapper: wrapper(mockEquipmentList, mockEquipmentModels),
    });

    expect(result.current).toBeNull();
  });

  it("retorna null se o equipamento não for encontrado", () => {
    const { result } = renderHook(() => useEquipmentModel("inexistente"), {
      wrapper: wrapper(mockEquipmentList, mockEquipmentModels),
    });

    expect(result.current).toBeNull();
  });

  it("retorna null se o modelo não for encontrado", () => {
    const modifiedEquipmentList = [
      {
        id: "eq1",
        equipmentModelId: "modeloInexistente",
        name: "Equipamento Teste",
      },
    ];

    const { result } = renderHook(() => useEquipmentModel("eq1"), {
      wrapper: wrapper(modifiedEquipmentList, mockEquipmentModels),
    });

    expect(result.current).toBeNull();
  });

  it("retorna o modelo de equipamento correto", () => {
    const { result } = renderHook(() => useEquipmentModel("eq1"), {
      wrapper: wrapper(mockEquipmentList, mockEquipmentModels),
    });

    expect(result.current).toEqual(mockEquipmentModels[0]);
  });
});
