import { useEffect, useRef, useState } from 'react';
import type { Donor } from '../types/donor';

interface KakaoMapProps {
  donors: Donor[];
  kakaoApiKey: string;
}

const GWANGMYEONG_CENTER = {
  lat: 37.4784878,
  lng: 126.8642888
};

const KakaoMap = ({ donors, kakaoApiKey }: KakaoMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  // Filter donors with valid coordinates
  const validDonors = donors.filter(donor => donor.coordinates !== null);

  // Load Kakao Maps SDK
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsMapLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [kakaoApiKey]);

  // Initialize map
  useEffect(() => {
    if (!isMapLoaded || !mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(GWANGMYEONG_CENTER.lat, GWANGMYEONG_CENTER.lng),
      level: 5
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);
    mapRef.current = map;

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

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={mapContainer}
        style={{ width: '100%', height: '100%' }}
      />

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
        </div>
      )}

      {/* Loading indicator */}
      {!isMapLoaded && (
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
      )}
    </div>
  );
};

export default KakaoMap;
