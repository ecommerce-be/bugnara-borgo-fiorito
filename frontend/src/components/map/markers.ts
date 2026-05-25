import L from 'leaflet';
import type { SpotType } from '../../types/api';

/**
 * Custom Leaflet markers in the form of small flower icons.
 *
 * We use divIcon (HTML-based) so we can render an SVG that respects
 * our palette and looks crafted, rather than the default blue pin
 * which would clash with the editorial aesthetic.
 *
 * Two variants:
 *  - PRIVATE_HOUSE  -> bloom rose (#c87f6f)
 *  - PUBLIC_SPACE   -> leaf green (#4a6741)
 */

const flowerSvg = (color: string, ring: string) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <g transform="translate(20 20)">
      <ellipse cx="0" cy="-10" rx="6" ry="8" fill="${color}" opacity="0.95"/>
      <ellipse cx="9.5" cy="-3" rx="6" ry="8" fill="${color}" opacity="0.95" transform="rotate(72)"/>
      <ellipse cx="6" cy="8" rx="6" ry="8" fill="${color}" opacity="0.95" transform="rotate(144)"/>
      <ellipse cx="-6" cy="8" rx="6" ry="8" fill="${color}" opacity="0.95" transform="rotate(216)"/>
      <ellipse cx="-9.5" cy="-3" rx="6" ry="8" fill="${color}" opacity="0.95" transform="rotate(288)"/>
      <circle cx="0" cy="0" r="4" fill="${ring}"/>
      <circle cx="0" cy="0" r="1.8" fill="#f6efe2"/>
    </g>
  </svg>
`;

function makeIcon(type: SpotType): L.DivIcon {
  const color = type === 'PRIVATE_HOUSE' ? '#c87f6f' : '#4a6741';
  const ring  = type === 'PRIVATE_HOUSE' ? '#a55a4a' : '#324628';

  return L.divIcon({
    html: `<div class="spot-marker">${flowerSvg(color, ring)}</div>`,
    className: '', // remove default leaflet styling
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -16],
  });
}

export const privateHouseIcon = makeIcon('PRIVATE_HOUSE');
export const publicSpaceIcon  = makeIcon('PUBLIC_SPACE');

export function iconFor(type: SpotType): L.DivIcon {
  return type === 'PRIVATE_HOUSE' ? privateHouseIcon : publicSpaceIcon;
}
