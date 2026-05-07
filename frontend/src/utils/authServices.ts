export function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  
  // Only return the header if the token is a valid string
  if (token && token !== "undefined") {
    return { Authorization: `Bearer ${token}` };
  }
  return {}; // Return empty object for guests
}