import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import EquipmentHistoryPanel from "../components/EquipmentHistoryPanel";
import NoResults from "../components/NoResults";
import SearchBar from "../components/SearchBar";
import useEquipmentStates from "../hooks/useEquipmentState";
import useFilteredPositions from "../hooks/useFilteredPositions";
import useLatestPositions from "../hooks/useLatestPositions";
import useSelectedEquipment from "../hooks/useSelectedEquipment";

function Map() {
  const [searchQuery, setSearchQuery] = useState("");

  const equipmentStates = useEquipmentStates();
  const latestPositions = useLatestPositions();
  const {
    selectedEquipment,
    setSelectedEquipment,
    lastEquipmentModel,
    history,
  } = useSelectedEquipment();

  const { filteredPositions, noResults } = useFilteredPositions({
    positions: latestPositions,
    searchQuery,
  });

  return (
    <div className="relative w-full h-screen">
      <SearchBar
        onSearch={(query) => {
          setSearchQuery(query);
        }}
        onFocus={() => setSelectedEquipment(null)}
      />

      {noResults && <NoResults searchQuery={searchQuery} />}

      <MapContainer
        center={[-19.126536, -45.947756]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />

        {filteredPositions.map(({ equipmentId, lat, lon, equipmentName }) => {
          const equipmentState = equipmentStates.find(
            (eq) => eq.equipmentId === equipmentId,
          );

          return (
            <Marker
              key={equipmentId}
              position={[lat, lon]}
              eventHandlers={{ click: () => setSelectedEquipment(equipmentId) }}
            >
              <Popup closeOnClick={false}>
                <p>
                  <strong className="mr-3">Nome:</strong> {equipmentName}
                </p>

                {lastEquipmentModel && (
                  <p>
                    <strong className="mr-2">Modelo:</strong>
                    {lastEquipmentModel.name}
                  </p>
                )}
                <p className="flex">
                  <strong className="mr-2">Estado:</strong>
                  <span
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: equipmentState?.stateColor }}
                  ></span>
                  {equipmentState?.stateName || "Desconhecido"}
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {selectedEquipment && (
        <EquipmentHistoryPanel
          equipmentId={selectedEquipment}
          history={history}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  );
}

export default Map;
