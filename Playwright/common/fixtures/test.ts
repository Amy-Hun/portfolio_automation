import { test as base } from "@playwright/test";
import { Helper } from "../helper";

export const test = base.extend({
	page: async ({ page, baseURL }, use) => {
		if (!baseURL) throw new Error("No baseURL provided!");
		const helper = new Helper(page);

		await page.goto(baseURL);
		const consentButton = page.getByRole("button", {
			name: "Consent",
			exact: true,
		});
		await helper.waitAndClick(consentButton);

		await use(page);
	},
});
