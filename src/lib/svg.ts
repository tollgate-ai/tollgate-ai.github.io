// Tollgate's diagrams are whole SVG files. Two of them sit on one page here, so
// each gets its own prefix on its ids, and the hero shows only part of its file.
export interface Options {
  prefix: string
  viewBox?: string
  drop?: RegExp[]
  // Remove each text that starts left of this x: the part of the file the view leaves out.
  textFrom?: number
}

export function prepare(raw: string, { prefix, viewBox, drop = [], textFrom }: Options): string {
  let svg = raw
    .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`)
    .replace(/aria-labelledby="([^"]+)"/, (_, ids: string) =>
      `aria-labelledby="${ids.split(/\s+/).map(id => `${prefix}-${id}`).join(' ')}"`)
    .replace(/<svg([^>]*?)\swidth="[^"]*"\sheight="[^"]*"/, '<svg$1')
  if (viewBox)
    svg = svg.replace(/viewBox="[^"]*"/, `viewBox="${viewBox}"`)
  for (const pattern of drop)
    svg = svg.replace(pattern, '')
  if (textFrom !== undefined)
    svg = svg.replace(/<text x="(-?[\d.]+)"[^>]*>[\s\S]*?<\/text>/g, (text, x: string) =>
      Number(x) < textFrom ? '' : text)
  return svg
}
