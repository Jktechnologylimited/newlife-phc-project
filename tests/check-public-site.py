"""Browser/HTTP smoke test. Run from repo root with the production server running.
Uses the cloud environment's Python Playwright + Chromium, not app dependencies.
NEWLIFE_BASE_URL and NEWLIFE_QA_DIR may override the defaults below.
"""
import json
import os
import struct
import urllib.error
import urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = os.environ.get('NEWLIFE_BASE_URL', 'http://127.0.0.1:3105')
ARTIFACTS = Path(os.environ.get('NEWLIFE_QA_DIR', '/tmp/newlife-premium-qa'))
ARTIFACTS.mkdir(parents=True, exist_ok=True)
PRIMARY = ['/', '/school/about', '/school/academics', '/school/gallery', '/school/contact', '/church', '/church/about', '/church/contact']
ATTRIBUTION = 'Powered by Newlife Baptist Church Technical Team'
PHONE = '+2348140823524'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    titles, links = set(), set()
    for path in PRIMARY:
        page.set_viewport_size({'width': 1440, 'height': 1000})
        response = page.goto(BASE + path, wait_until='networkidle')
        assert response.status == 200, (path, response.status)
        assert page.locator('h1').count() == 1, path
        title = page.title()
        assert title and title not in titles, path
        titles.add(title)
        assert page.locator('meta[name="description"]').get_attribute('content'), path
        assert page.locator('meta[property="og:title"]').count() == 1, path
        assert page.locator('meta[name="twitter:card"]').get_attribute('content') == 'summary_large_image', path
        # Current client configuration intentionally has no production origin.
        assert 'noindex' in page.locator('meta[name="robots"]').get_attribute('content'), path
        assert page.locator('link[rel="canonical"]').count() == 0, path
        assert page.locator('meta[property="og:image"]').count() == 0, path
        assert page.get_by_text(ATTRIBUTION, exact=True).count() == 1, path
        assert not any(text in page.locator('main').inner_text().lower() for text in ['coming soon', 'not yet been published', 'will appear here']), path
        for width in [320, 375, 768, 1024, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            page.evaluate('() => new Promise(resolve => requestAnimationFrame(resolve))')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (path, width, 'horizontal overflow')
        for image in page.locator('img:visible').all():
            image.scroll_into_view_if_needed()
            image.evaluate('(image) => image.decode()')
            assert image.evaluate('(image) => image.naturalWidth > 0'), path
        links.update(page.locator('a[href^="/"]').evaluate_all('(els) => els.map(e => e.getAttribute("href"))'))
        if path == '/' or path.startswith('/school'):
            assert page.locator(f'a[href="tel:{PHONE}"]').count() > 0, path
            for anchor in page.locator('a[href^="https://wa.me/"]').all():
                href = anchor.get_attribute('href')
                assert href.startswith('https://wa.me/2348140823524?text='), href
                assert 'Newlife' in urllib.parse.parse_qs(urllib.parse.urlsplit(href).query)['text'][0], href
        else:
            assert page.locator(f'a[href="tel:{PHONE}"]').count() == 0, path
        schema = page.locator('script[type="application/ld+json"]')
        if path in ['/', '/church']:
            data = json.loads(schema.inner_text())
            assert data['@type'] == ('School' if path == '/' else 'Church')
            assert 'url' not in data
        slug = path.strip('/').replace('/', '-') or 'home'
        page.evaluate('window.scrollTo(0,0)')
        page.screenshot(path=str(ARTIFACTS / f'{slug}-desktop.png'), full_page=True)
        page.set_viewport_size({'width': 375, 'height': 812})
        page.screenshot(path=str(ARTIFACTS / f'{slug}-mobile.png'), full_page=True)
        print('PASS page content, attribution, metadata, contacts, images, five viewport widths:', path, flush=True)

    # The school controls the root hero and has priority over the church section.
    page.goto(BASE, wait_until='networkidle')
    assert page.locator('.premium-hero').count() == 1
    assert page.locator('.premium-hero img').get_attribute('alt').startswith('Wide view of the Newlife Baptist School')
    assert page.get_by_role('link', name='Enquire About the School', exact=True).get_attribute('href') == '/school/contact'
    assert page.get_by_role('link', name='Explore Our Church', exact=True).get_attribute('href') == '/church'
    for width in [320, 375, 768, 1440]:
        page.set_viewport_size({'width': width, 'height': 812})
        heading = page.locator('.premium-hero h1').bounding_box()
        description = page.locator('.premium-hero .hero-description').bounding_box()
        actions = page.locator('.premium-hero .hero-actions').bounding_box()
        bottom = page.locator('.premium-hero .hero-bottom').bounding_box()
        assert heading['y'] + heading['height'] <= description['y']
        assert actions['y'] + actions['height'] <= bottom['y'], (width, 'hero controls overlap')
    print('PASS school-first hero, clear school/church actions and hero spacing', flush=True)

    page.set_viewport_size({'width': 375, 'height': 812})
    page.get_by_role('button', name='Open navigation menu').click()
    menu = page.get_by_role('dialog', name='Navigation menu')
    assert menu.is_visible()
    assert page.evaluate('getComputedStyle(document.body).overflow') == 'hidden'
    for _ in range(12):
        page.keyboard.press('Tab')
        assert menu.evaluate('(el) => el.contains(document.activeElement)')
    page.keyboard.press('Escape')
    assert not menu.is_visible()
    assert page.get_by_role('button', name='Open navigation menu').evaluate('(el) => el === document.activeElement')
    page.get_by_role('button', name='Open navigation menu').click()
    menu.get_by_role('link', name='Academics', exact=True).click()
    page.wait_for_url('**/school/academics')
    assert not menu.is_visible()
    page.get_by_role('button', name='Open navigation menu').click()
    page.set_viewport_size({'width': 1440, 'height': 1000})
    page.wait_for_function('!document.querySelector(".navigation-dialog").open')
    print('PASS mobile keyboard focus, Escape, navigation, scroll lock and desktop resize', flush=True)

    page.goto(BASE + '/school/gallery', wait_until='networkidle')
    photos = page.get_by_role('button', name='Enlarge photograph:', exact=False)
    assert photos.count() == 3
    for index in range(3):
        photos.nth(index).click()
        dialog = page.get_by_role('dialog').filter(has=page.get_by_role('button', name='Close enlarged photograph'))
        assert dialog.is_visible()
        dialog.locator('img').evaluate('(image) => image.decode()')
        assert dialog.locator('img').evaluate('(image) => image.naturalWidth > 0')
        page.keyboard.press('Escape')
        assert not dialog.is_visible()
    print('PASS three gallery photographs enlarge and close accessibly', flush=True)
    page.emulate_media(reduced_motion='reduce')
    page.goto(BASE, wait_until='networkidle')
    assert page.locator('.premium-hero h1').is_visible()
    assert page.evaluate('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'
    assert not errors, errors
    browser.close()

for path in links:
    assert urllib.request.urlopen(BASE + path, timeout=20).status == 200, path
print('PASS', len(links), 'unique internal destinations and no browser page errors', flush=True)

manifest = json.loads(Path('.next/prerender-manifest.json').read_text())
public = [path for path in manifest['routes'] if not path.startswith('/_') and path not in ['/robots.txt', '/sitemap.xml']]
html_count = 0
for path in public + ['/login', '/signup']:
    response = urllib.request.urlopen(BASE + path, timeout=20)
    assert response.status == 200, path
    if response.headers.get_content_type() == 'text/html':
        html = response.read().decode()
        assert ATTRIBUTION in html, path
        html_count += 1
print('PASS HTTP on', len(public) + 2, 'public/entry routes and exact attribution on', html_count, 'HTML pages (legacy content claims are not verified)', flush=True)

for name in ['school', 'school-story', 'school-learning', 'school-gallery', 'school-contact', 'church', 'church-story', 'church-contact']:
    response = urllib.request.urlopen(BASE + '/social/' + name + '.png')
    data = response.read()
    assert data.startswith(b'\x89PNG\r\n\x1a\n')
    assert struct.unpack('>II', data[16:24]) == (1200, 630)
    assert len(data) < 1_000_000, (name, len(data))
print('PASS eight 1200x630 social images below 1MB each', flush=True)

assert 'Disallow: /' in urllib.request.urlopen(BASE + '/robots.txt').read().decode()
assert '<loc>' not in urllib.request.urlopen(BASE + '/sitemap.xml').read().decode()
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs): return None
opener = urllib.request.build_opener(NoRedirect)
for path, status in [('/school', 308), ('/portal/admin', 307), ('/not-a-real-page', 404)]:
    try: opener.open(BASE + path, timeout=20)
    except urllib.error.HTTPError as error:
        assert error.code == status, (path, error.code)
        if path == '/school': assert error.headers['Location'] == '/'
        if path == '/portal/admin': assert '/login?next=' in error.headers['Location']
    else: raise AssertionError(path)
print('PASS prepublication robots/sitemap, school redirect, protected portal redirect and 404', flush=True)
print('Screenshots:', ARTIFACTS, flush=True)
