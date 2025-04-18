import { faker } from "@faker-js/faker";
import { UserType } from "../types/types";
import { DateTime } from "luxon";
import { Helper } from "../helper";

export class User {
	private email = faker.internet.email();
	private password = faker.internet.password({ length: 6 });
	private gender = faker.person.sex();
	private name = faker.person.fullName({
		sex: this.gender.toLowerCase() as "female" | "male",
	});
	private birthday = DateTime.fromJSDate(faker.date.birthdate());
	private address = faker.location.streetAddress();
	private city = faker.location.city();
	private country = Helper.getRandomCountry();
	private state = faker.location.state();
	private zipCode = faker.location.zipCode();
	private phoneNumber = faker.phone.number({ style: "international" });

	/**
	 * Generates new random data for the user.
	 * @example
	 * const user = new User();
	 * user.regenerateRandomUserData();
	 */
	async regenerateRandomUserData() {
		this.email = faker.internet.email();
		this.password = faker.internet.password({ length: 6 });
		this.gender = faker.person.sex();
		this.name = faker.person.fullName({
			sex: this.gender?.toLowerCase() as "female" | "male",
		});
		this.birthday = DateTime.fromJSDate(faker.date.birthdate());
		this.address = faker.location.streetAddress();
		this.city = faker.location.city();
		this.country = Helper.getRandomCountry();
		this.state = faker.location.state();
		this.zipCode = faker.location.zipCode();
		this.phoneNumber = faker.phone.number({ style: "international" });
	}

	/**
	 * Generates a user from the provided data. This method can also be used to override specific properties of a user.
	 * @param data Object with user data
	 * @example
	 * const user = new User();
	 * user.generateRandomUser(); // Generates a user with random data
	 * user.generateUserFrom({ email: 'name@domain.com'}); //Overrides the email property
	 */
	generateUserFrom(data: UserType) {
		for (const [key, value] of Object.entries(data)) {
			if (key in this) {
				(this as Record<string, unknown>)[key] = value;
			}
		}
	}

	get userData(): UserType {
		return {
			email: this.email,
			password: this.password,
			gender: this.gender,
			name: this.name,
			birthday: this.birthday,
			address: this.address,
			country: this.country,
			city: this.city,
			state: this.state,
			zipCode: this.zipCode,
			phoneNumber: this.phoneNumber,
		};
	}
}
