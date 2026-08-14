import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';
import { Globe, Phone, MapPin } from 'lucide-react';

// Icon component for contact details using lucide-react
const InfoIcon = ({ type }) => {
  const icons = {
    website: <Globe className="h-5 w-5 text-[#10B981] flex-shrink-0 mr-2" />,
    phone:   <Phone className="h-5 w-5 text-[#10B981] flex-shrink-0 mr-2" />,
    address: <MapPin className="h-5 w-5 text-[#10B981] flex-shrink-0 mr-2" />,
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

const HeroSection = React.forwardRef(
  ({ className, logo, slogan, title, subtitle, callToAction, backgroundImage, contactInfo, ...props }, ref) => {

    // Animation variants — orchestrates children sequentially
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    };

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative flex w-full flex-col overflow-hidden bg-[#FAFAFA] dark:bg-[#09090B] text-[#09090B] dark:text-[#FAFAFA] md:flex-row",
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">

          {/* Top Section: Logo & Main Content */}
          <div>
            <motion.header className="mb-12" variants={itemVariants}>
              {logo && (
                <div className="flex items-center gap-3">
                  <img src={logo.url} alt={logo.alt} className="h-8 rounded-lg" />
                  <div>
                    {logo.text && (
                      <p className="text-lg font-bold font-heading text-[#09090B] dark:text-[#FAFAFA]">
                        {logo.text}
                      </p>
                    )}
                    {slogan && (
                      <p className="text-xs tracking-wider text-[#71717A] dark:text-[#A1A1AA] font-mono uppercase">
                        {slogan}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.header>

            <motion.main variants={containerVariants}>
              <motion.h1
                className="text-4xl font-extrabold leading-tight text-[#09090B] dark:text-[#FAFAFA] md:text-5xl font-heading"
                variants={itemVariants}
              >
                {title}
              </motion.h1>
              {/* Emerald accent divider bar */}
              <motion.div
                className="my-6 h-1 w-20 bg-[#10B981] rounded-full"
                variants={itemVariants}
              />
              <motion.p
                className="mb-8 max-w-md text-base text-[#71717A] dark:text-[#A1A1AA] leading-relaxed"
                variants={itemVariants}
              >
                {subtitle}
              </motion.p>
              <motion.a
                href={callToAction.href}
                className="text-base font-bold tracking-widest text-[#2563EB] dark:text-[#60A5FA] transition-colors hover:text-[#10B981] dark:hover:text-[#10B981] font-mono uppercase"
                variants={itemVariants}
              >
                {callToAction.text} →
              </motion.a>
            </motion.main>
          </div>

          {/* Bottom Section: Footer Contact Info */}
          <motion.footer className="mt-12 w-full" variants={itemVariants}>
            <div className="grid grid-cols-1 gap-4 text-xs text-[#71717A] dark:text-[#A1A1AA] sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <InfoIcon type="website" />
                <span className="font-mono">{contactInfo.website}</span>
              </div>
              <div className="flex items-center gap-2">
                <InfoIcon type="phone" />
                <span className="font-mono">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <InfoIcon type="address" />
                <span className="font-mono">{contactInfo.address}</span>
              </div>
            </div>
          </motion.footer>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full lg:w-2/5"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          animate={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />
      </motion.section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export { HeroSection };
