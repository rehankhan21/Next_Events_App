function handler(req, res) {
  // this is how we get access to the dynamic value in the path
  // in this case it is the eventId
  // it is .eventId because thats what we named the dynamic api route
  const eventId = req.query.eventId;

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
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    console.log(newComment);

    res.status(201).json({ message: "added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "max",
        text: "test comment",
      },
      {
        id: "c2",
        name: "joey",
        text: "test comment 2",
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
