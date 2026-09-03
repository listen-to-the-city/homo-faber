/**
 * 기능 플래그.
 *
 * 지도 UI는 사이트에서 숨기지만, 복구용 코드는 그대로 둔다.
 * true로 바꾸면 ConditionalLayout이 지도를 다시 렌더한다.
 *
 * 관련 파일:
 * - src/container/MapContainer.jsx
 * - src/components/common/Map2D.jsx
 * - src/components/common/Map3D.jsx
 * - src/hooks/usePOI.js
 */
export const MAP_FEATURE_ENABLED = false;
