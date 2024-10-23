export default function downloadPdf(base64String, fileName) {
    const linkSource = base64String;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }