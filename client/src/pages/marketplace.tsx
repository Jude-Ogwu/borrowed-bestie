
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, BookOpen, Headphones, Video } from 'lucide-react';

// Define product types and their corresponding icons
const productTypeIcons = {
  "PDF": BookOpen,
  "Audio": Headphones,
  "Video": Video,
  "All": Search
};

// Sample digital products data
const digitalProducts = [
  {
    id: 1,
    name: "Stress Management Guide",
    description: "A comprehensive guide for managing daily stress and anxiety.",
    price: "12.99",
    type: "PDF",
    author: "Dr. Sarah Chen",
    imageUrl: "https://images.unsplash.com/photo-1606103920295-2a77870523a6?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 42,
    pages: 85,
    popular: true
  },
  {
    id: 2,
    name: "Mindfulness Meditation Audio Collection",
    description: "30-minute guided meditation sessions for relaxation and focus.",
    price: "9.99",
    type: "Audio",
    author: "Marcus Johnson",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
    rating: 4.7,
    reviews: 36,
    duration: "3 hours total",
    popular: true
  },
  {
    id: 3,
    name: "Emotional Resilience Course",
    description: "5-part video course on building emotional resilience.",
    price: "29.99",
    type: "Video",
    author: "Lisa Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1541199249251-f713e6145474?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 28,
    duration: "2.5 hours total",
    popular: false
  },
  {
    id: 4,
    name: "Anxiety Relief Techniques",
    description: "Quick reference guide to anxiety relief techniques.",
    price: "7.99",
    type: "PDF",
    author: "Annie Gonyora",
    imageUrl: "https://images.unsplash.com/photo-1474418397713-2d13325bea61?w=600&h=400&fit=crop",
    rating: 4.6,
    reviews: 19,
    pages: 32,
    popular: true
  },
  {
    id: 5,
    name: "Sleep Improvement Audio Program",
    description: "A collection of soothing sounds and guided relaxations.",
    price: "14.99",
    type: "Audio",
    author: "Dr. Marcus Johnson",
    imageUrl: "https://images.unsplash.com/photo-1455642305361-e3f123e8538d?w=600&h=400&fit=crop",
    rating: 4.8,
    reviews: 53,
    duration: "4 hours total",
    popular: false
  },
  {
    id: 6,
    name: "Relationship Communication Workshop",
    description: "Learn effective communication skills for all relationships.",
    price: "19.99",
    type: "Video",
    author: "Annie Gonyora & Lisa Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop",
    rating: 4.9,
    reviews: 31,
    duration: "3 hours total",
    popular: true
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortOption, setSortOption] = useState("popular");
  const [activeTab, setActiveTab] = useState("all");
  const [cart, setCart] = useState<number[]>([]);

  // Filter products based on search, type, and active tab
  const filteredProducts = digitalProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || product.type === selectedType;
    const matchesTab = activeTab === "all" || 
                       (activeTab === "popular" && product.popular) ||
                       (activeTab === product.type.toLowerCase());
    
    return matchesSearch && matchesType && matchesTab;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "popular") {
      return b.reviews - a.reviews;
    } else if (sortOption === "priceLow") {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortOption === "priceHigh") {
      return parseFloat(b.price) - parseFloat(a.price);
    } else if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.indexOf(productId);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const isInCart = (productId: number) => {
    return cart.includes(productId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Digital Marketplace</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Discover resources to support your emotional wellbeing and personal growth
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Resource Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="PDF">PDFs</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
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
        <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pdf">PDFs</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => {
          const IconComponent = productTypeIcons[product.type as keyof typeof productTypeIcons];
          
          return (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-3 right-3 bg-white/80 text-slate-800">
                  {product.type}
                </Badge>
              </div>
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{product.name}</h3>
                  {product.popular && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">Popular</Badge>
                  )}
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  By {product.author}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-slate-500">({product.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <IconComponent size={16} className="text-slate-400 mr-1" />
                    <span className="text-xs text-slate-500">
                      {product.type === "PDF" ? `${product.pages} pages` : product.duration}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-slate-800 dark:text-white">${product.price}</span>
                  {isInCart(product.id) ? (
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button 
                      className="bg-gradient-teal text-white hover:bg-teal-600"
                      onClick={() => addToCart(product.id)}
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
      
      {sortedProducts.length === 0 && (
        <div className="text-center py-16">
          <Search className="mx-auto mb-4 text-slate-400" size={48} />
          <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No products found</h3>
          <p className="text-slate-600 dark:text-slate-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
