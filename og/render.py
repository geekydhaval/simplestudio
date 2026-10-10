# Renders og/og.html to public/og.png (1200x630). Run: python3 og/render.py
import asyncio, pathlib
from playwright.async_api import async_playwright
here = pathlib.Path(__file__).resolve().parent
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await b.new_page(viewport={'width': 1200, 'height': 630})
        await pg.goto((here / 'og.html').as_uri())
        await pg.wait_for_timeout(1500)
        await pg.screenshot(path=str(here.parent / 'public' / 'og.png'))
        await b.close()
asyncio.run(main())
