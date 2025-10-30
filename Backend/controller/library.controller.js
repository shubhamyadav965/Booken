import Library from "../model/library.model.js";

// Add book to user's library
export const addToLibrary = async (req, res) => {
  try {
    const { userId, bookId, price } = req.body;

    if (!userId || !bookId || price === undefined) {
      return res
        .status(400)
        .json({ message: "userId, bookId, and price are required" });
    }

    // Check if book already in library
    const existingEntry = await Library.findOne({ userId, bookId });
    if (existingEntry) {
      return res.status(400).json({ message: "Book already in library" });
    }

    const newLibraryEntry = new Library({
      userId,
      bookId,
      price,
    });

    await newLibraryEntry.save();
    res
      .status(201)
      .json({ message: "Book added to library", library: newLibraryEntry });
  } catch (error) {
    console.error("Error adding to library:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get user's library
export const getUserLibrary = async (req, res) => {
  try {
    const { userId } = req.params;

    const library = await Library.find({ userId }).populate("bookId");
    res.status(200).json(library);
  } catch (error) {
    console.error("Error fetching library:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
