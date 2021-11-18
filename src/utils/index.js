const translateCoords = (x, w) => {
  return (w * x) / 100
}

const getAngle = (arr) => {
  let a = Math.abs(arr[0] - arr[2])
  let b = Math.abs(arr[1] - arr[3])
  return Math.atan(b / a)
}

const getX = (r, x1, x2, angle) => {
  let k = 1
  if (x1 - x2 > 0) k = -1
  return r * Math.cos(angle) * k
}

const getY = (r, y1, y2, angle) => {
  let k = 1
  if (y1 - y2 > 0) k = -1
  return r * Math.sin(angle) * k
}

const toRadians = (angle) => {
  return (angle * Math.PI) / 180
}

export default {
  translateCoords,
  getAngle,
  getX,
  getY,
  toRadians
}
