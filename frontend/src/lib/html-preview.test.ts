import { describe, expect, it } from 'vitest'

import { htmlPreviewDocument } from './html-preview'

describe('htmlPreviewDocument', () => {
  it('sets the resource base before authored markup without modifying scripts', () => {
    const body = '<!DOCTYPE html><html lang="zh"><body><script>const label = "你好"</script></body></html>'
    const document = htmlPreviewDocument(body, 'https://example.test/raw/local/reports/index.html')
    expect(document).toContain(
      '<!doctype html>\n<base href="https://example.test/raw/local/reports/index.html">\n',
    )
    expect(document).toContain('a[href^="#"]')
    expect(document).toContain(body)
  })

  it('escapes the base URL so it cannot inject attributes or markup', () => {
    const document = htmlPreviewDocument('<h1>Report</h1>', 'https://example.test/a?x="<script>&y=1')
    expect(document).toContain('href="https://example.test/a?x=&quot;&lt;script&gt;&amp;y=1"')
    expect(document).not.toContain('href="https://example.test/a?x="<script>')
  })
})
