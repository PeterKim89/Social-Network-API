# Social-Network-API

## Demo

https://drive.google.com/file/d/1eNKRGhqochTYRV7jkM9_jqiArNaiPlvV/view

## Introduction

In this project, I used mongoDB and mongoose to create a social network API. This allows users to create users, post thoughts, add other users as friends, and add reactions to thoughts.

## Installation

```
npm i
npm run start
```

Use Insomnia to interact with the different API routes

## Build Process

First the general MVC file structure of the application was created.
Then the API routes themselves were created.
Next the thought and user models were created, including a virtual friend count, and a schema for the reactions as well.
Finally the controller files were written to do the actual work of the API routes.

## Code Snippet

In the following snippet, getting a single user also retrieves their friends, their thoughts, any reactions associated to those thoughts.
The get all users route will display the same information, but for all users instead of only the specified user.

```
    getSingleUser(req, res) {
		User.findOne({ _id: req.params.id })
			.select("-__v")
			.populate("friends")
			.populate("thoughts")
			.then((user) => {
				if (!user) {
					return res.status(404).json({ message: "No user with this id!" });
				} else {
					res.json(user);
				}
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
```

## Languages and Technology

Javascript
MongoDB
Mongoose
Insomnia
Node.js
Express.js

## Author

[GitHub](https://github.com/PeterKim89)<br>
[LinkedIn](www.linkedin.com/in/peter-kim89)<br>
[Email] Peter.Kim@uconn.edu

## License

[MIT](https://choosealicense.com/licenses/mit/)<br>
Copyright (c) [2022] [Peter Kim]
