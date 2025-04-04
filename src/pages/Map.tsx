import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import EquipmentHistoryPanel from "../components/EquipmentHistoryPanel";
import MapError from "../components/MapError";
import NoResults from "../components/NoResults";
import SearchBar from "../components/SearchBar";

import FilterPanel from "../components/FilterPanel";
import useEquipmentFilter from "../hooks/useEquipmentFilter";
import useEquipmentIcons from "../hooks/useEquipmentIcons";
import useEquipmentStates from "../hooks/useEquipmentState";
import useSelectedEquipment from "../hooks/useSelectedEquipment";

function Map() {
  const [mapError, setMapError] = useState(false);
  const { getEquipmentIcon } = useEquipmentIcons();
  const equipmentStates = useEquipmentStates();

  const {
    searchQuery,
    setSearchQuery,
    selectedState,
    setSelectedState,
    selectedModel,
    setSelectedModel,
    filteredPositions,
    noResults,
  } = useEquipmentFilter();

  const {
    selectedEquipment,
    setSelectedEquipment,
    lastEquipmentModel,
    history,
  } = useSelectedEquipment();

  console.log(selectedState);

  return (
    <div className="relative w-full h-screen">
      <SearchBar
        onSearch={(query) => setSearchQuery(query)}
        onFocus={() => setSelectedEquipment(null)}
      />

      <FilterPanel
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />

      {noResults && <NoResults searchQuery={searchQuery} />}

      {mapError ? (
        <MapError />
      ) : (
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
            eventHandlers={{
              tileerror: () => setMapError(true),
            }}
          />
          <ZoomControl position="bottomright" />

          {filteredPositions.map(
            ({ equipmentId, lat, lon, equipmentName, equipmentModel }) => {
              const equipmentState = equipmentStates.find(
                (eq) => eq.equipmentId === equipmentId,
              );

              return (
                <Marker
                  key={equipmentId}
                  position={[lat, lon]}
                  eventHandlers={{
                    click: () => setSelectedEquipment(equipmentId),
                  }}
                  icon={getEquipmentIcon(equipmentModel)}
                >
                  <Popup closeOnClick={false}>
                    <p>
                      <strong className="mr-3">Nome:</strong> {equipmentName}
                    </p>

                    {lastEquipmentModel && (
                      <p>
                        <strong className="mr-2">Modelo:</strong>{" "}
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
            },
          )}
        </MapContainer>
      )}

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
