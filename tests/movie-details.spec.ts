import { test, expect } from '@playwright/test';

test("should navigate to movie detail and show cast", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Click the first movie's Read more
    await page.locator("text=Read more").first().click();

    // Expect URL to change to /movies/[id]
    await expect(page).toHaveURL(/\/movies\/\d+/);

    // Validate details page content
    await expect(page.locator("text=Release Date")).toBeVisible();
    await expect(page.locator("text=Rating")).toBeVisible();
    await expect(page.locator("text=Actors")).toBeVisible();
});
