"""Real-browser guide smoke checks; requires the cloud's Playwright/Chromium.
Run a production server first. Override NEWLIFE_BASE_URL if not on port 3107.
"""
import os
import urllib.parse
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get('NEWLIFE_BASE_URL', 'http://127.0.0.1:3107')
ARTIFACTS = Path('/tmp/newlife-guide-qa')
ARTIFACTS.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    errors, requests = [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('request', lambda request: requests.append(request.url))
    page.goto(BASE, wait_until='networkidle')
    launcher = page.get_by_role('button', name='Open Newlife site guide')
    launcher.click()
    guide = page.get_by_role('dialog', name='Newlife guide.')
    expect(guide).to_be_visible()
    assert 'Automated site guide' in guide.inner_text()
    expect(guide.get_by_role('button', name='Send question')).to_be_disabled()
    for width, height in [(320,568), (375,812), (768,1024), (1440,1000)]:
        page.set_viewport_size({'width':width, 'height':height})
        box = guide.bounding_box()
        assert box['x'] >= 0 and box['x'] + box['width'] <= width, (width,box)
        assert box['y'] >= 0 and box['y'] + box['height'] <= height, (height,box)
        assert guide.evaluate('(el)=>el.scrollWidth <= el.clientWidth'), (width,'panel overflow')
        assert guide.locator('.guide-form').is_visible()
        assert guide.locator('.guide-handoff').is_visible()
    page.set_viewport_size({'width':1440,'height':1000})
    page.screenshot(path=str(ARTIFACTS/'welcome-desktop.png'))
    guide.get_by_role('button',name='Tell me about the school',exact=True).click()
    expect(guide.locator('.guide-answer')).to_have_count(1)
    expect(guide.locator('.guide-answer')).to_contain_text('1994')
    expect(guide.get_by_role('link',name='Our school story')).to_be_visible()
    field = guide.get_by_role('textbox',name='Your question about Newlife')
    field.fill('What are the school fees?'); field.press('Enter')
    expect(guide.locator('.guide-answer')).to_have_count(2)
    answer = guide.locator('.guide-answer').last
    expect(answer).to_contain_text('not confirmed')
    page.wait_for_function('(() => { const log = document.querySelector(".guide-reading-area"); return log.scrollTop + log.clientHeight >= log.scrollHeight - 2; })()')
    assert '450,000' not in answer.inner_text()
    handoff = guide.get_by_role('link',name='Talk to the school team on WhatsApp')
    url = urllib.parse.urlsplit(handoff.get_attribute('href'))
    assert url.netloc=='wa.me' and url.path=='/2348140823524'
    assert 'My question: What are the school fees?' in urllib.parse.parse_qs(url.query)['text'][0]
    expect(handoff).to_have_attribute('rel','noopener noreferrer')
    page.set_viewport_size({'width':375,'height':812})
    page.screenshot(path=str(ARTIFACTS/'conversation-mobile.png'))
    for _ in range(15):
        page.keyboard.press('Tab')
        assert guide.evaluate('(el)=>el.contains(document.activeElement)')
    page.keyboard.press('Escape')
    expect(guide).not_to_be_visible()
    assert launcher.evaluate('(el)=>el===document.activeElement')
    print('PASS responsive panel, suggested answer, fees fallback, source links, WhatsApp handoff and keyboard focus',flush=True)

    launcher.click()
    guide.get_by_role('button',name='Start a new conversation').click()
    expect(guide.locator('.guide-answer')).to_have_count(0)
    field.fill('Tell me about the school'); field.press('Enter')
    guide.get_by_role('button',name='Start a new conversation').click()
    page.wait_for_timeout(400)
    expect(guide.locator('.guide-answer')).to_have_count(0)
    malicious='<img src=x onerror=alert(1)>'
    field.fill(malicious); field.press('Enter')
    expect(guide.locator('.guide-answer')).to_have_count(1)
    expect(guide.locator('.guide-user-message p')).to_have_text(malicious)
    assert guide.locator('.guide-user-message img').count()==0
    assert page.evaluate('localStorage.length')==0
    guide.get_by_role('button',name='Start a new conversation').click()
    guide.get_by_role('button',name='Tell me about the school',exact=True).click()
    expect(guide.locator('.guide-answer')).to_have_count(1)
    guide.get_by_role('link',name='Our school story').click()
    page.wait_for_url('**/school/about')
    expect(guide).not_to_be_visible()
    print('PASS reset cancels pending replies, plain-text input, no stored chat and source-page navigation',flush=True)

    page.goto(BASE+'/church',wait_until='networkidle')
    launcher.click()
    guide.get_by_role('button',name='What time are church services?',exact=True).click()
    expect(guide.locator('.guide-answer')).to_have_count(1)
    expect(guide.locator('.guide-answer')).to_contain_text('not confirmed')
    expect(guide.locator('.guide-handoff')).to_contain_text('not a verified church office number')
    assert '9:00 AM' not in guide.inner_text() and '11:00 AM' not in guide.inner_text()
    page.screenshot(path=str(ARTIFACTS/'church-guide-mobile.png'))
    print('PASS church questions keep school handoff distinct and avoid invented service times',flush=True)
    for path in ['/login','/signup','/forgot-password']:
        page.goto(BASE+path,wait_until='networkidle')
        assert page.get_by_role('button',name='Open Newlife site guide').count()==0
    assert not errors,errors
    assert not [url for url in requests if urllib.parse.urlsplit(url).hostname not in ['127.0.0.1','localhost']]
    print('PASS focused account screens, no remote AI requests and no browser errors',flush=True)
    print('Screenshots:',ARTIFACTS,flush=True)
    browser.close()
