//TODO:  -------   This js file is for the pipeline of the some basic questions. In atlas, there is already a database agree with the three collections ( books, authors, users) and all the questions below is first performed on that collections then written here for future references.

//! Q.1.    How many uses are active?

const activeUsers = [
	{
		$match: {
			isActive: true,
		},
	},
	{
		$count: "activeUsers",
	},
];

//! Q.2.    What is average age of all the users?

//NOTES: Use $sum with $group for count and use $count with $match for the same

const avgAgeUsers = [
	{
		$group: {
			_id: null, //* null because we have to find the avg of all the users, here we can put another field such as gender etc
			avgAge: {
				$avg: "$age",
			},
		},
	},
];

//! Q.3. List the top 5 most common favorite fruits among users.

const topFavFruits = [
	{
		$group: {
			_id: "$favoriteFruit",
			count: {
				$sum: 1,
			},
		},
	},
	{
		$sort: {
			count: -1,
		},
	},
	{
		$limit: 5,
	},
];

//! Q.4.    Find the total numbers of males and females.

const countGender = [
	{
		$group: {
			_id: "$gender",
			count: {
				$sum: 1,
			},
		},
	},
];

//! Q.5.    Which country  has the highest number of registered users in descending order?

const countryUserCount = [
	{
		$group: {
			_id: "$company.location.country", //country is inside the location and location is inside the company
			countryUserCount: {
				$sum: 1,
			},
		},
	},
	{
		$sort: {
			countryUserCount: -1,
		},
	},
];

//! Q.6.    List all the unique eye colors present in the collection.

const eyeColors = [
	{
		$group: {
			_id: "$eyeColor",
		},
	},
];

//! Q.7.    What is the average number of tags per user?

const avgTagPerUser1 = [
	{
		$unwind: "$tags",
	},
	{
		$group: {
			_id: "$_id",
			sumOfTag: {
				$sum: 1,
			},
		},
	},
	{
		$group: {
			_id: null,
			avgTagPerUser: {
				$avg: "$sumOfTag",
			},
		},
	},
];

const avgTagPerUser2 = [
	{
		$addFields: {
			//This will add a new field to the each document
			numberOfTags: {
				$size: { $ifNull: ["$tags", []] }, //if there is no tags field then it will replaced by []
			},
		},
	},
	{
		$group: {
			_id: null,
			avgTagPerUser: {
				$avg: "$numberOfTags",
			},
		},
	},
];

//! Q.8.	How many users have 'enim' as one of their tags

const usersWithEnimTags = [
	{
		$match: {
			//match operators also matches with the element of an array of the fields
			tags: "enim",
		},
	},
	{
		$count: "usersWithEnimTags",
	},
];

//! Q.9.	What are the names and age of users who are inactive and have 'velit' as a tag?

const reqQuery = [
	{
		$match: {
			isActive: false,
			tags: "velit",
		},
	},
	{
		$project: {
			_id: 0,
			name: 1,
			age: 1,
		},
	},
];

//! Q.10.	How many users have a phone number starting with '+1 (940)'?

const usersWithSpecialPhone = [
	{
		$match: {
			"company.phone": /^\+1 \(940\)/, //This is regex (regular expression)
		},
	},
	{
		$count: "usersWithSpecialPhone",
	},
];

//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
//! Q.
