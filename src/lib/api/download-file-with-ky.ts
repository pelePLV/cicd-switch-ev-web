import ky, { SearchParamsOption } from 'ky';

export async function downloadFileWithKy(
  url: string,
  searchParams: SearchParamsOption,
  fallbackFilename: string
) {
  try {
    const response = await ky.post(url, {
      searchParams,
      credentials: 'include',
    });

    const blob = await response.blob();

    // Try to extract filename from Content-Disposition
    const disposition = response.headers.get('Content-Disposition');
    const match = disposition?.match(/filename="?([^"]+)"?/);
    const filename = match?.[1] || fallbackFilename;

    // Trigger browser download
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download error:', error);
    alert('Download failed');
  }
}
