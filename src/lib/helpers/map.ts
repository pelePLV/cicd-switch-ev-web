// ===================================
// MAP UTILS - Map helper functions
// ===================================

/**
 * Calculate marker screen position from latitude/longitude coordinates
 * 
 * @description Converts geographic coordinates (lat/lng) of a marker to screen pixel coordinates.
 * Uses Google Maps Projection API to accurately calculate the position relative to the current map view.
 * This function accounts for current zoom level, map bounds, and projection to determine exact pixel position.
 * 
 * @param map - Google Maps instance (must be successfully loaded and initialized)
 * @param lat - Latitude coordinate of the marker (e.g., 17.9757 for Vientiane, Laos)
 * @param lng - Longitude coordinate of the marker (e.g., 102.6331 for Vientiane, Laos)
 * 
 * @returns Object containing x and y pixel coordinates relative to the map container
 * 
 * @example
 * ```typescript
 * const screenPos = calculateMarkerScreenPosition(map, 17.9757, 102.6331)
 * // Returns: { x: 450, y: 320 }
 * 
 * // Use with modal positioning
 * const adjustedPos = adjustPositionForBounds(screenPos.x, screenPos.y, 340, 300)
 * ```
 */
export const calculateMarkerScreenPosition = (
  map: google.maps.Map | null,
  lat: number, 
  lng: number
): { x: number; y: number } => {
  // Fallback position if map is not available or not ready
  if (!map) return { x: 800, y: 40 }
  
  // Get map projection for coordinate conversion - essential for lat/lng to pixel transformation
  const projection = map.getProjection()
  if (!projection) return { x: 800, y: 40 }
  
  // Get current visible bounds of the map viewport
  const bounds = map.getBounds()
  if (!bounds) return { x: 800, y: 40 }
  
  // Get current zoom level - affects scale calculation (zoom 10 = scale 1024)
  const zoom = map.getZoom()
  if (zoom === undefined) return { x: 800, y: 40 }
  
  // Convert geographic bounds to world pixel coordinates
  // topRight and bottomLeft define the visible area in world coordinate system
  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast())
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest())
  // Convert target marker coordinates to world pixel coordinates
  const worldPoint = projection.fromLatLngToPoint(new google.maps.LatLng(lat, lng))
  
  if (!topRight || !bottomLeft || !worldPoint) {
    return { x: 800, y: 40 }
  }
  
  // Calculate scale factor based on zoom level (higher zoom = larger scale)
  const scale = Math.pow(2, zoom)
  
  // Calculate final screen position relative to map container
  // worldPoint.x - bottomLeft.x = horizontal distance from left edge of visible area
  // worldPoint.y - topRight.y = vertical distance from top edge (negative because Y axis is flipped)
  const x = Math.floor((worldPoint.x - bottomLeft.x) * scale)
  const y = Math.floor((worldPoint.y - topRight.y) * scale)
  
  return { x, y }
}

/**
 * Adjust position to ensure modal stays within map bounds
 * 
 * @description Calculates optimal position for a modal/popup to ensure it remains fully visible 
 * within the map container. Prevents modals from being cut off at screen edges by automatically
 * repositioning them with appropriate padding. Uses the actual modal dimensions to make precise 
 * boundary calculations.
 * 
 * @param finalX - Initial X coordinate (horizontal position in pixels from left edge)
 * @param finalY - Initial Y coordinate (vertical position in pixels from top edge)  
 * @param containerWidth - Width of the modal/container in pixels (e.g., 340 for vehicle modal)
 * @param containerHeight - Height of the modal/container in pixels (e.g., 300 for vehicle modal)
 * 
 * @returns Object containing adjusted x and y coordinates that keep modal within bounds
 * 
 * @example
 * ```typescript
 * // For vehicle modal (340x300)
 * const adjustedPos = adjustPositionForBounds(450, 200, 340, 300)
 * // Returns: { x: 450, y: 200 } if fits, or adjusted coordinates if near edges
 * 
 * // For switch station modal (250x390) 
 * const adjustedPos = adjustPositionForBounds(800, 500, 250, 390)
 * // Returns: { x: 550, y: 110 } (adjusted to fit within 800x600 map)
 * 
 * // Use with marker position
 * const screenPos = calculateMarkerScreenPosition(map, lat, lng)
 * const safePos = adjustPositionForBounds(screenPos.x, screenPos.y, 340, 300)
 * ```
 */
export const adjustPositionForBounds = (
  finalX: number, 
  finalY: number, 
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } => {
  // Get map container element to determine viewport boundaries
  const mapElement = document.getElementById('googleMap')
  if (!mapElement) return { x: finalX, y: finalY }
  
  // Get actual map dimensions for boundary calculations
  const mapBounds = mapElement.getBoundingClientRect()
  
  // Adjust X position to prevent horizontal overflow
  // If modal would extend past right edge, move it left
  let adjustedX = finalX
  if (finalX + containerWidth > mapBounds.width) {
    adjustedX = mapBounds.width - containerWidth - 10 // 10px padding from edge
  }
  // Ensure modal doesn't go past left edge (minimum 10px from left)
  adjustedX = Math.max(10, adjustedX)
  
  // Adjust Y position to prevent vertical overflow
  // If modal would extend past bottom edge, move it up
  let adjustedY = finalY
  if (finalY + containerHeight > mapBounds.height) {
    adjustedY = mapBounds.height - containerHeight - 10 // 10px padding from edge
  }
  // Ensure modal doesn't go past top edge (minimum 10px from top)
  adjustedY = Math.max(10, adjustedY)
  
  return { x: adjustedX, y: adjustedY }
}
