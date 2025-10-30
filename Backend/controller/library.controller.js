import Library from "../model/library.model.js";

// Add book to user's library
export const addToLibrary = async (req, res) => {
  try {
    const { userId, bookId, price } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "UserId and BookId are required" });
    }

    // Check if already in library
    const existing = await Library.findOne({ userId, bookId });
    if (existing) {
      return res.status(400).json({ message: "Book already in your library" });
    }

    const newEntry = new Library({ userId, bookId, price: price || 0 });
    await newEntry.save();

    res
      .status(201)
      .json({ message: "Book added to library", library: newEntry });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's library
export const getUserLibrary = async (req, res) => {
  try {
    const { userId } = req.params;

    const library = await Library.find({ userId }).populate("bookId");

    res.status(200).json(library);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
