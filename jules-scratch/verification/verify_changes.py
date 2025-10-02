from playwright.sync_api import sync_playwright, Page, expect
import pathlib

def run(page: Page):
    """
    This script verifies the frontend changes by taking screenshots of the main pages.
    """
    base_uri = pathlib.Path.cwd().as_uri()

    print("Navigating to index.html")
    page.goto(f"{base_uri}/index.html")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/01_index.png")
    print("Screenshot of index.html saved.")

    print("Navigating to buy.html")
    page.goto(f"{base_uri}/buy.html")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/02_buy.png")
    print("Screenshot of buy.html saved.")

    print("Navigating to rent.html")
    page.goto(f"{base_uri}/rent.html")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/03_rent.png")
    print("Screenshot of rent.html saved.")

    print("Navigating to commercial.html")
    page.goto(f"{base_uri}/commercial.html")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/04_commercial.png")
    print("Screenshot of commercial.html saved.")

    print("Navigating to property-details.html?id=1")
    page.goto(f"{base_uri}/property-details.html?id=1")
    page.wait_for_load_state('networkidle')
    page.screenshot(path="jules-scratch/verification/05_property_details.png")
    print("Screenshot of property-details.html saved.")

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    run(page)
    browser.close()