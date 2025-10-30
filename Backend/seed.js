import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MONGODB_URI;

if (!URI) {
  console.error("FATAL: MONGODB_URI not set in .env file");
  process.exit(1);
}

const sampleBooks = [
  {
    name: "The Great Gatsby",
    price: 15.99,
    category: "Paid",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=300&fit=crop",
    title: "A classic American novel"
  },
  {
    name: "To Kill a Mockingbird",
    price: 12.99,
    category: "Paid",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
    title: "Harper Lee's masterpiece"
  },
  {
    name: "Free JavaScript Guide",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop",
    title: "Learn JavaScript basics for free"
  },
  {
    name: "Free React Tutorial",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    title: "Master React fundamentals"
  },
  {
    name: "1984",
    price: 14.99,
    category: "Paid",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop",
    title: "George Orwell's dystopian classic"
  },
  {
    name: "Free Python Basics",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
    title: "Start your Python journey"
  },
  {
    name: "Pride and Prejudice",
    price: 11.99,
    category: "Paid",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    title: "Jane Austen's timeless romance"
  },
  {
    name: "Free HTML & CSS",
    price: 0,
    category: "Free",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop",
    title: "Web development fundamentals"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing books
    const deleteResult = await Book.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing books`);

    // Insert sample books
    const insertResult = await Book.insertMany(sampleBooks);
    console.log(`✅ Successfully added ${insertResult.length} books!`);

    // Verify by fetching
    const allBooks = await Book.find({});
    console.log(`\nTotal books in database: ${allBooks.length}`);
    console.log("\nSample books:");
    allBooks.slice(0, 3).forEach(book => {
      console.log(`- ${book.name} (${book.category}) - $${book.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
