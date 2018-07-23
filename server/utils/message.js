const generateMessage = (from, text, location) => {
  return {
    from,
    text,
    location,
    createdAt: new Date().getTime()
  }
};

module.exports = {generateMessage};
