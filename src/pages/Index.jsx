import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paw, Heart, Instagram, Twitter, Facebook, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
];

const Index = () => {
  const [catFact, setCatFact] = useState(catFacts[0]);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollDown(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateCatFact = () => {
    const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    setCatFact(randomFact);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            CatWorld
          </motion.h1>
          <ul className="flex space-x-6">
            {["Home", "About", "Gallery", "Contact"].map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a href="#" className="hover:text-gray-300 transition-colors duration-300">{item}</a>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="flex-grow pt-16">
        <div className="bg-cover bg-center h-screen flex items-center justify-center relative" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
          <motion.div 
            className="text-center text-white bg-black bg-opacity-50 p-12 rounded-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl font-bold mb-6">All About Cats</h1>
            <p className="text-2xl">Discover the fascinating world of our feline friends</p>
          </motion.div>
          {showScrollDown && (
            <motion.div 
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >
              <ChevronDown className="text-white w-12 h-12" />
            </motion.div>
          )}
        </div>

        <div className="container mx-auto py-16 px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Paw className="mr-2" /> Characteristics of Cats</CardTitle>
                <CardDescription className="text-gray-200">What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Independent nature</li>
                  <li>Excellent hunters with sharp claws and teeth</li>
                  <li>Flexible bodies and quick reflexes</li>
                  <li>Keen senses, especially hearing and night vision</li>
                  <li>Communicate through vocalizations, body language, and scent</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-500 to-orange-400 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Heart className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription className="text-gray-200">Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Siamese</li>
                  <li>Persian</li>
                  <li>Maine Coon</li>
                  <li>Bengal</li>
                  <li>Scottish Fold</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mt-16 bg-gradient-to-r from-green-400 to-blue-500 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Cat Fact Generator</CardTitle>
                <CardDescription className="text-gray-200">Learn interesting facts about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-xl">{catFact}</p>
                <Button 
                  onClick={generateCatFact}
                  className="bg-white text-blue-500 hover:bg-gray-100 transition-colors duration-300"
                >
                  Generate New Fact
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
        <div className="container mx-auto text-center">
          <p className="mb-6 text-xl">&copy; 2023 CatWorld. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            {[Instagram, Twitter, Facebook].map((Icon, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-white hover:text-gray-300 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={32} />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
