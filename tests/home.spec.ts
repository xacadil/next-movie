import { test, expect } from "@playwright/test";

test("should render multiple movie cards", async ({ page }) => {
    await page.goto("http://localhost:3000");

    const cards = await page.locator("h5").count();
    expect(cards).toBeGreaterThan(1);

    const readMoreButtons = await page.getByText("Read more").count();
    expect(readMoreButtons).toBeGreaterThan(1);
});
