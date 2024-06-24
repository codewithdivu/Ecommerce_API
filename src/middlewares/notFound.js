const notFound = (req, res) => {
  return res.status(404).send("<h1>Route does not exist</h1>");
};

export default notFound;
