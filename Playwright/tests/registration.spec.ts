import { test } from "../common/fixtures/test";
import { Auth } from "../common/pages/Auth";
import testData from "../common/data/invalidRegistrationData.json";
import { User } from "../common/entities/User";
import { expect } from "@playwright/test";
import { Timeout } from "../common/constants/enums";
import { TestIds } from "../common/constants/identifiers";

test.describe.configure({ timeout: Timeout.TestTimeout });

test.describe("Sign up tests", () => {
	for (const [field, data] of Object.entries(testData)) {
		for (const value of data) {
			const safeValue = value.replace(/@/g, "[at]");
			test(`@Negative signup with ${field}: ${`"` + safeValue + `"`}`, async ({
				page,
			}) => {
				// Generate a valid user, then override a single field with invalid value
				const user = new User();
				user.generateUserFrom({ [field]: value });

				const authPage = new Auth(page);

				await authPage.navigateToSignupAndLogin();
				await authPage.register(user, TestIds[field as keyof typeof TestIds]);

				await expect(page).toHaveURL(/login/, {
					timeout: Timeout.AssertionTimeout,
				});
			});
		}
	}

	test(`@Positive signup with valid data`, async ({ page }) => {
		const user = new User();
		const authPage = new Auth(page);

		await authPage.navigateToSignupAndLogin();
		await authPage.register(user);
		await expect(page).toHaveURL(/signup/, {
			timeout: Timeout.AssertionTimeout,
		});

		await authPage.fillUserDetails(user);
		await authPage.createAccount();

		const authFile = `.auth/userState.json`;
		await page.context().storageState({ path: authFile });
	});
});
