import Link from 'next/link';

interface PromoBannerProps {
  buttonText: string;
  buttonLink: string;
}

// Determine current season and end date based on fashion retail calendar
function getCurrentSeason() {
  const today = new Date();
  const month = today.getMonth(); // 0-11
  const year = today.getFullYear();
  
  // Fashion retail seasons
  if (month === 0) { // January - End-of-season (Fall/Winter)
    return { 
      name: 'End-of-Season', 
      endDate: new Date(year, 0, 31),
      discount: '50%',
      code: 'FINAL50'
    };
  } else if (month === 1) { // February - Pre-season (Spring/Summer)
    return { 
      name: 'Pre-Season', 
      endDate: new Date(year, 1, 28),
      discount: '15%',
      code: 'PRE15'
    };
  } else if (month >= 2 && month <= 3) { // March-April - Early-season (Spring/Summer)
    return { 
      name: 'Early-Season', 
      endDate: new Date(year, 3, 30),
      discount: '20%',
      code: 'EARLY20'
    };
  } else if (month >= 4 && month <= 5) { // May-June - Mid-season (Spring/Summer)
    return { 
      name: 'Mid-Season', 
      endDate: new Date(year, 5, 30),
      discount: '30%',
      code: 'MID30'
    };
  } else if (month === 6) { // July - End-of-season (Spring/Summer)
    return { 
      name: 'End-of-Season', 
      endDate: new Date(year, 6, 31),
      discount: '50%',
      code: 'FINAL50'
    };
  } else if (month === 7) { // August - Pre-season (Fall/Winter)
    return { 
      name: 'Pre-Season', 
      endDate: new Date(year, 7, 31),
      discount: '15%',
      code: 'PRE15'
    };
  } else if (month === 8) { // September - Early-season (Fall/Winter)
    return { 
      name: 'Early-Season', 
      endDate: new Date(year, 8, 30),
      discount: '20%',
      code: 'EARLY20'
    };
  } else if (month >= 9 && month <= 10) { // October-November - Mid-season (Fall/Winter)
    return { 
      name: 'Mid-Season', 
      endDate: new Date(year, 10, 30),
      discount: '30%',
      code: 'MID30'
    };
  } else if (month === 11) { // December - End-of-season (Fall/Winter)
    return { 
      name: 'End-of-Season', 
      endDate: new Date(year, 11, 31),
      discount: '50%',
      code: 'FINAL50'
    };
  }
  
  // Fallback
  return { 
    name: 'Season', 
    endDate: new Date(year, month + 1, 0),
    discount: '20%',
    code: 'SAVE20'
  };
}

export default function PromoBanner({ buttonText, buttonLink }: PromoBannerProps) {
  const season = getCurrentSeason();
  const today = new Date();
  const diffTime = season.endDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Determine heading and text based on days remaining
  let heading = '';
  let text = '';
  
  if (daysLeft > 0) {
    heading = `${season.name} Sale <br /> ${daysLeft === 1 ? 'Final Day' : `${daysLeft} Days Left`}. Extra ${season.discount} Off`;
    text = `Up to ${season.discount} off. Plus, extra ${season.discount} off when you shop $45 or more on discounted items with code ${season.code}. Online only, until it lasts.`;
  } else if (daysLeft === 0) {
    heading = `${season.name} Sale <br /> Last Hours. Extra ${season.discount} Off`;
    text = `Up to ${season.discount} off. Plus, extra ${season.discount} off when you shop $45 or more on discounted items with code ${season.code}. Online only, ends today.`;
  } else {
    heading = `Explore Our Collection`;
    text = `Discover timeless pieces and premium essentials. Shop the latest arrivals.`;
  }
  
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Heading */}
          <h2 
            className="text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-4 text-[#DC2E2F] tracking-wide leading-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          
          {/* Text */}
          <p className="text-sm md:text-base text-black mb-6 md:mb-8 max-w-3xl leading-relaxed px-6 md:px-12 lg:px-16">
            {text}
          </p>
          
          {/* Button */}
          <Link
            href={buttonLink}
            className="inline-block bg-white text-black border border-black px-12 py-3 text-sm font-medium uppercase tracking-wider hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
