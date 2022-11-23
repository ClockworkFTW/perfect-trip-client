export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const roundCoords = ({ lat, lng }) => ({
  latitude: parseFloat(lat.toFixed(4)),
  longitude: parseFloat(lng.toFixed(4)),
});
