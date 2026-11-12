export type Language = 'en' | 'es';

export interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
  message?: string;
  isAnonymous?: boolean;
  avatarSeed?: string;
}

export interface KeyDateInfo {
  date: string;
  title: string;
  description: string;
  isUrgent?: boolean;
}

export interface ContentDictionary {
  badge: string;
  title: string;
  subtitle: string;
  salutation: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  storyP4: string;
  storyP5: string;
  storyP6: string;
  storyP7: string;
  goalHeading: string;
  targetDateLabel: string;
  targetDateValue: string;
  sentencingLabel: string;
  sentencingValue: string;
  appealClosing: string;
  gratitudeClosing: string;
  signoffTitle: string;
  familySignature: string;
  
  // UI Controls
  donateNow: string;
  shareCampaign: string;
  raisedOf: string;
  goal: string;
  donationsCount: string;
  daysRemaining: string;
  urgentNotice: string;
  viewOriginalFlyer: string;
  viewFamilyPhoto: string;
  readFullStory: string;
  officialDocumentNotice: string;
  
  // Donation Modal
  selectAmount: string;
  customAmount: string;
  yourName: string;
  namePlaceholder: string;
  keepAnonymous: string;
  encouragementMessage: string;
  messagePlaceholder: string;
  paymentMethod: string;
  creditCard: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
  completeDonation: string;
  zelleInstructions: string;
  venmoInstructions: string;
  cashAppInstructions: string;
  
  // Encouragement Wall
  wordsOfSupport: string;
  recentDonations: string;
  leaveMessagePrompt: string;
  postMessageOnly: string;
  thankYouMessage: string;
}
