import { useEffect, useRef, useState, useMemo } from 'react';
import type { Donor } from '../types/donor';

interface KakaoMapProps {
  donors: Donor[];
  kakaoApiKey: string;
  kakaoRestApiKey: string;
}

interface RouteInfo {
  distance: number; // meters
  duration: number; // seconds
}

const GWANGMYEONG_CENTER = {
  lat: 37.4784878,
  lng: 126.8642888
};

const KakaoMap = ({ donors, kakaoApiKey, kakaoRestApiKey }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);

  // Filter donors with valid coordinates (memoized to prevent re-renders)
  const validDonors = useMemo(() => donors.filter(donor => donor.coordinates !== null), [donors]);

  // Load Kakao Maps SDK
  useEffect(() => {
    console.log('KakaoMap: Checking if Kakao SDK is already loaded...');
    console.log('KakaoMap: window.kakao exists?', typeof window.kakao !== 'undefined');
    console.log('KakaoMap: API Key:', kakaoApiKey);

    if (window.kakao && window.kakao.maps) {
      console.log('KakaoMap: SDK already loaded, setting isMapLoaded to true');
      setIsMapLoaded(true);
      return;
    }

    console.log('KakaoMap: Loading Kakao Maps SDK script...');
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('KakaoMap: Script loaded, calling kakao.maps.load()...');
      window.kakao.maps.load(() => {
        console.log('KakaoMap: Kakao Maps library loaded successfully');
        setIsMapLoaded(true);
      });
    };

    script.onerror = (error) => {
      console.error('KakaoMap: Failed to load script:', error);
      console.error('KakaoMap: Script URL:', script.src);
      console.error('KakaoMap: This usually means the API key is not authorized for this domain (localhost)');
      console.error('KakaoMap: Please check Kakao Developers Console > Your App > Platform > Web Platform');
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [kakaoApiKey]);

  // Initialize map (only once when map loads)
  useEffect(() => {
    console.log('KakaoMap: Initialize map effect triggered');
    console.log('KakaoMap: isMapLoaded:', isMapLoaded);
    console.log('KakaoMap: mapContainer.current:', mapContainer.current);

    if (!isMapLoaded || !mapContainer.current || mapRef.current) {
      console.log('KakaoMap: Skipping map initialization - conditions not met or map already exists');
      return;
    }

    console.log('KakaoMap: Creating map instance...');
    const options = {
      center: new window.kakao.maps.LatLng(GWANGMYEONG_CENTER.lat, GWANGMYEONG_CENTER.lng),
      level: 5
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);
    mapRef.current = map;
    console.log('KakaoMap: Map instance created successfully');

    // Add markers
    validDonors.forEach(donor => {
      const markerPosition = new window.kakao.maps.LatLng(
        donor.coordinates!.lat,
        donor.coordinates!.lng
      );

      // Create custom marker image based on donor type
      const markerImageSrc = getMarkerImageSrc(donor.type);
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(35, 45)
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
        title: donor.name
      });

      marker.setMap(map);

      // Add click event to marker
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedDonor(donor);
        map.setCenter(markerPosition);
      });
    });

    // Fit bounds to show all markers
    if (validDonors.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      validDonors.forEach(donor => {
        bounds.extend(new window.kakao.maps.LatLng(
          donor.coordinates!.lat,
          donor.coordinates!.lng
        ));
      });
      map.setBounds(bounds);
    }
  }, [isMapLoaded, validDonors]);

  const getMarkerImageSrc = (type: string): string => {
    // Create data URIs for colored markers
    const color = getMarkerColor(type);
    const svg = `
      <svg width="35" height="45" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28s12-19 12-28c0-6.627-5.373-12-12-12z"
              fill="${color}" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="12" r="5" fill="white"/>
      </svg>
    `;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
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

  // Get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('위치 정보를 사용할 수 없습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);

        // Add user location marker
        if (mapRef.current) {
          const markerPosition = new window.kakao.maps.LatLng(userPos.lat, userPos.lng);

          // Remove existing user marker if any
          if (userMarkerRef.current) {
            userMarkerRef.current.setMap(null);
          }

          // Create user location marker (blue dot)
          const userMarker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: mapRef.current,
            image: new window.kakao.maps.MarkerImage(
              'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="3"/>
                </svg>
              `),
              new window.kakao.maps.Size(24, 24)
            )
          });

          userMarkerRef.current = userMarker;
        }
      },
      (error) => {
        console.error('위치 정보를 가져올 수 없습니다:', error);
        alert('위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.');
      }
    );
  };

  // Find route from user location to selected donor
  const findRoute = async () => {
    if (!userLocation || !selectedDonor || !selectedDonor.coordinates) {
      getUserLocation();
      return;
    }

    setIsLoadingRoute(true);

    try {
      // Use Kakao Directions API (Walking mode)
      const response = await fetch(
        `https://apis-navi.kakaomobility.com/v1/directions?origin=${userLocation.lng},${userLocation.lat}&destination=${selectedDonor.coordinates.lng},${selectedDonor.coordinates.lat}&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`,
        {
          headers: {
            'Authorization': `KakaoAK ${kakaoRestApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('경로를 찾을 수 없습니다.');
      }

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const routeCoords: any[] = [];

        // Extract coordinates from route sections
        route.sections.forEach((section: any) => {
          section.roads.forEach((road: any) => {
            road.vertexes.forEach((vertex: number, index: number) => {
              if (index % 2 === 0) {
                routeCoords.push(
                  new window.kakao.maps.LatLng(
                    road.vertexes[index + 1],
                    vertex
                  )
                );
              }
            });
          });
        });

        // Draw polyline on map
        if (polylineRef.current) {
          polylineRef.current.setMap(null);
        }

        const polyline = new window.kakao.maps.Polyline({
          path: routeCoords,
          strokeWeight: 5,
          strokeColor: '#4285F4',
          strokeOpacity: 0.8,
          strokeStyle: 'solid'
        });

        polyline.setMap(mapRef.current);
        polylineRef.current = polyline;

        // Set route info
        setRouteInfo({
          distance: route.summary.distance,
          duration: route.summary.duration
        });

        // Fit bounds to show entire route
        const bounds = new window.kakao.maps.LatLngBounds();
        bounds.extend(new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng));
        bounds.extend(new window.kakao.maps.LatLng(selectedDonor.coordinates.lat, selectedDonor.coordinates.lng));
        mapRef.current.setBounds(bounds);
      }
    } catch (error) {
      console.error('경로 찾기 오류:', error);
      alert('경로를 찾을 수 없습니다. 대신 카카오맵 앱에서 길찾기를 시도해보세요.');
    } finally {
      setIsLoadingRoute(false);
    }
  };

  // Clear route
  const clearRoute = () => {
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (userMarkerRef.current) {
      userMarkerRef.current.setMap(null);
      userMarkerRef.current = null;
    }
    setRouteInfo(null);
    setUserLocation(null);
  };

  // Open in Kakao Maps app
  const openInKakaoMap = () => {
    if (!selectedDonor || !selectedDonor.coordinates) return;

    const kakaoMapUrl = `https://map.kakao.com/link/to/${encodeURIComponent(selectedDonor.name)},${selectedDonor.coordinates.lat},${selectedDonor.coordinates.lng}`;
    window.open(kakaoMapUrl, '_blank');
  };

  // Format distance
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  // Format duration
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `약 ${minutes}분`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `약 ${hours}시간 ${remainingMinutes}분`;
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '100%' }}
      />

      {/* Route info panel */}
      {routeInfo && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 999
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold' }}>경로 정보</h4>
          <p style={{ margin: '4px 0', fontSize: '13px' }}>거리: {formatDistance(routeInfo.distance)}</p>
          <p style={{ margin: '4px 0', fontSize: '13px' }}>소요 시간: {formatDuration(routeInfo.duration)}</p>
        </div>
      )}

      {/* Info popup */}
      {selectedDonor && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '300px',
            zIndex: 1000
          }}
        >
          <button
            onClick={() => setSelectedDonor(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 'bold', paddingRight: '20px' }}>
            {selectedDonor.name}
          </h3>
          <div style={{ fontSize: '14px', color: '#666' }}>
            <p style={{ margin: '8px 0' }}>
              <strong>유형:</strong> {selectedDonor.type === 'Government' ? '정부/공공기관' : selectedDonor.type === 'Corporate' ? '기업' : '개인'}
            </p>
            {selectedDonor.address && (
              <p style={{ margin: '8px 0' }}>
                <strong>주소:</strong> {selectedDonor.address}
              </p>
            )}
            {selectedDonor.primaryContact && (
              <p style={{ margin: '8px 0' }}>
                <strong>담당자:</strong> {selectedDonor.primaryContact}
              </p>
            )}
            {selectedDonor.phone && (
              <p style={{ margin: '8px 0' }}>
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
              <p style={{ margin: '8px 0' }}>
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
          </div>

          {/* Route finding buttons */}
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={findRoute}
              disabled={isLoadingRoute}
              style={{
                padding: '10px',
                backgroundColor: isLoadingRoute ? '#9CA3AF' : '#4285F4',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoadingRoute ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {isLoadingRoute ? '경로 계산 중...' : userLocation ? '🚗 길찾기' : '📍 내 위치에서 출발'}
            </button>

            {routeInfo && (
              <>
                <button
                  onClick={clearRoute}
                  style={{
                    padding: '8px',
                    backgroundColor: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  경로 삭제
                </button>
                <button
                  onClick={openInKakaoMap}
                  style={{
                    padding: '8px',
                    backgroundColor: '#FEE500',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 'bold'
                  }}
                >
                  카카오맵 앱에서 보기
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {!isMapLoaded && (
        <>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
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
              카카오맵을 불러오는 중...
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default KakaoMap;
