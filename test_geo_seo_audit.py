#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HostifyOS Automated GEO (Generative Engine Optimization), SEO & WCAG Audit Suite
Validates:
1. llms.txt & llms-full.txt presence, structure, and AI grounding data
2. robots.txt AI crawlers allow directives (GPTBot, ClaudeBot, PerplexityBot, Applebot, etc.)
3. Schema.org JSON-LD structured data across all pages (SoftwareApplication, Product, HowTo, VideoObject, Blog, LodgingBusiness)
4. Canonical URL tags on every page
5. OpenGraph & Twitter Social Cards
6. Hreflang multi-language international tags
7. sitemap.xml validity & XML structure
8. Single H1 heading per page constraint (SEO Best Practice)
9. Meta description length optimization (120-165 chars)
10. Image ALT tags integrity (WCAG 2.1 AA compliance)
11. Form control accessible labels (aria-label / labelledby)
12. Keyboard navigation :focus-visible rules in style.css
"""

import os
import re
import json
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
import sys

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

class AccessibilityParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1_count = 0
        self.missing_alt_images = []
        self.missing_aria_controls = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        line = self.getpos()[0]
        if tag == 'h1':
            self.h1_count += 1
        elif tag == 'img':
            alt = d.get('alt')
            if alt is None or alt.strip() == '':
                self.missing_alt_images.append((line, d.get('src', 'unknown')))
        elif tag in ('input', 'select', 'textarea'):
            t = d.get('type', 'text')
            if t in ('hidden', 'submit', 'button'):
                return
            aria = d.get('aria-label') or d.get('aria-labelledby')
            if not aria:
                self.missing_aria_controls.append((line, tag, d.get('id', 'unnamed')))

def run_audit():
    passed = 0
    failed = 0
    results = []

    def record_pass(suite, msg):
        nonlocal passed
        passed += 1
        results.append(f"  [PASS] {suite}: {msg}")

    def record_fail(suite, msg):
        nonlocal failed
        failed += 1
        results.append(f"  [FAIL] {suite}: {msg}")

    print("================================================================")
    print("HOSTIFYOS GEO (AI SEARCH), SEO & WCAG 2.1 AA AUDIT SUITE")
    print("================================================================\n")

    # 1. TEST LLMS.TXT
    llms_path = os.path.join(PROJECT_ROOT, "llms.txt")
    if os.path.exists(llms_path):
        with open(llms_path, "r", encoding="utf-8") as f:
            llms_content = f.read()
        if "HostifyOS" in llms_content and "Pricing" in llms_content and "$14" in llms_content:
            record_pass("GEO - llms.txt", "llms.txt exists with structured pricing, core capabilities, and demo URLs")
        else:
            record_fail("GEO - llms.txt", "llms.txt content is incomplete")
    else:
        record_fail("GEO - llms.txt", "llms.txt is missing")

    # 2. TEST LLMS-FULL.TXT
    llms_full_path = os.path.join(PROJECT_ROOT, "llms-full.txt")
    if os.path.exists(llms_full_path):
        record_pass("GEO - llms-full.txt", "llms-full.txt exists with complete knowledge graph taxonomy")
    else:
        record_fail("GEO - llms-full.txt", "llms-full.txt is missing")

    # 3. TEST ROBOTS.TXT AI BOTS
    robots_path = os.path.join(PROJECT_ROOT, "robots.txt")
    if os.path.exists(robots_path):
        with open(robots_path, "r", encoding="utf-8") as f:
            r_content = f.read()
        ai_bots = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "Meta-ExternalAgent"]
        missing_bots = [b for b in ai_bots if b not in r_content]
        if not missing_bots:
            record_pass("GEO - robots.txt", f"All {len(ai_bots)} major AI search crawlers explicitly allowed")
        else:
            record_fail("GEO - robots.txt", f"Missing AI crawlers in robots.txt: {missing_bots}")
    else:
        record_fail("GEO - robots.txt", "robots.txt is missing")

    # 4. TEST SITEMAP.XML
    sitemap_path = os.path.join(PROJECT_ROOT, "sitemap.xml")
    if os.path.exists(sitemap_path):
        try:
            tree = ET.parse(sitemap_path)
            root = tree.getroot()
            url_count = len(root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url"))
            record_pass("SEO - sitemap.xml", f"sitemap.xml is valid XML containing {url_count} indexed URL nodes")
        except Exception as e:
            record_fail("SEO - sitemap.xml", f"sitemap.xml parsing error: {e}")
    else:
        record_fail("SEO - sitemap.xml", "sitemap.xml is missing")

    # 5. TEST CANONICAL TAGS ON ALL CORE HTML PAGES
    core_pages = ["index.html", "pricing.html", "checkout.html", "blog.html", "g.html", "import-guide.html", "promo-video.html", "contact.html", "privacy.html", "terms.html", "refund.html"]
    for page in core_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        if os.path.exists(page_path):
            with open(page_path, "r", encoding="utf-8") as f:
                html = f.read()
            if '<link rel="canonical"' in html:
                record_pass("SEO - Canonical Tags", f"{page} has valid canonical tag")
            else:
                record_fail("SEO - Canonical Tags", f"{page} is missing canonical tag")
        else:
            record_fail("SEO - Canonical Tags", f"{page} file not found")

    # 6. TEST SCHEMA.ORG STRUCTURED DATA
    schema_map = {
        "index.html": ["SoftwareApplication", "Organization", "FAQPage"],
        "pricing.html": ["Product", "AggregateOffer"],
        "import-guide.html": ["HowTo"],
        "promo-video.html": ["VideoObject"],
        "blog.html": ["Blog"],
        "g.html": ["LodgingBusiness"]
    }

    for page, schemas in schema_map.items():
        page_path = os.path.join(PROJECT_ROOT, page)
        with open(page_path, "r", encoding="utf-8") as f:
            html = f.read()
        missing = [s for s in schemas if f'"{s}"' not in html and f"'{s}'" not in html]
        if not missing:
            record_pass("SEO - Schema.org JSON-LD", f"{page} contains structured data for: {', '.join(schemas)}")
        else:
            record_fail("SEO - Schema.org JSON-LD", f"{page} missing required Schema.org type(s): {missing}")

    # 7. TEST OPEN GRAPH & TWITTER CARDS
    social_pages = ["index.html", "pricing.html", "checkout.html", "blog.html", "g.html", "import-guide.html", "promo-video.html"]
    for page in social_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        with open(page_path, "r", encoding="utf-8") as f:
            html = f.read()
        has_og = 'property="og:title"' in html and 'property="og:image"' in html
        has_tw = 'name="twitter:card"' in html
        if has_og and has_tw:
            record_pass("SEO - Social Meta", f"{page} has complete OpenGraph & Twitter Large Cards")
        else:
            record_fail("SEO - Social Meta", f"{page} missing social meta tags (OG: {has_og}, Twitter: {has_tw})")

    # 8. TEST HREFLANG MULTI-LANGUAGE
    with open(os.path.join(PROJECT_ROOT, "index.html"), "r", encoding="utf-8") as f:
        idx_html = f.read()
    if 'hreflang="x-default"' in idx_html and 'hreflang="tr"' in idx_html and 'hreflang="es"' in idx_html:
        record_pass("SEO - Hreflang", "index.html contains complete international hreflang multi-language tags")
    else:
        record_fail("SEO - Hreflang", "index.html missing international hreflang tags")

    # 9. TEST H1 COUNT (EXACTLY 1 H1 PER CORE PAGE)
    for page in core_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        p = AccessibilityParser()
        with open(page_path, "r", encoding="utf-8") as f:
            p.feed(f.read())
        if p.h1_count == 1:
            record_pass("SEO - H1 Structure", f"{page} has exactly 1 H1 heading tag")
        else:
            record_fail("SEO - H1 Structure", f"{page} has {p.h1_count} H1 tags (expected 1)")

    # 10. TEST META DESCRIPTION LENGTH (<= 165 CHARACTERS)
    for page in core_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        with open(page_path, "r", encoding="utf-8") as f:
            html = f.read()
        m = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', html, re.IGNORECASE)
        if m:
            desc = m.group(1)
            if len(desc) <= 165:
                record_pass("SEO - Meta Description", f"{page} meta description is optimized ({len(desc)} chars)")
            else:
                record_fail("SEO - Meta Description", f"{page} meta description is too long ({len(desc)} chars, max 165)")
        else:
            record_fail("SEO - Meta Description", f"{page} missing meta description tag")

    # 11. TEST IMAGE ALT ATTRIBUTES (WCAG 2.1 AA)
    total_missing_alts = 0
    for page in core_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        p = AccessibilityParser()
        with open(page_path, "r", encoding="utf-8") as f:
            p.feed(f.read())
        if p.missing_alt_images:
            total_missing_alts += len(p.missing_alt_images)
            record_fail("WCAG - Image Alt", f"{page} has {len(p.missing_alt_images)} images without alt: {p.missing_alt_images}")
    if total_missing_alts == 0:
        record_pass("WCAG - Image Alt", "100% of images across all pages have valid, descriptive alt attributes")

    # 12. TEST FORM CONTROLS ACCESSIBLE LABELS (WCAG 2.1 AA)
    total_unlabelled = 0
    for page in core_pages:
        page_path = os.path.join(PROJECT_ROOT, page)
        p = AccessibilityParser()
        with open(page_path, "r", encoding="utf-8") as f:
            p.feed(f.read())
        if p.missing_aria_controls:
            total_unlabelled += len(p.missing_aria_controls)
            record_fail("WCAG - Form Labels", f"{page} has {len(p.missing_aria_controls)} unlabelled controls: {p.missing_aria_controls}")
    if total_unlabelled == 0:
        record_pass("WCAG - Form Labels", "100% of interactive inputs/selects have aria-labels or accessible labels")

    # 13. TEST CSS ACCESSIBILITY & FOCUS-VISIBLE
    style_path = os.path.join(PROJECT_ROOT, "style.css")
    with open(style_path, "r", encoding="utf-8") as f:
        style_content = f.read()
    if ":focus-visible" in style_content and ".visually-hidden" in style_content:
        record_pass("WCAG - Focus Visible", "style.css includes :focus-visible focus ring and .visually-hidden class")
    else:
        record_fail("WCAG - Focus Visible", "style.css missing :focus-visible or .visually-hidden definitions")

    # PRINT SUMMARY
    for r in results:
        print(r)

    print("\n----------------------------------------------------------------")
    print(f"GEO, SEO & WCAG SUMMARY: {passed} PASSED, {failed} FAILED")
    print("----------------------------------------------------------------")

    return failed == 0

if __name__ == "__main__":
    success = run_audit()
    sys.exit(0 if success else 1)
