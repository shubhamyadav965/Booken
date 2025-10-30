import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const { name, title, price, category, image } = req.body;

    if (!name || price === undefined || !category) {
      return res.status(400).json({ message: "Required fields: name, price, category" });
    }

    const newBook = new Book({
      name,
      title,
      price,
      category,
      image,
    });

    await newBook.save();
    res.status(201).json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};