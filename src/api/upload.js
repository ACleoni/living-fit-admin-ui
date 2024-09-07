
export const upload = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof File || value instanceof Blob) {
      // Add the optional filename parameter
      formData.append(key, value, value.name)
    } else {
      formData.append(key, value)
    }
  }
  
  fetch('http://localhost:8080/api/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}