import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../../helpers/db-util";

async function handler(req, res) {
  // this is how we get access to the dynamic value in the path
  // in this case it is the eventId
  // it is .eventId because thats what we named the dynamic api route
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed! " });
    return;
  }

  if (req.method === "POST") {
    //serverside validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      // return status 422 is for invalid input
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id - result.insertedId;
      res.status(201).json({ message: "added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting Comment failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Fetching Comments Failed!" });
    }
  }

  client.close();
}

export default handler;
