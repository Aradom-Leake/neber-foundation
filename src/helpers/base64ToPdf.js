export default function base64ToPDF(base64String) {
  if (base64String.startsWith("JVB")) {
    base64String = "data:application/pdf;base64," + base64String;
    return base64String;
  } else if (base64String.startsWith("data:application/pdf;base64")) {
    return base64String;
  } else {
    return null;
  }
}
