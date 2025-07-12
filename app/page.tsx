'use client';

import { useState, useEffect } from 'react';

interface Quote {
  text: string;
  author: string;
  category: string;
}

const quotes: Quote[] = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: "innovation"
  },
  {
    text: "Life is what happens to you while you're busy making other plans.",
    author: "John Lennon",
    category: "life"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "dreams"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "inspiration"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: "motivation"
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "opportunity"
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "authenticity"
  },
  {
    text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    category: "wisdom"
  }
];

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<Quote[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  const generateNewQuote = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      let newQuote;
      do {
        newQuote = quotes[Math.floor(Math.random() * quotes.length)];
      } while (newQuote.text === currentQuote.text && quotes.length > 1);
      
      setCurrentQuote(newQuote);
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = (quote: Quote) => {
    const isAlreadyFavorite = favorites.some(fav => fav.text === quote.text);
    
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter(fav => fav.text !== quote.text));
    } else {
      setFavorites([...favorites, quote]);
    }
  };

  const isFavorite = (quote: Quote) => {
    return favorites.some(fav => fav.text === quote.text);
  };

  const copyToClipboard = () => {
    const quoteText = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(quoteText);
    
    // Show a brief success message
    const button = document.getElementById('copyButton');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Inspiration with Soomro😊</h1>
          <p className="text-gray-600">Discover wisdom from great minds</p>
        </div>

        {/* Main Quote Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {currentQuote.category}
              </span>
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 mb-6 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            
            <div className="text-right">
              <cite className="text-lg text-gray-600 font-medium">
                — {currentQuote.author}
              </cite>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <button
              onClick={generateNewQuote}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
              disabled={isAnimating}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              New Quote
            </button>
            
            <button
              onClick={() => toggleFavorite(currentQuote)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
                isFavorite(currentQuote)
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill={isFavorite(currentQuote) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {isFavorite(currentQuote) ? 'Favorited' : 'Add to Favorites'}
            </button>
            
            <button
              id="copyButton"
              onClick={copyToClipboard}
              className="bg-green-100 text-green-700 hover:bg-green-200 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Quote
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Your Favorites ({favorites.length})
            </h2>
            
            <div className="grid gap-4">
              {favorites.map((quote, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-1">"{quote.text}"</p>
                    <p className="text-gray-600 text-sm">— {quote.author}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(quote)}
                    className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}