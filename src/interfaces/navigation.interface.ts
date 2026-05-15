import { ROUTES } from '../constants/routes';

export type AppStackParamList = {
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.SCHEME_DETAILS]: { schemeId: string };
  [ROUTES.JOIN_SCHEME]: { schemeId: string };
  [ROUTES.PAYMENT]: { amount: number };
  [ROUTES.PAYMENT_HISTORY]: undefined;
  [ROUTES.INSTALLMENT_TRACKER]: { schemeId: string };
};

export type AuthStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.REGISTER]: undefined;
  [ROUTES.OTP_VERIFY]: { phoneNumber: string };
};

export type MainTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SCHEME_LIST]: undefined;
  [ROUTES.PROFILE]: undefined;
};
