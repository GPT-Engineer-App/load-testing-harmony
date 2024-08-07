import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paw, Heart, Instagram, Twitter, Facebook, ChevronDown, Cat, Fish, Mouse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr, meow, and chirp.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats have 230 bones, while humans only have 206.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
  "A cat's hearing is much more sensitive than a human's or dog's.",
  "Cats spend 15-20% of their time grooming themselves.",
];

const catBreeds = [
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg" },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const Index = () => {
  const [catFact, setCatFact] = useState(catFacts[0]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollDown(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateCatFact = () => {
    let newFact;
    do {
      newFact = catFacts[Math.floor(Math.random() * catFacts.length)];
    } while (newFact === catFact);
    setCatFact(newFact);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cat className="mr-2" /> CatWorld
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
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Paw className="mr-2" /> Characteristics of Cats</CardTitle>
                <CardDescription className="text-gray-200">What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6 space-y-2">
                  {[
                    { icon: Cat, text: "Independent nature" },
                    { icon: Mouse, text: "Excellent hunters with sharp claws and teeth" },
                    { icon: Fish, text: "Flexible bodies and quick reflexes" },
                    { icon: Paw, text: "Keen senses, especially hearing and night vision" },
                    { icon: Heart, text: "Communicate through vocalizations, body language, and scent" }
                  ].map(({ icon: Icon, text }, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Icon className="mr-2 h-5 w-5" /> {text}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-500 to-orange-400 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl"><Heart className="mr-2" /> Popular Cat Breeds</CardTitle>
                <CardDescription className="text-gray-200">Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {catBreeds.map((breed, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <img src={breed.image} alt={breed.name} className="w-full h-full object-cover rounded-md" />
                            </CardContent>
                          </Card>
                          <h3 className="text-center mt-2 font-semibold">{breed.name}</h3>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mt-16 bg-gradient-to-r from-green-400 to-blue-500 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><Cat className="mr-2" /> Cat Fact Generator</CardTitle>
                <CardDescription className="text-gray-200">Learn interesting facts about cats!</CardDescription>
              </CardHeader>
              <CardContent>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={catFact}
                    className="mb-6 text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {catFact}
                  </motion.p>
                </AnimatePresence>
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
