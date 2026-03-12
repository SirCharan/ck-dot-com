import HeroStatic from './HeroStatic';
import HeroClientBridge from './HeroClientBridge';

const Hero = () => {
  return (
    <div className="relative">
      <HeroStatic />
      <HeroClientBridge />
    </div>
  );
};

export default Hero;
