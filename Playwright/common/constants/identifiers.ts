export enum TestIds {
	Name = "signup-name",
	Email = "signup-email",
	SignupButton = "signup-button",
	Password = "password",
	BirthDayDropdown = "days",
	BirthMonthDropdown = "months",
	BirthYearDropdown = "years",
	FirstName = "first_name",
	LastName = "last_name",
	Address = "address",
	Country = "country",
	State = "state",
	City = "city",
	ZipCode = "zipcode",
	PhoneNumber = "mobile_number",
	CreateAccountButton = "create-account",
	CreateAccountContinueButton = "continue-button",
}

export const Xpaths = {
	RadioButton: (value: string) =>
		`//input[@type='radio' and @value='${value}']`,
};
