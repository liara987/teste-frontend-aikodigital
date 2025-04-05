// useGetEquipmentById.test.tsx
import { renderHook } from "@testing-library/react";
import { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { EquipmentContext } from "../context/EquipmentContext";
import { Equipment } from "../types/equipmentTypes";
import useGetEquipmentById from "./useGetEquipmentById";

// Mock de equipamentos
const mockEquipmentList: Equipment[] = [
  { id: "1", name: "Trator 1", equipmentModelId: "Harvester" },
  { id: "2", name: "Caminhão 2", equipmentModelId: "Caminhão de carga" },
];

// Wrapper de contexto
const createWrapper = (equipmentList: Equipment[] | null) => {
  return ({ children }: { children: ReactNode }) => (
    <EquipmentContext.Provider value={equipmentList}>
      {children}
    </EquipmentContext.Provider>
  );
};

describe("useGetEquipmentById", () => {
  it("retorna o equipamento correto pelo ID", () => {
    const wrapper = createWrapper(mockEquipmentList);

    const { result } = renderHook(() => useGetEquipmentById("1"), { wrapper });

    expect(result.current?.name).toBe("Trator 1");
    expect(result.current?.equipmentModelId).toBe("Harvester");
  });

  it("retorna null se o ID não for encontrado", () => {
    const wrapper = createWrapper(mockEquipmentList);

    const { result } = renderHook(() => useGetEquipmentById("999"), {
      wrapper,
    });

    expect(result.current).toBeNull();
  });

  it("retorna null se o contexto for nulo", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // silencia o erro

    const wrapper = createWrapper(null);

    const { result } = renderHook(() => useGetEquipmentById("1"), { wrapper });

    expect(result.current).toBeNull();
  });

  it("retorna null se o contexto for inválido (não é array)", () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // silencia o erro

    const wrapper = createWrapper([] as unknown as null); // simula valor inválido

    const { result } = renderHook(() => useGetEquipmentById("1"), { wrapper });

    expect(result.current).toBeNull();
  });
});
