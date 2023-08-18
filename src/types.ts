export interface OnboardingProps {
  navigation: {
    replace: (route: string) => void;
  };
}

export interface INavigation {
  navigate: (route: string, options?: Record<string, any>) => void;
  replace: (route: string, options?: Record<string, any>) => void;
  goBack: () => void;
}

export interface IRoute {
  params: Record<string, string>;
}

interface IReaction {
  id: string;
  reaction: string;
  userId: string;
}

interface IComment {
  id: string;
  userId: string;
  body: string;
  date: string;
}

export interface ITransaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  dueDate: string;
  category: string;
  reactions?: Array<IReaction>;
  comments?: Array<IComment>;
  insights?: Array<string>;
  userId: string;
  purpose: string;
}

type View = {
  id: string;
  userId: string;
  lastSlide: number;
};

type Slide = {
  id: string;
  body: string;
  title: string;
  image?: string;
  textFontSize?: string;
  textFontFamily?: string;
  backgroundColor?: string;
};

type SummaryReaction = {
  userId: string;
  type: string;
};

export interface ISummary {
  id: string;
  title: string;
  author: string;
  date: string;
  userId: string;
  slides: Array<Slide>;
  creatorName: string;
  views?: Array<View>;
  paidViews?: Array<string>;
  likes?: Array<SummaryReaction>;
  dislikes?: Array<SummaryReaction>;
  createdAt: string;
}

export interface IAccountPartners {
  name: string;
  email: string;
  accepted: boolean;
  id?: string;
}

export interface IUser {
  email: string;
  phone?: string;
  username: string;
  responsibilities?: [string];
  passcode?: string;
  isVerified: boolean;
}
