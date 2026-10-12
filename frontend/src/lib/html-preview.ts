/** Build a document for a sandboxed srcdoc frame, never for the app's DOM. */
export function htmlPreviewDocument(body: string, resourceUrl: string): string {
  const escapedUrl = resourceUrl
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
  // Prefix before any authored content so relative resources stay in the
  // selected storage. A leading doctype keeps standalone pages and fragments
  // in standards mode. The original source (including scripts) stays intact.
  return `<!doctype html>\n<base href="${escapedUrl}">\n${body}`
}
