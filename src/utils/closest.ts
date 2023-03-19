export function distance(
  pointA: { lat: number; lng: number },
  pointB: { lat: number; lng: number }
) {
  const p = 0.017453292519943295;
  const hav =
    0.5 -
    Math.cos((pointB.lat - pointA.lat) * p) / 2 +
    (Math.cos(pointA.lat * p) *
      Math.cos(pointB.lat * p) *
      (1 - Math.cos((pointB.lng - pointA.lng) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(hav));
}

export function closest(
  point: { lat: number; lng: number },
  data: { lat: number; lng: number }[]
) {
  return Math.min(...data.map((p) => distance(point, p)));
}
