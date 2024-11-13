import { FaUmbrellaBeach } from "react-icons/fa";
import { PiMountainsFill } from "react-icons/pi";
import { MdOutlineApartment } from "react-icons/md";
import { MdVilla } from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";
import { MdMapsHomeWork } from "react-icons/md";
import { FaMountainCity } from "react-icons/fa6";
import { SiAdventofcode } from "react-icons/si";
import { MdPool } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    icon: <FaUmbrellaBeach className="text-2xl tracking-wider" />,
    name: "Beach",
  },
  {
    icon: <PiMountainsFill className="text-2xl tracking-wider" />,
    name: "Mountain",
  },
  {
    icon: <MdOutlineApartment className="text-2xl tracking-wider" />,
    name: "Apartment",
  },
  { icon: <MdVilla className="text-2xl tracking-wider" />, name: "Villa" },
  {
    icon: <TbBuildingCottage className="text-2xl tracking-wider" />,
    name: "Cottage",
  },
  {
    icon: <MdMapsHomeWork className="text-2xl tracking-wider" />,
    name: "Resort",
  },
  {
    icon: <FaMountainCity className="text-2xl tracking-wider" />,
    name: "Countryside",
  },
  {
    icon: <SiAdventofcode className="text-2xl tracking-wider" />,
    name: "Adventure Stays",
  },
  { icon: <MdPool className="text-2xl tracking-wider" />, name: "Pool" },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: -100,
    x: 20,
  },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.1 * index,
      delay: 0.05 * index,
    },
  }),
};

const CategoryList = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      transition={{
        delay: 6,
      }}
      className="flex flex-wrap items-center justify-center mx-auto mt-6 md:flex-row w-fit gap-x-3 md:gap-x-6 gap-y-3"
    >
      {categories.map((category, index) => (
        <motion.div
          key={index}
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          custom={index}
          className="flex flex-col relative items-center text-xs font-poppins text-[#f3424d] hover:text-[#f3424d] tracking-wider group text-opacity-70 hover:opacity-100 hover:cursor-pointer"
          onClick={() => navigate(`/${category.name}/stays`)}
        >
          <div className="absolute w-0 group-hover:w-full duration-200 transition-all h-[2px] bg-[#ff385c] invisible group-hover:visible -bottom-2"></div>
          {category.icon}
          <span>{category.name.split(" ")[0]}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CategoryList;
