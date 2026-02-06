import Cloudora from "../assets/cloudora-logo.png";

const Hero = () => {
  return (
    <>
      {/* Hero Content */}
      <div className="container mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <img
            src={Cloudora}
            alt="Cloudora Logo"
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up text-balance">
          Simplifying Work,
          <span className="text-orange-500 "> Amplifying Impact</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-grey-200 md:text-2xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
          Is Here!
        </p>
      </div>
    </>
  );
};

export default Hero;
