export const PALETTE = [
  '#B98B5E', // kraft brown
  '#F5EFE6', // cream
  '#EFE4CF', // dried-flower ivory
  '#B87A8F', // dusty rose
  '#7A1226', // deep wine
  '#C9A24A', // muted gold
];

export interface StanzaContent {
  id: number;
  lines: string[];
  isHero?: boolean;
  heroLine?: string;
  triggerConfetti?: 'sparkle' | 'petal' | 'finale' | null;
}

export type PageContent = StanzaContent;

export const SALUTATION = "Dear Choti Di,";
export const SIGN_OFF = "— Afeefa";

export const memoryCaptions: string[] = [
  "Always laughing together ✨",
  "Moments to cherish 🤍",
  "Forever my jigar 🌸",
];

export const STANZAS: StanzaContent[] = [
  {
    id: 1,
    lines: [
      "Words would fall short if I ever tried to tell you what you mean to me.",
      "For how does one gather a lifetime into words?",
    ],
  },
  {
    id: 2,
    lines: [
      "The laughter that found us in the most ordinary moments, the silly fights, the secrets whispered between us, and the quiet nights when the world felt a little too heavy—somehow, you have been woven into all of it.",
    ],
  },
  {
    id: 3,
    lines: [
      "You have seen every version of me:",
      "the loud one, the foolish one, the hurting one, the one who feels far too much.",
      "And I know I sound like too much sometimes…",
      "but perhaps that is only because, when it comes to you, my heart has never learned the art of feeling lightly.",
    ],
  },
  {
    id: 4,
    lines: [
      "When I called you my jigar.",
      "Perhaps Nobody understood the weight of the word then.",
      "We are given only one jigar, after all.",
      "And when that one is hurt, the ache does not remain in one place—it travels through you, quietly touching every corner of your being.",
    ],
  },
  {
    id: 5,
    lines: [
      "That is what you became to me.",
      "Not merely my sister,",
      "but a little piece of my own heart walking outside of me.",
      "You are my blessing in disguise,",
      "a gift Allah placed in my life long before I understood what a gift you would become.",
    ],
  },
  {
    id: 6,
    lines: [
      "And now I watch you step into this new chapter with Wasey bhai, and there is something almost unreal about it. The girl I grew up laughing with, fighting with, annoying, loving, and growing beside is now walking toward her own forever.",
    ],
  },
  {
    id: 7,
    lines: [
      "May this new life be gentle with you.",
      "May your home be filled with the warmth of morning light, your heart with sukoon, and your days with the kind of love that makes even ordinary moments feel sacred.",
    ],
  },
  {
    id: 8,
    lines: [
      "Allah aapko Arsh ke rang lagaye—",
      "may He colour your life with a thousand beautiful shades of love, barakah, laughter and peace.",
    ],
    triggerConfetti: 'sparkle',
  },
  {
    id: 9,
    lines: [
      "And if life ever becomes too heavy,",
      "if the world ever feels too cold,",
      "if you ever need somewhere to return to—",
      "run to me.",
    ],
    triggerConfetti: 'petal',
  },
  {
    id: 10,
    lines: [
      "I'll always try to be the bhai you needed,",
      "and the younger sister you could find in every storm.",
      "Because no matter how many chapters life writes for you,",
      "no matter how far the story carries you—",
      "I'll always be somewhere in the pages.",
    ],
  },
  {
    id: 11,
    isHero: true,
    heroLine: "Happy Birthday, Choti Diiiiiiiiiiiiiii",
    lines: [
      "My human Spotify, forever somehow finding the right tune for every version of my chaos.",
      "My chaos.",
      "My safe place.",
      "My blessing in disguise.",
      "And perhaps the most beautiful thing I can ever say is this—",
      "In this vast world, Allah gave me one jigar,",
      "and somehow, He made her my sister.",
      "love you, beyond what these little words could ever hold🤍",
    ],
    triggerConfetti: 'finale',
  },
];

export const PAGES = STANZAS;

export const SITE_METADATA = {
  title: "A little something for you 🤍",
  description: "A mobile birthday card filled with love",
  coverImage: "/cover.jpeg?v=3",
};
