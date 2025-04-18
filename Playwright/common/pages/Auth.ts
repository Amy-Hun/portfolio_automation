import { Page } from "@playwright/test";
import { Helper } from "../helper";
import { User } from "../entities/User";
import { TestIds, Xpaths } from "../constants/identifiers";
import { Timeout } from "../constants/enums";
import { radioButtonMap } from "../constants/constants";
import { UserType } from "../types/types";

export class Auth {
	page: Page;
	helper: Helper;

	constructor(page: Page) {
		this.page = page;
		this.helper = new Helper(this.page);
	}

	/**
	 * Navigates to the signup/login page.
	 * @example
	 * const auth = new Auth(page);
	 * await auth.navigateToSignupAndLogin();
	 */
	async navigateToSignupAndLogin() {
		const registerLink = this.page.getByRole("link", {
			name: " Signup / Login",
		});
		await this.helper.waitAndClick(registerLink);
	}

	/**
	 * Registers the user.
	 * @param user
	 * @param invalidField
	 * @example
	 * const auth = new Auth(page);
	 * await auth.navigateToSignupAndLogin();
	 *
	 * const user = new User();
	 * await auth.register(user);
	 */
	async register(user: User, invalidField?: TestIds) {
		await this.helper.fillFields({
			[TestIds.Name]: user.userData.name,
			[TestIds.Email]: user.userData.email,
		});

		const registerButton = this.page.getByTestId(TestIds.SignupButton);
		await this.helper.waitAndClick(registerButton);

		if (invalidField) {
			const invalidFieldSelector = `input[data-qa="${invalidField}"]`;

			const inputElement = await this.page.$(invalidFieldSelector);

			if (!inputElement) {
				throw new Error(`Field "${invalidField}" was not found on the page.`);
			}
		}
	}

	/**
	 * Fills the user's details after the registration.
	 * @param user
	 * @example
	 * const auth = new Auth(page);
	 * await auth.navigateToSignupAndLogin();
	 *
	 * const user = new User();
	 * await auth.register(user);
	 * await auth.fillUserDetails(user);
	 */
	async fillUserDetails(user: User) {
		const {
			email,
			password,
			gender,
			name,
			birthday,
			address,
			country,
			city,
			state,
			zipCode,
			phoneNumber,
		}: UserType = user.userData;

		const radioButtonText =
			radioButtonMap[user.userData.gender as keyof typeof radioButtonMap];
		await this.selectRadioButton(radioButtonText);

		await this.helper.selectFromDropdown({
			[TestIds.BirthDayDropdown]: birthday.day.toString(),
			[TestIds.BirthMonthDropdown]: birthday.month.toString(),
			[TestIds.BirthYearDropdown]: birthday.year.toString(),
			[TestIds.Country]: country,
		});

		const [firstName, ...lastNameParts] = name.split(" ");
		const lastName = lastNameParts.join(" ");
		await this.helper.fillFields({
			[TestIds.Password]: password,
			[TestIds.FirstName]: firstName,
			[TestIds.LastName]: lastName,
			[TestIds.Address]: address,
			[TestIds.State]: state,
			[TestIds.City]: city,
			[TestIds.ZipCode]: zipCode,
			[TestIds.PhoneNumber]: phoneNumber,
		});
	}

	/**
	 * Creates an account after filling the user's details.
	 * @example
	 * const auth = new Auth(page);
	 * await auth.navigateToSignupAndLogin();
	 *
	 * const user = new User();
	 * await auth.register(user);
	 * await auth.fillUserDetails(user);
	 * await auth.createAccount();
	 */
	async createAccount() {
		const createAccountButton = this.page.getByTestId(
			TestIds.CreateAccountButton
		);
		await this.helper.waitAndClick(createAccountButton);

		const continueButton = this.page.getByTestId(
			TestIds.CreateAccountContinueButton
		);
		await this.helper.waitAndClick(continueButton);
	}

	/**
	 * Selects a radio button based on the provided text.
	 * @param buttonText
	 */
	private async selectRadioButton(buttonText: string) {
		const radioButton = this.page.locator(Xpaths.RadioButton(buttonText));
		await radioButton.waitFor({
			state: "visible",
			timeout: Timeout.LoadingTimeout,
		});

		await radioButton.check();
	}
}
