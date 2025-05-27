import {jwtDecode} from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // en segundos

    return decoded.exp < currentTime;
  } catch (e) {
    console.error("Error decodificando el token:", e);
    return true; // Si no se puede decodificar, asumimos que no es válido
  }
}
export default isTokenExpired;