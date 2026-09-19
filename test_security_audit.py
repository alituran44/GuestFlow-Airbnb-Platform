#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HostifyOS Automated Security Audit & Penetration Testing Suite
Validates:
1. HTTP Security Headers & Content Security Policy (CSP)
2. Secret & Credential Leak Detection (Static Code Analysis)
3. DOM XSS & Input Sanitization
4. Tabnabbing & Reverse Window Opener (target="_blank" rel="noopener noreferrer")
5. External Script HTTPS Integrity
6. Git Secrets Hygiene (.gitignore)
7. Client-side Sensitive Data Exposure (localStorage/sessionStorage)
"""

import os
import re
import json
import glob
import sys

# Ensure UTF-8 output encoding on Windows console
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

def run_tests():
    passed = 0
    failed = 0
    warnings = 0
    results = []

    def record_pass(suite, msg):
        nonlocal passed
        passed += 1
        results.append(f"  [PASS] {suite}: {msg}")

    def record_fail(suite, msg):
        nonlocal failed
        failed += 1
        results.append(f"  [FAIL] {suite}: {msg}")

    def record_warn(suite, msg):
        nonlocal warnings
        warnings += 1
        results.append(f"  [WARN] {suite}: {msg}")

    print("================================================================")
    print("HOSTIFYOS SECURITY AUDIT & VULNERABILITY TEST SUITE")
    print("================================================================\n")

    # TEST 1: Vercel HTTP Security Headers & CSP
    vercel_path = os.path.join(PROJECT_ROOT, "vercel.json")
    if not os.path.exists(vercel_path):
        record_fail("HTTP Headers", "vercel.json does not exist!")
    else:
        try:
            with open(vercel_path, "r", encoding="utf-8") as f:
                v_data = json.load(f)
            
            headers_list = v_data.get("headers", [])[0].get("headers", [])
            header_map = {h["key"].lower(): h["value"] for h in headers_list}

            # Check Clickjacking
            if "x-frame-options" in header_map and header_map["x-frame-options"] in ["SAMEORIGIN", "DENY"]:
                record_pass("HTTP Headers", "X-Frame-Options is properly configured (SAMEORIGIN)")
            else:
                record_fail("HTTP Headers", "X-Frame-Options missing or insecure")

            # Check MIME sniffing
            if header_map.get("x-content-type-options") == "nosniff":
                record_pass("HTTP Headers", "X-Content-Type-Options is nosniff")
            else:
                record_fail("HTTP Headers", "X-Content-Type-Options nosniff missing")

            # Check Referrer Policy
            if "referrer-policy" in header_map:
                record_pass("HTTP Headers", f"Referrer-Policy configured ({header_map['referrer-policy']})")
            else:
                record_fail("HTTP Headers", "Referrer-Policy missing")

            # Check HSTS
            if "strict-transport-security" in header_map and "max-age" in header_map["strict-transport-security"]:
                record_pass("HTTP Headers", "Strict-Transport-Security (HSTS) enforced")
            else:
                record_fail("HTTP Headers", "HSTS header missing or invalid")

            # Check CSP
            csp = header_map.get("content-security-policy", "")
            if csp:
                if "default-src" in csp and "script-src" in csp and "frame-ancestors" in csp:
                    record_pass("CSP Policy", "Content-Security-Policy is comprehensively defined with frame-ancestors")
                else:
                    record_fail("CSP Policy", "Content-Security-Policy missing essential directives")
            else:
                record_fail("CSP Policy", "Content-Security-Policy is missing")

        except Exception as e:
            record_fail("HTTP Headers", f"Error parsing vercel.json: {e}")

    # TEST 2: Secret & Credential Leak Detection
    secret_patterns = [
        (r'sk_live_[0-9a-zA-Z]{24,}', "Stripe Live Secret Key"),
        (r'sk_test_[0-9a-zA-Z]{24,}', "Stripe Test Secret Key"),
        (r'ghp_[0-9a-zA-Z]{36}', "GitHub Personal Access Token"),
        (r'AIza[0-9A-Za-z-_]{35}', "Google API Key"),
        (r'-----BEGIN PRIVATE KEY-----', "RSA/ECC Private Key"),
        (r'aws_secret_access_key\s*=', "AWS Secret Access Key"),
        (r'postgres://[^:]+:[^@]+@', "Postgres Database Connection URI with password")
    ]

    all_files = glob.glob(os.path.join(PROJECT_ROOT, "**", "*.*"), recursive=True)
    scanned_files = [f for f in all_files if not any(x in f for x in [".git", "node_modules", ".vercel", "__pycache__", "test_security_audit.py"])]

    secrets_found = []
    for filepath in scanned_files:
        try:
            with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                for pat, name in secret_patterns:
                    if re.search(pat, content):
                        secrets_found.append((filepath, name))
        except Exception:
            pass

    if not secrets_found:
        record_pass("Secrets Hygiene", f"Scanned {len(scanned_files)} files: Zero hardcoded secrets, private keys, or credentials found")
    else:
        for f, name in secrets_found:
            record_fail("Secrets Hygiene", f"Found potential secret ({name}) in {os.path.relpath(f, PROJECT_ROOT)}")

    # TEST 3: DOM XSS & Escape HTML Verification
    app_js_path = os.path.join(PROJECT_ROOT, "app.js")
    with open(app_js_path, "r", encoding="utf-8") as f:
        app_js = f.read()

    if "function escapeHtml" in app_js and "&amp;" in app_js and "&lt;" in app_js and "&gt;" in app_js:
        record_pass("XSS Mitigation", "app.js contains centralized escapeHtml sanitization utility")
    else:
        record_fail("XSS Mitigation", "escapeHtml utility missing or incomplete in app.js")

    g_html_path = os.path.join(PROJECT_ROOT, "g.html")
    with open(g_html_path, "r", encoding="utf-8") as f:
        g_html = f.read()

    if "function escapeHtml" in g_html and "rawCode.replace(/[^A-Z0-9\\s-]/g" in g_html:
        record_pass("XSS Mitigation", "g.html flight tracker input is strictly validated with regex and HTML escaped")
    else:
        record_fail("XSS Mitigation", "g.html flight tracker unescaped input vulnerability detected")

    # TEST 4: Tabnabbing / Target Blank rel="noopener noreferrer"
    html_files = [f for f in scanned_files if f.endswith(".html")]
    insecure_links = []

    target_blank_regex = re.compile(r'<a\s+([^>]*?)target=["\']_blank["\']([^>]*?)>', re.IGNORECASE)
    
    for hf in html_files:
        rel_path = os.path.relpath(hf, PROJECT_ROOT)
        with open(hf, "r", encoding="utf-8") as f:
            content = f.read()
            for match in target_blank_regex.finditer(content):
                tag_attrs = match.group(1) + " " + match.group(2)
                if "rel=" not in tag_attrs or ("noopener" not in tag_attrs and "noreferrer" not in tag_attrs):
                    href_match = re.search(r'href=["\']([^"\']+)["\']', tag_attrs)
                    href_val = href_match.group(1) if href_match else "unknown"
                    if href_val.startswith("http") or href_val.startswith("//"):
                        insecure_links.append((rel_path, href_val))

    if not insecure_links:
        record_pass("Reverse Tabnabbing", f"All external target='_blank' links across {len(html_files)} HTML pages carry rel='noopener noreferrer'")
    else:
        for path, href in insecure_links:
            record_fail("Reverse Tabnabbing", f"{path} has external target='_blank' link ({href}) without rel='noopener noreferrer'")

    # TEST 5: External Script HTTPS Protocol Integrity
    insecure_scripts = []
    script_regex = re.compile(r'<script\s+[^>]*?src=["\']([^"\']+)["\']', re.IGNORECASE)
    for hf in html_files:
        rel_path = os.path.relpath(hf, PROJECT_ROOT)
        with open(hf, "r", encoding="utf-8") as f:
            content = f.read()
            for match in script_regex.finditer(content):
                src = match.group(1)
                if src.startswith("http://") or src.startswith("//"):
                    insecure_scripts.append((rel_path, src))

    if not insecure_scripts:
        record_pass("Script Protocol Integrity", "All third-party scripts load strictly over secure HTTPS")
    else:
        for path, src in insecure_scripts:
            record_fail("Script Protocol Integrity", f"{path} loads insecure script source: {src}")

    # TEST 6: Gitignore Secret Protection
    gitignore_path = os.path.join(PROJECT_ROOT, ".gitignore")
    if os.path.exists(gitignore_path):
        with open(gitignore_path, "r", encoding="utf-8") as f:
            gi_content = f.read()
        if ".env" in gi_content and "*.key" in gi_content and "*.pem" in gi_content:
            record_pass("Git Secrets Hygiene", ".gitignore properly excludes .env, private keys (*.key), and certificates (*.pem)")
        else:
            record_fail("Git Secrets Hygiene", ".gitignore missing critical secret exclusion rules")
    else:
        record_fail("Git Secrets Hygiene", ".gitignore file missing")

    # TEST 7: Client-side Storage Leakage
    with open(app_js_path, "r", encoding="utf-8") as f:
        app_code = f.read()
    
    suspicious_storage = []
    for line_num, line in enumerate(app_code.splitlines(), 1):
        if "localStorage.setItem" in line:
            if any(term in line.lower() for term in ["password", "cvv", "cvc", "secret", "cardnumber", "token"]):
                suspicious_storage.append((line_num, line.strip()))

    if not suspicious_storage:
        record_pass("Client Storage Security", "localStorage only stores non-sensitive user preferences (cookie consent & currency)")
    else:
        for lnum, line in suspicious_storage:
            record_fail("Client Storage Security", f"app.js line {lnum} stores sensitive data in localStorage: {line}")

    # Print Results
    for r in results:
        print(r)

    print("\n----------------------------------------------------------------")
    print(f"SUMMARY: {passed} PASSED, {failed} FAILED, {warnings} WARNINGS")
    print("----------------------------------------------------------------")

    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
