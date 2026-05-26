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
 * Tile provider: CARTO Voyager (no API key, free for non-commercial use).
 *
 * Why CARTO Voyager:
 *  - Clean editorial style that pairs well with our "paper and stone" design
 *  - No registration / API key / domain whitelist
 *  - Generous bandwidth, no rate limit issues for our scale
 *  - Subdomain rotation (a/b/c/d) speeds up parallel tile loading
 *
 * If we ever want the original Stamen Watercolor aesthetic back, we can
 * subscribe to Stadia Maps "Lite" plan and swap these URLs.
 */
const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ' +
  '&copy; <a href="https://carto.com/attributions">CARTO</a>';

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
 * Tracks the current zoom level (kept for future visual effects).
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
  const [, setZoom] = useState(DEFAULT_ZOOM);

  const visibleMarkers = useMemo(
    () => markers.filter(m => filterType === 'ALL' || m.type === filterType),
    [markers, filterType]
  );

  useEffect(() => {
    if (selectedId === null) return;
    const m = markers.find(x => x.id === selectedId);
    if (m) setFlyTarget([Number(m.latitude), Number(m.longitude)]);
  }, [selectedId, markers]);

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
      <TileLayer
        url={TILE_URL}
        attribution={TILE_ATTRIBUTION}
        subdomains={['a', 'b', 'c', 'd']}
        maxZoom={19}
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
