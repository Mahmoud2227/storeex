import bcrypt from 'bcryptjs';

const users = [
	{
		name: "Arie Petzold",
		email: "apetzold0@last.fm",
		password: bcrypt.hashSync("v2Z67OxSWfd", 10),
		isAdmin: true,
	},
	{
		name: "Barry O'Neil",
		email: "boneil1@domainmarket.com",
		password: bcrypt.hashSync("N8GuFCVj4w9", 10),
		isAdmin: false,
	},
	{
		name: "Lyndell Vannar",
		email: "lvannar2@hibu.com",
		password: bcrypt.hashSync("6TZPa3L", 10),
		isAdmin: false,
	},
	{
		name: "Alford Goard",
		email: "agoard3@domainmarket.com",
		password: bcrypt.hashSync("xwvUq93U", 10),
		isAdmin: true,
	},
	{
		name: "Ronalda Tribell",
		email: "rtribell4@cisco.com",
		password: bcrypt.hashSync("vu8hvW", 10),
		isAdmin: false,
	},
];

export default users;