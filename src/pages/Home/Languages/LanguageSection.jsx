import { motion } from 'framer-motion';
import './LanguageSection.css'

const languages = [
  { name: 'English', description: 'Learn English to enhance your communication skills globally.' },
  { name: 'French', description: 'Master French and explore the richness of French culture.' },
  { name: 'Spanish', description: 'Speak Spanish and connect with millions of native speakers.' },
  { name: 'German', description: 'German is a gateway to innovative industries and culture.' },
];

const cardVariants = {
  hidden: { opacity: 0, rotateY: -180 },
  visible: { opacity: 1, rotateY: 0 },
};

const LanguageCard = ({ name, description }) => {
  return (
    <motion.div
      className="relative w-64 h-40 m-4 bg-white shadow-lg cursor-pointer perspective mt-24 mb-12"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute w-full h-full backface-hidden flex items-center justify-center bg-blue-500 text-white"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-lg font-bold">{name}</h3>
      </motion.div>
      <motion.div
        className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white text-black rotate-y-180"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 2 }}
      >
        <p className="text-center p-4">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const LanguageSection = () => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {languages.map((language, index) => (
        <LanguageCard key={index} name={language.name} description={language.description} />
      ))}
    </div>
  );
};

export default LanguageSection;
