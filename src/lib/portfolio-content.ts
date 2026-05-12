/**
 * Real project photos and process videos from A&A Flooring, grouped by the
 * kind of work. File paths are relative to /public; render with asset() so
 * the basePath is prepended on GitHub Pages.
 */

export interface PortfolioItem {
  src: string;
  alt: string;
  title: string;
  /** "image" | "video"; videos are loaded with preload="none" */
  type: "image" | "video";
  /** Poster image for videos (lazy-loaded) */
  poster?: string;
  /** Optional larger-tile flag for layouts */
  feature?: boolean;
}

export interface PortfolioGroup {
  slug: string;
  title: string;
  blurb: string;
  items: PortfolioItem[];
}

const P = "/images/portfolio";

export const portfolioGroups: PortfolioGroup[] = [
  {
    slug: "hardwood",
    title: "Hardwood Floors",
    blurb:
      "Engineered and solid hardwood, including white oak, maple, acacia, teak, and herringbone patterns. Site-finished or pre-finished, with custom transitions and matching trim.",
    items: [
      {
        src: `${P}/01-natural-engineered-hardwood.jpeg`,
        alt: "Natural engineered hardwood floor",
        title: "Natural engineered hardwood",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/02-natural-engineered-hardwood.jpeg`,
        alt: "Natural engineered hardwood — detail",
        title: "Natural engineered hardwood",
        type: "image",
      },
      {
        src: `${P}/15-engineered-flooring-installation-sunk-in-living-room.jpeg`,
        alt: "Engineered hardwood in a sunken living room",
        title: "Engineered hardwood, sunken living room",
        type: "image",
      },
      {
        src: `${P}/17-solid-maple-flooring.jpeg`,
        alt: "Solid maple flooring",
        title: "Solid maple",
        type: "image",
      },
      {
        src: `${P}/18-solid-maple-flooring.jpeg`,
        alt: "Solid maple flooring — detail",
        title: "Solid maple",
        type: "image",
      },
      {
        src: `${P}/23-white-oak-engineered-harwood-custome-nosing-accessories.jpeg`,
        alt: "White oak engineered hardwood with custom nosing",
        title: "White oak with custom nosing",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/24-beautyfull-flow-of-wood.jpeg`,
        alt: "Beautiful continuous wood grain flow across a floor",
        title: "Continuous grain flow",
        type: "image",
      },
      {
        src: `${P}/25-flawless-design.jpeg`,
        alt: "Flawless hardwood floor finish",
        title: "Flawless finish",
        type: "image",
      },
      {
        src: `${P}/26-light-staind-engineered-wood.jpeg`,
        alt: "Light-stained engineered wood floor",
        title: "Light-stained engineered",
        type: "image",
      },
      {
        src: `${P}/27-rustic-design.jpeg`,
        alt: "Rustic hardwood floor design",
        title: "Rustic design",
        type: "image",
      },
      {
        src: `${P}/28-flatt-sawn-teak-mimic-white-oak.jpeg`,
        alt: "Flat-sawn teak that mimics white oak",
        title: "Flat-sawn teak (white-oak look)",
        type: "image",
      },
      {
        src: `${P}/29-rich-busy-stylish.jpeg`,
        alt: "Rich, busy, stylish hardwood pattern",
        title: "Rich, busy, stylish",
        type: "image",
      },
      {
        src: `${P}/30-matching-species-of-bullnose.jpeg`,
        alt: "Bullnose milled to match the floor species",
        title: "Species-matched bullnose",
        type: "image",
      },
      {
        src: `${P}/32-very-colour-full-busy-playfull-grain.jpeg`,
        alt: "Colourful, playful hardwood grain",
        title: "Playful grain",
        type: "image",
      },
    ],
  },

  {
    slug: "herringbone",
    title: "Herringbone & Pattern Work",
    blurb:
      "Classic herringbone laid in both real hardwood and click-vinyl. Pattern work in a kitchen reads as bespoke — and adds about 15% to the install time, no extra to the customer for prep.",
    items: [
      {
        src: `${P}/10-click-vinyl-flooring-herringbone-installation.jpeg`,
        alt: "Click vinyl herringbone installation",
        title: "Vinyl herringbone",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/11-click-vinyl-herringbone-installation.jpeg`,
        alt: "Click vinyl herringbone — close detail",
        title: "Vinyl herringbone — detail",
        type: "image",
      },
      {
        src: `${P}/18-herringbone-installation-in-kitchen.jpeg`,
        alt: "Herringbone hardwood installation in a kitchen",
        title: "Herringbone in a kitchen",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/19-process-of-installation-herringbone-style.jpeg`,
        alt: "In-progress herringbone installation",
        title: "Process — herringbone laydown",
        type: "image",
      },
    ],
  },

  {
    slug: "vinyl-laminate",
    title: "Vinyl & Laminate",
    blurb:
      "Click-lock and glue-down vinyl plank, plus laminate in basement suites and high-traffic areas. Acoustic-rated underlay supplied for every strata install.",
    items: [
      {
        src: `${P}/03-click-vinyl-plank.jpeg`,
        alt: "Click vinyl plank floor",
        title: "Click vinyl plank",
        type: "image",
      },
      {
        src: `${P}/04-click-vinyl-plank.jpeg`,
        alt: "Click vinyl plank — alternate view",
        title: "Click vinyl plank",
        type: "image",
      },
      {
        src: `${P}/12-new-subfloor-buld-for-glue-down-vinyl-plank.jpeg`,
        alt: "New subfloor built for a glue-down vinyl plank install",
        title: "Subfloor prep — glue-down vinyl",
        type: "image",
      },
      {
        src: `${P}/13-finished-installation-of-vinyl-flooring.jpeg`,
        alt: "Finished vinyl floor installation",
        title: "Finished vinyl install",
        type: "image",
      },
      {
        src: `${P}/14-vinyl-plank-flooring-for-commercial-space.jpeg`,
        alt: "Vinyl plank flooring in a commercial space",
        title: "Vinyl plank — commercial",
        type: "image",
      },
      {
        src: `${P}/07-laminate-flooring-install-in-basement-suite.jpeg`,
        alt: "Laminate floor installed in a basement suite",
        title: "Laminate in a basement suite",
        type: "image",
      },
      {
        src: `${P}/08-laminate-flooring-install-in-basement-suite.jpeg`,
        alt: "Laminate floor — basement suite, alternate view",
        title: "Laminate in a basement suite",
        type: "image",
      },
      {
        src: `${P}/09-open-sided-laminate-flooring-steep-steep.jpeg`,
        alt: "Open-sided laminate flooring on a steep step",
        title: "Laminate — open-side steep step",
        type: "image",
      },
    ],
  },

  {
    slug: "stairs",
    title: "Custom Stairs",
    blurb:
      "Custom stair treads, risers, casings, curved-staircase work, and waterfall installs — milled to match the floor in our Coquitlam shop. This is the work we're known for.",
    items: [
      {
        src: `${P}/25-naturale-white-oak-custom-waterfall-staircase.jpeg`,
        alt: "Natural white oak custom waterfall staircase",
        title: "White oak waterfall staircase",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/22-curved-staircase.jpg`,
        alt: "Curved hardwood staircase",
        title: "Curved staircase",
        type: "image",
        feature: true,
      },
      {
        src: `${P}/20-engineered-hardwood-treads-on-curved-staircase.jpg`,
        alt: "Engineered hardwood treads on a curved staircase",
        title: "Curved staircase — engineered treads",
        type: "image",
      },
      {
        src: `${P}/21-finul-result.jpg`,
        alt: "Finished custom staircase",
        title: "Finished staircase",
        type: "image",
      },
      {
        src: `${P}/16-engineered-hardwood-stair-treads.jpeg`,
        alt: "Engineered hardwood stair treads",
        title: "Engineered hardwood treads",
        type: "image",
      },
      {
        src: `${P}/31-acacia-engineered-hardwood-open-stair-treads.jpeg`,
        alt: "Acacia engineered hardwood open stair treads",
        title: "Acacia — open stair treads",
        type: "image",
      },
      {
        src: `${P}/05-engineered-hardwood-custom-fabricated-stair-tread-installation.mov`,
        poster: `${P}/16-engineered-hardwood-stair-treads.jpeg`,
        alt: "Process video — custom-fabricated stair tread installation",
        title: "Process: custom stair tread install",
        type: "video",
      },
      {
        src: `${P}/06-finish-result-of-staircase-engineered-hardwood.mov`,
        poster: `${P}/22-curved-staircase.jpg`,
        alt: "Walkthrough of a finished engineered hardwood staircase",
        title: "Walkthrough: finished engineered hardwood staircase",
        type: "video",
      },
    ],
  },
];
