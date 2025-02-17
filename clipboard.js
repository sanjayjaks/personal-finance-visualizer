export const copyToClipboard = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  } else {
    console.error("Clipboard API not supported.");
  }
};
