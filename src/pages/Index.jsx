import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Paw, Heart, Instagram, Twitter, Facebook, ChevronDown, Cat, Fish, Mouse, Gift, Mail, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
  { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and round face." },
  { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
  { name: "Bengal", image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Paintedcats_Red_Star_standing.jpg", description: "Known for their wild appearance with spotted or marbled coat patterns." },
  { name: "Scottish Fold", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg", description: "Characterized by their unique folded ears and round, owl-like face." },
];

const catPersonalities = [
  { trait: "Playfulness", score: 85 },
  { trait: "Affection", score: 90 },
  { trait: "Intelligence", score: 75 },
  { trait: "Energy", score: 70 },
  { trait: "Independence", score: 60 },
];

const catQuizQuestions = [
  {
    question: "Which cat breed is known for its blue eyes and color-point coat?",
    options: ["Siamese", "Persian", "Maine Coon", "Bengal"],
    correctAnswer: "Siamese"
  },
  {
    question: "Which cat breed is known for its folded ears?",
    options: ["Scottish Fold", "British Shorthair", "Russian Blue", "Sphynx"],
    correctAnswer: "Scottish Fold"
  },
  {
    question: "Which cat breed is known for its lack of fur?",
    options: ["Sphynx", "Persian", "Ragdoll", "Abyssinian"],
    correctAnswer: "Sphynx"
  },
  {
    question: "Which cat breed is known for its wild appearance with spotted or marbled coat patterns?",
    options: ["Bengal", "Siamese", "Maine Coon", "Persian"],
    correctAnswer: "Bengal"
  },
  {
    question: "Which cat breed is known for being one of the largest domesticated cat breeds?",
    options: ["Maine Coon", "Siamese", "Russian Blue", "Munchkin"],
    correctAnswer: "Maine Coon"
  }
];

const Index = () => {
  const [catFact, setCatFact] = useState(catFacts[0]);
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [toyPosition, setToyPosition] = useState({ x: 50, y: 50 });
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

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

  const handleQuizAnswer = (answer) => {
    if (answer === catQuizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast.success("Correct answer!");
    } else {
      toast.error(`Incorrect. The correct answer is ${catQuizQuestions[currentQuestion].correctAnswer}.`);
    }

    if (currentQuestion < catQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      toast.success(`Quiz completed! Your score: ${score + 1} out of 5`);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const moveToy = () => {
    setToyPosition({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
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
        <motion.div 
          ref={heroRef}
          className="bg-cover bg-center h-screen flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
            opacity: heroOpacity,
            scale: heroScale,
          }}
        >
          <motion.div 
            className="text-center text-white bg-black bg-opacity-50 p-12 rounded-lg relative z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-6xl font-bold mb-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              All About Cats
            </motion.h1>
            <motion.p 
              className="text-2xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Discover the fascinating world of our feline friends
            </motion.p>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Badge className="mt-4 text-lg bg-gradient-to-r from-pink-500 to-purple-500">Meow-nificent!</Badge>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {[...Array(20)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 2,
                }}
              >
                <Sparkles className="text-yellow-300" size={24} />
              </motion.div>
            ))}
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
        </motion.div>

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
                <Tabs defaultValue="carousel" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="carousel">Carousel</TabsTrigger>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                  </TabsList>
                  <TabsContent value="carousel">
                    <Carousel className="w-full max-w-xs mx-auto">
                      <CarouselContent>
                        {catBreeds.map((breed, index) => (
                          <CarouselItem key={index}>
                            <motion.div 
                              className="p-1"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                  <img src={breed.image} alt={breed.name} className="w-full h-full object-cover rounded-md" />
                                </CardContent>
                              </Card>
                              <h3 className="text-center mt-2 font-semibold">{breed.name}</h3>
                              <p className="text-center text-sm mt-1">{breed.description}</p>
                            </motion.div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                  </TabsContent>
                  <TabsContent value="grid">
                    <div className="grid grid-cols-2 gap-4">
                      {catBreeds.map((breed, index) => (
                        <motion.div 
                          key={index}
                          className="relative overflow-hidden rounded-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                            <h3 className="text-lg font-semibold">{breed.name}</h3>
                            <p className="text-sm mt-1">{breed.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-500 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><Gift className="mr-2" /> Cat Breed Quiz</CardTitle>
                <CardDescription className="text-gray-200">Test your knowledge of cat breeds!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-xl mb-4">Question {currentQuestion + 1} of 5:</p>
                  <p className="text-lg font-semibold">{catQuizQuestions[currentQuestion].question}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {catQuizQuestions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuizAnswer(option)}
                        className="bg-white text-orange-500 hover:bg-gray-100 transition-colors duration-300"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-lg font-semibold">Score: {score} / 5</p>
                    <Progress value={(score / 5) * 100} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="mt-16 bg-gradient-to-r from-purple-400 to-pink-500 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><Mouse className="mr-2" /> Interactive Cat Toy</CardTitle>
                <CardDescription className="text-gray-200">Play with the virtual cat toy!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <motion.div
                    className="absolute w-8 h-8 bg-red-500 rounded-full"
                    animate={{ x: `${toyPosition.x}%`, y: `${toyPosition.y}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <Button
                    onClick={moveToy}
                    className="absolute bottom-4 right-4 bg-white text-pink-500 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Move Toy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="mt-16 mb-16 bg-gradient-to-r from-blue-400 to-indigo-500 text-white overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center"><Mail className="mr-2" /> Subscribe to Our Newsletter</CardTitle>
                <CardDescription className="text-gray-200">Get the latest cat news and updates!</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubscribe} className="flex space-x-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white text-black flex-grow"
                  />
                  <Button type="submit" className="bg-white text-indigo-500 hover:bg-gray-100 transition-colors duration-300">
                    Subscribe
                  </Button>
                </form>
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
