function handler(req, res) {
  // serverside code
  // similar to node and expressjs

  res.status(200).json({ message: "This works" });
}

export default handler;
