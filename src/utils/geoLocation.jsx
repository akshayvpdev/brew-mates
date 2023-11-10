export const handleGetLocation = () => {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          function (error) {
            reject(error);
          }
        );
      } else {
        reject("Geolocation is not available in this browser.");
      }
    });
  };
  

//   return (
//     <div>
//       {/* Other registration form fields */}

//       <button onClick={handleGetLocation}>Get Location</button>

//       {location && (
//         <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
//       )}
//     </div>
//   );
