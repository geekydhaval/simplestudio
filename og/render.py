# Renders an OG design to a 1200x630 PNG.
#   python3 og/render.py                 -> og/og.html  -> public/og.png (the live one)
#   python3 og/render.py og-b out.png    -> og/og-b.html -> out.png
import asyncio, pathlib, sys
from playwright.async_api import async_playwright
here = pathlib.Path(__file__).resolve().parent
name = sys.argv[1] if len(sys.argv) > 1 else 'og'
out = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else here.parent / 'public' / 'og.png'
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1200, 'height': 630})
        await pg.goto((here / f'{name}.html').as_uri())
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path=str(out))
        await b.close()
asyncio.run(main())
