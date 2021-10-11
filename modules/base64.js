export const UriToBase64 = blob => {
    return new Promise((resolve, reject) => {
      if (window.FileReader) {
        const reader = new window.FileReader();
        if (blob && blob.type.match('image.*')) {
          reader.readAsDataURL(blob);
          reader.onerror = reject;
        } else {
          reject(new Error('Bad type, must be image'));
        }
        reader.onloadend = () => resolve(reader.result);
      } else {
        reject(new Error('No FileReader on window'));
      }
    });
  };
  
export default {
    UriToBase64,
};