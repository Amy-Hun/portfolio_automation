import { expect, Locator, Page } from "@playwright/test";
import { Country, Timeout } from "./constants/enums";

export class Helper {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Waits for the element to be visible and then clicks it.
	 * @param locator Locator to wait for
	 * @example
	 * const helper = new Helper(page);
	 * const element = page.getByTestId("example");
	 * await helper.waitAndClick(element);
	 */
	async waitAndClick(
		locator: Locator,
		timeout: number = Timeout.LoadingTimeout
	) {
		await locator.waitFor({
			state: "visible",
			timeout: timeout,
		});
		await locator.click();
	}

	/**
	 * Fills the fields on the page with the provided values.
	 * @param fields Object containing field selectors and their values
	 * @example
	 * const helper = new Helper(page);
	 * const fields = {
	 *   [TestIds.Name]: "John Doe",
	 *   [TestIds.Email]: "name@domain.com"
	 * };
	 * await helper.fillFields(fields);
	 */
	async fillFields(fields: Record<string, string>) {
		for (const [selector, value] of Object.entries(fields)) {
			const element = this.page.getByTestId(selector);
			await expect(element).toBeVisible({ timeout: Timeout.AssertionTimeout });
			await element.fill(value);
		}
	}

	/**
	 * Returns a random country from the Country enum.
	 * @example
	 * const randomCountry = Helper.getRandomCountry();
	 */
	static getRandomCountry(): Country {
		const values = Object.values(Country);
		const index = Math.floor(Math.random() * values.length);
		return values[index];
	}

	/**
	 * Selects an option from a dropdown.
	 * @param data
	 * @example
	 * const helper = new Helper(page);
	 * const dropdownData = {
	 *   [TestIds.Country]: "India",
	 * };
	 * await helper.selectFromDropdown(dropdownData);
	 */
	async selectFromDropdown(data: Record<string, string>) {
		for (const [dropdown, option] of Object.entries(data)) {
			const dropdownLocator = this.page.getByTestId(dropdown);
			await dropdownLocator.waitFor({
				state: "visible",
				timeout: Timeout.LoadingTimeout,
			});
			await dropdownLocator.selectOption(option);
		}
	}
}
