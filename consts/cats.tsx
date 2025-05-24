import Cat1 from '@/assets/cats/cat-1.svg';
import Cat2 from '@/assets/cats/cat-2.svg';
import Cat3 from '@/assets/cats/cat-3.svg';
import Cat4 from '@/assets/cats/cat-4.svg';
import Cat5 from '@/assets/cats/cat-5.svg';
import Cat7 from '@/assets/cats/cat-7.svg';
import Cat8 from '@/assets/cats/cat-8.svg';
import Cat9 from '@/assets/cats/cat-9.svg';
import Cat10 from '@/assets/cats/cat-10.svg';

const catComponents = [Cat1, Cat2, Cat3, Cat4, Cat5, Cat7, Cat8, Cat9, Cat10];

const positions = [
  { bottom: 10, right: 10 },
  { bottom: 10, left: 10 },
  { bottom: 10 },
];

export const getRandomCat = () => {
  const randomIndex = Math.floor(Math.random() * catComponents.length);
  const RandomCat = catComponents[randomIndex];

  const shouldFlip = Math.random() < 0.5;

  return (
    <RandomCat
      style={{
        marginHorizontal: 20,
        transform: [{ scaleX: shouldFlip ? -1 : 1 }],
      }}
    />
  );
};

export const getRandomPosition = () => {
  const randomIndex = Math.floor(Math.random() * positions.length);
  return positions[randomIndex];
};
