import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, AttributionControl, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import type { FloweredSpotMarker, SpotType } from '../../types/api';
import { iconFor } from './markers';
import 'leaflet/dist/leaflet.css';

// Center of Bugnara
const BUGNARA_CENTER: [number, number] = [42.0247, 13.8622];
const DEFAULT_ZOOM = 16;

/**
 * Stadia Maps API key.
 *
 * Read from the VITE_STADIA_API_KEY env variable at build time.
 * - In dev: put it in your local `.env` file (gitignored).
 * - In prod (Railway): set it in the service "Variables" tab.
 *
 * Vite ONLY exposes env vars prefixed with VITE_ to the frontend bundle.
 * If missing, we still try to load the tiles without a key — Stadia's free
 * tier allows a tiny number of unauthenticated requests, useful for local
 * smoke tests but it will fail quickly in production.
 */
const STADIA_KEY = import.meta.env.VITE_STADIA_API_KEY as string | undefined;

const watercolorUrl = STADIA_KEY
  ? `https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=${STADIA_KEY}`
  : `https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg`;

const tonerUrl = STADIA_KEY
  ? `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png?api_key=${STADIA_KEY}`
  : `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png`;

/**
 * Smooth fly-to helper. When `target` changes, animates the map there.
 */
function FlyTo({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, Math.max(map.getZoom(), 17), { duration: 1.2 });
    }
  }, [target, map]);
  return null;
}

/**
 * Tracks the current zoom level so we can fade in/out the detail layer.
 */
function ZoomTracker({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMap();
  useEffect(() => {
    onZoom(map.getZoom());
  }, [map, onZoom]);

  useMapEvents({
    zoomend: () => onZoom(map.getZoom()),
  });
  return null;
}

interface BugnaraMapProps {
  markers: FloweredSpotMarker[];
  selectedId: number | null;
  onMarkerClick: (id: number) => void;
  filterType: SpotType | 'ALL';
}

export function BugnaraMap({ markers, selectedId, onMarkerClick, filterType }: BugnaraMapProps) {
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const visibleMarkers = useMemo(
    () => markers.filter(m => filterType === 'ALL' || m.type === filterType),
    [markers, filterType]
  );

  useEffect(() => {
    if (selectedId === null) return;
    const m = markers.find(x => x.id === selectedId);
    if (m) setFlyTarget([Number(m.latitude), Number(m.longitude)]);
  }, [selectedId, markers]);

  /**
   * Detail-layer opacity strategy:
   *  - Zoom <= 15  : 0    (pure watercolor, far view)
   *  - Zoom 16-17  : fade in from 0 to 0.55
   *  - Zoom >= 18  : 0.75 (streets readable, watercolor still tinting)
   */
  const detailOpacity = useMemo(() => {
    if (zoom <= 15) return 0;
    if (zoom >= 18) return 0.75;
    return ((zoom - 15) / 3) * 0.75;
  }, [zoom]);

  return (
    <MapContainer
      center={BUGNARA_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      attributionControl={false}
      className="w-full h-full"
      style={{ background: '#f6efe2' }}
      maxBounds={L.latLngBounds([41.99, 13.82], [42.06, 13.91])}
      minZoom={14}
      maxZoom={19}
    >
      {/* LAYER 1 — Watercolor base (Stamen Watercolor via Stadia Maps). */}
      <TileLayer
        url={watercolorUrl}
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://stamen.com/">Stamen Design</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxNativeZoom={18}
        maxZoom={19}
      />

      {/* LAYER 2 — Detail overlay (Stamen Toner Lite, fades in at high zoom). */}
      <TileLayer
        url={tonerUrl}
        attribution=""
        opacity={detailOpacity}
        maxNativeZoom={20}
        maxZoom={20}
        className="map-detail-overlay"
      />

      <AttributionControl position="bottomright" prefix={false} />
      <ZoomTracker onZoom={setZoom} />

      {visibleMarkers.map(m => (
        <Marker
          key={m.id}
          position={[Number(m.latitude), Number(m.longitude)]}
          icon={iconFor(m.type)}
          eventHandlers={{
            click: () => onMarkerClick(m.id),
          }}
        />
      ))}

      <FlyTo target={flyTarget} />
    </MapContainer>
  );
}
