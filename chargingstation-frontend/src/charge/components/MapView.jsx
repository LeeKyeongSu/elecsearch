import { useEffect, useRef, memo, useState } from 'react';
import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { useNavigate, useLocation } from 'react-router-dom';

const MapView = memo(({ setChargerData, center, zoomLevel }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 필터 상태를 관리합니다.
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(location.search);
    const filtersObj = {};
    params.forEach((value, key) => {
      filtersObj[key] = value;
    });
    return filtersObj;
  });

  // URL 쿼리 파라미터가 변경될 때 필터를 업데이트합니다.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filtersObj = {};
    params.forEach((value, key) => {
      filtersObj[key] = value;
    });
    setFilters(filtersObj);
  }, [location.search]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      const map = new window.kakao.maps.Map(mapContainer.current, {
        center: new window.kakao.maps.LatLng(37.3595704, 127.105399),
        level: 5,
      });

      mapRef.current = map;

      const updateMarkers = debounce(async () => {
        const center = map.getCenter();
        const lat = center.getLat();
        const lng = center.getLng();

        try {
          const queryParams = new URLSearchParams(filters).toString();
          const response = await fetch(`http://34.47.120.150:8080/charger/list?${queryParams}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userLatitude: lat,
              userLongitude: lng,
            }),
          });

          if (!response.ok) {
            throw new Error('네트워크 연결이 원활하지 않습니다.');
          }

          const data = await response.json();
          setChargerData(data);

          markersRef.current.forEach(marker => marker.setMap(null));
          markersRef.current = [];

          data.forEach(charger => {
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(charger.lat, charger.lng),
              map: mapRef.current,
              title: charger.statNm,
            });

            // 마커 클릭 시 정보창 표시 및 페이지 이동
            window.kakao.maps.event.addListener(marker, 'click', () => {
              navigate(`/charge/place/${charger.statId}`); // 페이지 이동

              // 지도 중심을 클릭한 마커의 위치로 이동
              mapRef.current.setCenter(marker.getPosition());

              // 줌 레벨을 조정 (예: 3으로 설정)
              mapRef.current.setLevel(3);
            });

            markersRef.current.push(marker);
          });
        } catch (error) {
          console.error('충전소 데이터를 불러오는 중 에러가 발생하였습니다:', error);
        }
      }, 300);

      window.kakao.maps.event.addListener(map, 'bounds_changed', updateMarkers);
      updateMarkers();

      if (center) {
        map.setCenter(new window.kakao.maps.LatLng(center.lat, center.lng));
        map.setLevel(zoomLevel);
      }
    }
  }, [filters, center, zoomLevel, setChargerData]);

  return (
    <Box position="relative" width="100%" height="calc(100vh - 60px)" bg="gray.200">
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }}></div>
    </Box>
  );
});

export default MapView;