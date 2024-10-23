function pdfToBase64(pdfFile) {
  const reader = new FileReader();
  reader.readAsDataURL(pdfFile);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

export default pdfToBase64;
