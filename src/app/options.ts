export class Options {
  verifyEmail: boolean;
  verifyProviderEmail: boolean;
  allowUnverifiedLogin?: boolean;
  preventLoginIDHarvesting: boolean;
  sendWelcomeEmail: boolean;
  sendAccountDeletedEmail: boolean;
  defaultLanguage: string;
  loginIdentifierConflict: string;
  loginIdentifiers: string;
  errorCode: number;
  errorMessage?: string;
};
