/** @format */
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const bcrypt = require("bcryptjs");

// middleware
app.use(cors());
app.use(express.json());
// app

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.zyi5zeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

// token verify middleware
const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization_token.split(" ")[1];
	if (!token)
		return res.status(401).send({ message: "Unauthorized access request" });
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.send({ err });
		req.verifyToken = decoded;
	});
	next();
};

const checkPinValidate = async (requestedUserPin, savePin) => {
	const pinIsMatch = await bcrypt.compare(requestedUserPin, savePin);
	return pinIsMatch;
};

async function run() {
	try {
		const database = client.db("mobile-financial-app");
		// database collections
		const usersCollection = database.collection("users");
		const agentCollection = database.collection("agent");
		const cashInRequestedCollection = database.collection("cashInRequested");
		const transactionCollection = database.collection("transaction");

		// tex

		// get transaction
		app.get("/transaction", async (req, res) => {
			const { user } = req.query;
			const result = await transactionCollection
				.find({ senderPhone: user })
				.toArray();
			res.send(result);
		});

		// get cashin request
		app.get("/all-cashin-request/:agent", async (req, res) => {
			const { agent } = req.params;
			const { filter, search } = req.query;
			let query = {
				agentPhoneNumber: agent,
			};
			if (search) {
				// query.user = {};
				// query.user.name = { $regex: search, $options: "i" };
				if (search) query['user.name'] = { $regex: search, $options: "i" };
			}
			if (filter) query.status = { $regex: filter, $options: "i" };
			const result = await cashInRequestedCollection.find(query).toArray();
			res.send(result);
		});
		// confirm or reject user cashin
		app.patch("/confirm-cashin", async (req, res) => {
			const { user, amount, agentPhoneNumber, _id } = req.body;
			const { phone: userPhoneNumber } = user;
			const { balance: agentBalance } = await usersCollection.findOne({
				phone: agentPhoneNumber,
			});
			const { balance: userBalance, phone } = await usersCollection.findOne({
				phone: userPhoneNumber,
			});
			if (agentBalance < amount)
				return res.send({ message: "Your Balance Is Low" });

			const updateUserBalance = await usersCollection.updateOne(
				{ phone: phone },
				{
					$set: {
						balance: userBalance + amount,
					},
				},
			);
			const updateAgentBalance = await usersCollection.updateOne(
				{ phone: agentPhoneNumber },
				{
					$set: {
						balance: agentBalance - amount,
					},
				},
			);
			await cashInRequestedCollection.updateOne(
				{ _id: new ObjectId(_id) },
				{
					$set: {
						status: "success",
					},
				},
			);

			res.status(200).send({ updateUserBalance, updateAgentBalance });
		});

		// cash in
		app.post("/cash-in", async (req, res) => {
			const {
				amount,
				pin: requestedUserPin,
				agentPhoneNumber,
				reference,
				user,
			} = req.body;

			const exitsUser = await usersCollection.findOne({
				phone: user.phone,
			});
			const pinIsMatch = checkPinValidate(requestedUserPin, exitsUser.pin);
			if (!pinIsMatch) return res.status(403).send({ message: "Invalid Pin" });

			//update receiver account  balance
			const exitsAgentAccount = await usersCollection.findOne({
				phone: agentPhoneNumber,
			});
			if (!exitsAgentAccount) {
				return res
					.status(404)
					.send({ message: "Given Agent Account Not Found" });
			}

			const transactionDoc = {
				user: exitsUser,
				amount,
				agentName: exitsAgentAccount.name,
				agentPhoneNumber,
				timeStamp: Date.now(),
				transaction: crypto.randomUUID(),
				reference,
				PaymentMethod: "cashIn",
			};
			await cashInRequestedCollection.insertOne(transactionDoc);
			res.status(200).send({
				message: "Cash In  Request Success",
			});
		});

		// cash out
		app.post("/cash-out", async (req, res) => {
			const { amount, pin, agentPhoneNumber, reference, cashOuterDetail } =
				req.body;
			const { name: outerName, phone: outerPhone } = cashOuterDetail;
			const existOuterAccount = await usersCollection.findOne({
				phone: outerPhone,
			});
			const { pin: existOuterPin, balance: outerBalance } = existOuterAccount;
			const pinIsMatch = checkPinValidate(pin, existOuterPin);
			if (!pinIsMatch) return res.status(403).send({ message: "Invalid Pin" });

			// update sender account balance
			const updateOuterBalanceDoc = {
				$set: {
					balance: outerBalance - amount,
				},
			};

			const cashOuterBalanceUpdateResult = await usersCollection.updateOne(
				{ phone: outerPhone },
				updateOuterBalanceDoc,
			);

			//update receiver account  balance
			const exitsAgentAccount = await usersCollection.findOne({
				phone: agentPhoneNumber,
			});
			if (!exitsAgentAccount) {
				return res
					.status(404)
					.send({ message: "Given Agent Account Not created" });
			}
			const {
				balance: exitsAgentBalance,
				phone: exitsAgentPhone,
				name: agentName,
			} = exitsAgentAccount;

			const updateAgentBalanceDoc = {
				$set: {
					balance: exitsAgentBalance + amount,
				},
			};
			const agentBalanceUpdateResult = await usersCollection.updateOne(
				{
					phone: exitsAgentPhone,
				},
				updateAgentBalanceDoc,
			);
			const transactionDoc = {
				outerName,
				outerPhone,
				agentName,
				agentPhoneNumber,
				timeStamp: Date.now(),
				transaction: crypto.randomUUID(),
				reference,
				status: "cashOut",
			};
			await transactionCollection.insertOne(transactionDoc);
			res.status(200).send({
				cashOuterBalanceUpdateResult,
				agentBalanceUpdateResult,
				message: "Cash Out Success",
			});
		});
		// send money
		app.post("/send-money", async (req, res) => {
			const { amount, pin, receiverPhoneNumber, reference, senderDetail } =
				req.body;
			const { name: senderName, phone: senderPhone } = senderDetail;
			const existSenderAccount = await usersCollection.findOne({
				phone: senderPhone,
			});
			const { pin: existSenderPin, balance: senderBalance } =
				existSenderAccount;
			const pinIsMatch = await bcrypt.compare(pin, existSenderPin);
			if (!pinIsMatch) return res.status(403).send({ message: "Invalid Pin" });

			// update sender account balance
			const updateSenderBalanceDoc = {
				$set: {
					balance: senderBalance - amount,
				},
			};

			const senderBalanceUpdateResult = await usersCollection.updateOne(
				{ phone: senderPhone },
				updateSenderBalanceDoc,
			);

			//update receiver account  balance
			const exitsReceiverAccount = await usersCollection.findOne({
				phone: receiverPhoneNumber,
			});
			if (!exitsReceiverAccount) {
				return res
					.status(404)
					.send({ message: "Given Receiver Account Not created" });
			}
			const {
				balance: exitsReceiverBalance,
				phone: exitsReceiverPhone,
				name: receiverName,
			} = exitsReceiverAccount;

			const updateReceiverBalanceDoc = {
				$set: {
					balance: exitsReceiverBalance + amount,
				},
			};
			const receiverBalanceUpdateResult = await usersCollection.updateOne(
				{
					phone: exitsReceiverPhone,
				},
				updateReceiverBalanceDoc,
			);
			const transactionDoc = {
				senderName,
				senderPhone,
				receiverName,
				receiverPhoneNumber,
				timeStamp: Date.now(),
				transaction: jwt.sign(
					{ senderName, receiverName },
					process.env.ACCESS_TOKEN_SECRET,
				),
				reference,
				status: "sendMoney",
			};
			await transactionCollection.insertOne(transactionDoc);
			res.status(200).send({
				senderBalanceUpdateResult,
				receiverBalanceUpdateResult,
				message: "Send Money Success",
			});
		});

		// create user
		app.post("/create-user", async (req, res) => {
			const requestedUserInfo = req.body;
			const { phone, pin, name } = requestedUserInfo;
			const hashedPin = await bcrypt.hash(pin, 10);
			const userInfo = {
				name,
				phone,
				pin: hashedPin,
				role: "user",
				balance: 0,
				status: "pending",
				timeStamp: Date.now(),
			};
			const exitAccount = await usersCollection.findOne({ phone: phone });
			if (exitAccount) {
				return res
					.status(400)
					.send({ message: "User Already Created Given Phone Number" });
			}
			const result = await usersCollection.insertOne(userInfo);
			res.status(201).send(result);
		});

		// approve user status or reject
		app.get("/all-users", async (req, res) => {
			const { search, filter } = req.query;
			let query = {};
			if (search) query.name = { $regex: search, $options: "i" };
			if (filter === "pending") {
				query.status = { $regex: filter, $options: "i" };
			} else {
				query.role = { $regex: filter, $options: "i" };
			}
			const result = await usersCollection.find(query).toArray();
			res.send(result);
		});

		app.patch("/change-role", async (req, res) => {
			const { event, phone } = req.query;
			const { balance } = await usersCollection.findOne({ phone: phone });
			switch (event) {
				case "agent":
					const result = await usersCollection.updateOne(
						{ phone: phone },
						{
							$set: {
								role: "agent",
								balance: balance + 10000,
							},
						},
					);
					return res.send(result);
				case "admin":
					const adminResult = await usersCollection.updateOne(
						{ phone: phone },
						{
							$set: {
								role: "admin",
							},
						},
					);
					return res.send(adminResult);
				case "user":
					const userResult = await usersCollection.updateOne(
						{ phone: phone },
						{
							$set: {
								role: "user",
							},
						},
					);
					return res.send(userResult);
				case "approve":
					const approveResult = await usersCollection.updateOne(
						{ phone: phone },
						{
							$set: {
								status: "approve",
								balance: balance + 40,
							},
						},
					);
					return res.send(approveResult);
				case "reject":
					const rejectResult = await usersCollection.updateOne(
						{ phone: phone },
						{
							$set: {
								status: "reject",
							},
						},
					);
					return res.send(rejectResult);
			}
		});

		// login user
		app.post("/login", async (req, res) => {
			const { phone: requestedUserPhone, pin: requestedUserPin } = req.body;
			const existUser = await usersCollection.findOne({
				phone: requestedUserPhone,
			});
			if (!existUser) {
				res.status(404).send({ message: "Account not found" });
				return;
			}
			if (existUser.status === "pending" || existUser.status === "reject") {
				return res.status(404).send({ message: "Pls wait for admin approve" });
			}
			const storedPhone = existUser?.phone;
			const isValidPin = checkPinValidate(requestedUserPin, existUser.pin);
			if (isValidPin && existUser) {
				const token = jwt.sign(
					{ storedPhone },
					process.env.ACCESS_TOKEN_SECRET,
					{ expiresIn: "1h" },
				);
				res.status(200).send({ existUser, token });
			} else {
				res.status(400).send({ message: "Invalid Pin" });
			}
		});

		// get an user
		app.get("/logged-user", async (req, res) => {
			const phone = req.headers?.phone;
			if (!phone) {
				return res
					.status(401)
					.send({ message: "Pls Provide a valid phone number" });
			}
			const user = await usersCollection.findOne({ phone: phone });
			res.send(user);
		});
		console.log("You successfully connected to MongoDB!");
	} finally {
		// Ensures that the client will close when you finish/error
	}
}
app.get("/", (req, res) => {
	res.send(`The Mobile Financial Service server running`);
});

app.listen(port, () => {
	console.log(`App listening on port ${port} !`);
});

run().catch(console.dir);
