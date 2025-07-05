
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, BookOpen } from 'lucide-react';

// Sample books data
const books = [
  {
    id: 1,
    title: "Emotional Intelligence: Managing Emotions in Daily Life",
    description: "A comprehensive guide to understanding and managing your emotions for better relationships and mental well-being.",
    price: "19.99",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 42,
    pages: 248,
    category: "Self-Help",
    featured: true,
    publishDate: "2024"
  },
  {
    id: 2,
    name: "The Healing Journey: Overcoming Trauma and Finding Peace",
    description: "A step-by-step guide to healing from past traumas and building resilience for a more peaceful future.",
    price: "24.99",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 36,
    pages: 312,
    category: "Psychology",
    featured: true,
    publishDate: "2023"
  },
  {
    id: 3,
    name: "Mindful Communication: Building Stronger Relationships",
    description: "Learn how to communicate effectively and mindfully to build deeper connections with others.",
    price: "17.99",
    author: "Annie Gonyora & Dr. Sarah Chen",
    imageUrl: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 28,
    pages: 186,
    category: "Relationships",
    featured: false,
    publishDate: "2024"
  },
  {
    id: 4,
    name: "Anxiety Relief: Practical Strategies for Modern Life",
    description: "A practical guide with evidence-based techniques to manage anxiety in today's fast-paced world.",
    price: "15.99",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
    rating: 4.6,
    reviews: 19,
    pages: 164,
    category: "Mental Health",
    featured: true,
    publishDate: "2022"
  },
  {
    id: 5,
    name: "Finding Your Purpose: A Guide to Meaningful Living",
    description: "Discover your life's purpose and learn how to align your daily actions with your deepest values.",
    price: "21.99",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    pages: 224,
    category: "Personal Development",
    featured: false,
    publishDate: "2023"
  },
  {
    id: 6,
    name: "The Art of Listening: Becoming a Better Support Person",
    description: "Learn the essential skills of active listening and emotional support to help those around you.",
    price: "18.99",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 31,
    pages: 192,
    category: "Communication",
    featured: true,
    publishDate: "2024"
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState<number[]>([]);

  // Filter books based on search, category, and active tab
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesTab = activeTab === "all" || 
                       (activeTab === "featured" && book.featured) ||
                       (activeTab === book.category.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortOption === "featured") {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    } else if (sortOption === "newest") {
      return b.publishDate.localeCompare(a.publishDate);
    } else if (sortOption === "priceLow") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === "priceHigh") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const addToCart = (bookId: number) => {
    setCart([...cart, bookId]);
  };

  const removeFromCart = (bookId: number) => {
    const index = cart.indexOf(bookId);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const isInCart = (bookId: number) => {
    return cart.includes(bookId);
  };

  const categories = ["All", "Self-Help", "Psychology", "Relationships", "Mental Health", "Personal Development", "Communication"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Books by Annie Gonyora</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Discover books to support your emotional wellbeing and personal growth
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search books..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="priceLow">Price: Low to High</SelectItem>
              <SelectItem value="priceHigh">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" className="flex items-center">
          <ShoppingCart className="mr-2" size={18} />
          Cart ({cart.length})
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="newest">New Releases</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedBooks.map((book) => {          
          return (
            <Card key={book.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative aspect-[3/4]">
                <img 
                  src={book.imageUrl} 
                  alt={book.name || book.title} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-white/80 text-slate-800">
                  {book.category}
                </Badge>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{book.title || book.name}</h3>
                  {book.featured && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">Featured</Badge>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-grow">
                  {book.description}
                </p>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  By {book.author}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{book.rating}</span>
                    <span className="text-xs text-slate-500">({book.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={16} className="text-slate-400 mr-1" />
                    <span className="text-xs text-slate-500">
                      {book.pages} pages
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">${book.price}</span>
                  {isInCart(book.id) ? (
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 dark:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 dark:border-red-400 dark:hover:text-red-300"
                      onClick={() => removeFromCart(book.id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      className="bg-gradient-teal text-white hover:bg-teal-600"
                      onClick={() => addToCart(book.id)}
                    >
                      <ShoppingCart className="mr-2" size={16} />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {sortedBooks.length === 0 && (
        <div className="text-center py-16">
          <Search className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No books found</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
