import { useState, useCallback, useEffect, useRef } from 'react';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl } from 'react-map-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Donor } from '../types/donor';
import type { MapRef } from 'react-map-gl';

interface DonorMapProps {
  donors: Donor[];
  mapboxToken: string;
  onMapReady?: (mapActions: {
    zoomToType: (type: string) => void;
    fitAllMarkers: () => void;
  }) => void;
}

const GWANGMYEONG_CENTER = {
  latitude: 37.4784878,
  longitude: 126.8642888,
  zoom: 13
};

const DonorMap = ({ donors, mapboxToken, onMapReady }: DonorMapProps) => {
  const mapRef = useRef<MapRef>(null);
  const initialFitDone = useRef(false);
  const onMapReadyCalled = useRef(false);
  const [viewState, setViewState] = useState(GWANGMYEONG_CENTER);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);
  const [is3DEnabled, setIs3DEnabled] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Filter donors with valid coordinates
  const validDonors = donors.filter(donor => donor.coordinates !== null);

  // Failsafe: Remove loading spinner after 5 seconds even if map doesn't load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isMapLoading) {
        console.warn('Map loading timeout - forcing loading state to false');
        setIsMapLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [isMapLoading]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMarkerClick = useCallback((donor: Donor) => {
    setSelectedDonor(donor);
  }, []);

  // Function to fit all markers in view
  const fitAllMarkers = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (validDonors.length === 0) return;

    if (validDonors.length === 1) {
      // If only one marker, center on it
      const donor = validDonors[0];
      map.flyTo({
        center: [donor.coordinates!.lng, donor.coordinates!.lat],
        zoom: 15,
        duration: 1000
      });
    } else {
      // Fit bounds to all markers
      const coords = validDonors.map(d => [d.coordinates!.lng, d.coordinates!.lat] as [number, number]);
      map.fitBounds(
        coords.reduce((bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        ),
        {
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          duration: 1000
        }
      );
    }
  }, [validDonors]);

  // Function to zoom to donors of a specific type
  const zoomToType = useCallback((type: string) => {
    console.log(`zoomToType called for type: ${type}`);
    if (!mapRef.current) {
      console.log('mapRef not available');
      return;
    }
    const map = mapRef.current;

    const typeDonors = validDonors.filter(d => d.type === type);
    console.log(`Found ${typeDonors.length} donors of type ${type}:`, typeDonors);

    if (typeDonors.length === 0) {
      console.log('No donors found for this type');
      return;
    }

    if (typeDonors.length === 1) {
      // If only one marker of this type, center on it
      const donor = typeDonors[0];
      console.log(`Flying to single donor:`, donor.coordinates);
      map.flyTo({
        center: [donor.coordinates!.lng, donor.coordinates!.lat],
        zoom: 15,
        duration: 1000
      });
    } else {
      // Fit bounds to all markers of this type
      const coords = typeDonors.map(d => [d.coordinates!.lng, d.coordinates!.lat] as [number, number]);
      console.log(`Fitting bounds to ${coords.length} markers`);
      map.fitBounds(
        coords.reduce((bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(coords[0], coords[0])
        ),
        {
          padding: { top: 80, bottom: 80, left: 80, right: 80 },
          duration: 1000
        }
      );
    }
  }, [validDonors]);

  // Enable 3D terrain and buildings when map loads
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    const handleMapLoad = () => {
      console.log('Map load event fired');
      // Set loading to false when map loads
      setIsMapLoading(false);

      // Add terrain source
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
      }

      // Add 3D buildings layer
      try {
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
        )?.id;

        if (!map.getLayer('3d-buildings')) {
          map.addLayer(
            {
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 14,
              paint: {
                'fill-extrusion-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'height'],
                  0, '#d1d3d4',
                  50, '#a8aaab',
                  100, '#7f8183'
                ],
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  14,
                  0,
                  14.5,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  14,
                  0,
                  14.5,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.8
              }
            },
            labelLayerId
          );
          console.log('3D buildings layer added successfully');
        }
      } catch (error) {
        console.error('Error adding 3D buildings layer:', error);
      }

      // Enable terrain if 3D is on
      if (is3DEnabled && !map.getTerrain()) {
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }
    };

    if (map.isStyleLoaded()) {
      handleMapLoad();
    } else {
      map.on('load', handleMapLoad);
    }

    // Apply Korean language to map labels
    const languageControl = new MapboxLanguage({
      defaultLanguage: 'ko',
      excludedLayerIds: [] // Don't exclude any layers
    });

    const applyKoreanLanguage = () => {
      try {
        // Add the control which automatically sets the language to Korean
        map.addControl(languageControl);
        console.log('Korean language control added to map');
      } catch (error) {
        console.error('Error applying Korean language:', error);
      }
    };

    // Apply language after a short delay to ensure style is ready
    const timeoutId = setTimeout(() => {
      if (map.isStyleLoaded()) {
        applyKoreanLanguage();
      }
    }, 500);

    // Also listen for style load event
    map.once('idle', () => {
      applyKoreanLanguage();
    });

    return () => {
      clearTimeout(timeoutId);
      map.off('load', handleMapLoad);
      map.off('idle', applyKoreanLanguage);
    };
  }, [is3DEnabled]);

  // Fit all markers on initial map load (only once)
  useEffect(() => {
    if (!mapRef.current || isMapLoading || initialFitDone.current) return;
    const map = mapRef.current.getMap();

    const handleInitialFit = () => {
      if (validDonors.length > 0 && !initialFitDone.current) {
        console.log('Running initial fitAllMarkers');
        initialFitDone.current = true;
        fitAllMarkers();
      }
    };

    // Use 'idle' event to ensure map is fully ready
    if (map.isStyleLoaded()) {
      // If already loaded, wait for next idle state
      map.once('idle', handleInitialFit);
    } else {
      // Wait for load and then idle
      map.once('load', () => {
        map.once('idle', handleInitialFit);
      });
    }

    return () => {
      map.off('idle', handleInitialFit);
      map.off('load', handleInitialFit);
    };
  }, [fitAllMarkers, isMapLoading, validDonors.length]);

  // Pass zoom functions to parent component when map is ready (only once)
  useEffect(() => {
    if (!isMapLoading && onMapReady && !onMapReadyCalled.current) {
      onMapReadyCalled.current = true;
      onMapReady({
        zoomToType,
        fitAllMarkers
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapLoading]);

  const toggle3DView = () => {
    const newIs3D = !is3DEnabled;
    setIs3DEnabled(newIs3D);

    const map = mapRef.current?.getMap();
    if (!map || !map.isStyleLoaded()) return;

    if (newIs3D) {
      setPitch(60);
      setBearing(20);

      // Add terrain source if not exists
      if (!map.getSource('mapbox-dem')) {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
      }

      // Enable terrain with exaggeration
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Add and show 3D buildings
      if (!map.getLayer('3d-buildings')) {
        // Add 3D buildings layer if it doesn't exist
        try {
          const layers = map.getStyle().layers;
          const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
          )?.id;

          map.addLayer(
            {
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 14,
              paint: {
                'fill-extrusion-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'height'],
                  0, '#d1d3d4',
                  50, '#a8aaab',
                  100, '#7f8183'
                ],
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  14,
                  0,
                  14.5,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  14,
                  0,
                  14.5,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.8
              }
            },
            labelLayerId
          );
          console.log('3D buildings layer added in toggle');
        } catch (error) {
          console.error('Error adding 3D buildings layer:', error);
        }
      } else {
        // Layer exists, just make it visible
        map.setLayoutProperty('3d-buildings', 'visibility', 'visible');
        console.log('3D buildings layer set to visible');
      }

      // Note: Removed automatic zoom to prevent interfering with other zoom operations
    } else {
      setPitch(0);
      setBearing(0);

      // Disable terrain
      map.setTerrain(null);

      // Hide 3D buildings
      if (map.getLayer('3d-buildings')) {
        map.setLayoutProperty('3d-buildings', 'visibility', 'none');
      }
    }
  };

  const getMarkerColor = (type: string): string => {
    switch (type) {
      case 'Government':
        return '#3B82F6'; // Blue
      case 'Corporate':
        return '#10B981'; // Green
      case 'Individual':
        return '#F59E0B'; // Orange
      default:
        return '#6B7280'; // Gray
    }
  };

  // Helper component for pin icon
  const PinIcon = ({ color, size = 16 }: { color: string; size?: number }) => (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28s12-19 12-28c0-6.627-5.373-12-12-12z"
        fill={color}
        stroke="white"
        strokeWidth="2"
      />
      <circle cx="16" cy="12" r="5" fill="white" />
    </svg>
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        ref={mapRef}
        {...viewState}
        pitch={pitch}
        bearing={bearing}
        onMove={evt => setViewState(evt.viewState)}
        onLoad={() => {
          console.log('Map onLoad callback fired');
          setIsMapLoading(false);
        }}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        dragRotate={true}
        touchPitch={true}
        touchZoomRotate={true}
        pitchWithRotate={true}
      >
        {/* Navigation Controls */}
        <NavigationControl position="top-right" showCompass={true} showZoom={true} visualizePitch={true} />
        <FullscreenControl position="top-right" />
        <ScaleControl />

        {/* Donor Markers */}
        {validDonors.map((donor) => (
          <Marker
            key={donor.id}
            latitude={donor.coordinates!.lat}
            longitude={donor.coordinates!.lng}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(donor);
            }}
          >
            <div
              style={{
                cursor: 'pointer',
                transform: 'translate(-50%, -100%)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
              }}
              title={donor.name}
            >
              <svg
                width="32"
                height="40"
                viewBox="0 0 32 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28s12-19 12-28c0-6.627-5.373-12-12-12z"
                  fill={getMarkerColor(donor.type)}
                  stroke="white"
                  strokeWidth="2"
                />
                <circle cx="16" cy="12" r="5" fill="white" />
              </svg>
            </div>
          </Marker>
        ))}

        {/* Popup for selected donor */}
        {selectedDonor && selectedDonor.coordinates && (
          <Popup
            latitude={selectedDonor.coordinates.lat}
            longitude={selectedDonor.coordinates.lng}
            anchor="top"
            onClose={() => setSelectedDonor(null)}
            closeOnClick={false}
            style={{ maxWidth: '300px' }}
          >
            <div style={{ padding: '8px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                {selectedDonor.name}
              </h3>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <p style={{ margin: '4px 0' }}>
                  <strong>유형:</strong> {selectedDonor.type === 'Government' ? '정부/공공기관' : selectedDonor.type === 'Corporate' ? '기업' : '개인'}
                </p>
                {selectedDonor.primaryContact && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>담당자:</strong> {selectedDonor.primaryContact}
                  </p>
                )}
                {selectedDonor.phone && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>전화:</strong>{' '}
                    <a
                      href={`tel:${selectedDonor.phone}`}
                      style={{
                        color: '#3B82F6',
                        textDecoration: 'none',
                        borderBottom: '1px solid #3B82F6'
                      }}
                    >
                      {selectedDonor.phone}
                    </a>
                  </p>
                )}
                {selectedDonor.email && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>이메일:</strong>{' '}
                    <a
                      href={`mailto:${selectedDonor.email}`}
                      style={{
                        color: '#3B82F6',
                        textDecoration: 'none',
                        borderBottom: '1px solid #3B82F6'
                      }}
                    >
                      {selectedDonor.email}
                    </a>
                  </p>
                )}
                {selectedDonor.address && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>주소:</strong> {selectedDonor.address}
                  </p>
                )}
                {selectedDonor.notes && (
                  <p style={{ margin: '4px 0' }}>
                    <strong>메모:</strong> {selectedDonor.notes}
                  </p>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* 3D Toggle Button */}
      <button
        onClick={toggle3DView}
        style={{
          position: 'absolute',
          top: isMobile ? 'auto' : '10px',
          bottom: isMobile ? '120px' : 'auto',
          left: '10px',
          zIndex: 1,
          padding: isMobile ? '12px 16px' : '10px 20px',
          backgroundColor: !is3DEnabled ? '#fff' : '#3B82F6',
          color: !is3DEnabled ? '#000' : '#fff',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: isMobile ? '16px' : '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          minHeight: '44px', // iOS minimum touch target
        }}
      >
        {!is3DEnabled ? '🏔️ 3D 지형 켜기' : '🗺️ 3D 지형 끄기'}
      </button>

      {/* Fit All Markers Button */}
      <button
        onClick={fitAllMarkers}
        style={{
          position: 'absolute',
          top: isMobile ? 'auto' : '60px',
          bottom: isMobile ? '70px' : 'auto',
          left: '10px',
          zIndex: 1,
          padding: isMobile ? '12px 16px' : '10px 20px',
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: isMobile ? '16px' : '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          minHeight: '44px',
        }}
      >
        🎯 전체 보기
      </button>

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '10px',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          fontSize: '12px'
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>후원자 유형 (클릭하여 확대)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => zoomToType('Government')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <PinIcon color="#3B82F6" size={20} />
            <span>정부/공공기관</span>
          </button>
          <button
            onClick={() => zoomToType('Corporate')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <PinIcon color="#10B981" size={20} />
            <span>기업</span>
          </button>
          <button
            onClick={() => zoomToType('Individual')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <PinIcon color="#F59E0B" size={20} />
            <span>개인</span>
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isMapLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(249, 250, 251, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '4px solid #E5E7EB',
              borderTop: '4px solid #3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p style={{ marginTop: '16px', color: '#6B7280', fontSize: '14px' }}>
            지도를 불러오는 중...
          </p>
        </div>
      )}
    </div>
  );
};

export default DonorMap;
