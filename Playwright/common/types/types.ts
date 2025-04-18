import { DateTime } from "luxon";

export type UserType = {
	email: string;
	password: string;
	gender: string;
	name: string;
	birthday: DateTime;
	address: string;
	country: string;
	city: string;
	state: string;
	zipCode: string;
	phoneNumber: string;
};
