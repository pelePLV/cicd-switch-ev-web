export async function downloadFileFromPost(
  url: string,
  fallbackFilename: string
) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const blob = await response.blob();

    // Get filename from header or fallback
    const disposition = response.headers.get('Content-Disposition');
    const match = disposition?.match(/filename="?([^"]+)"?/);
    const filename = match?.[1] || fallbackFilename;

    // Trigger browser download
    const urlBlob = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = urlBlob;
    a.download = filename;
    a.click();
    a.remove();
    window.URL.revokeObjectURL(urlBlob);
  } catch (err) {
    console.error('Download failed:', err);
    alert('Failed to download file');
  }
}
