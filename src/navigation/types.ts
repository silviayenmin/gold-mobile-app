import { ROUTES } from '../constants/routes';

export type AuthStackParamList = {
  [ROUTES.SPLASH]: undefined;
  [ROUTES.LOGIN]: undefined;
  [ROUTES.OTP_VERIFY]: { phoneNumber: string };
};

export type AppStackParamList = {
  [ROUTES.MAIN_TABS]: undefined;
  [ROUTES.SCHEME_DETAILS]: { schemeId: string };
  [ROUTES.JOIN_SCHEME]: { schemeId: string };
  [ROUTES.PAYMENT]: { installmentId: string; amount: number };
  [ROUTES.PAY_DUE]: undefined;
  [ROUTES.PAYMENT_HISTORY]: undefined;
  [ROUTES.INSTALLMENT_TRACKER]: { schemeId: string };
};

export type BottomTabParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.SCHEME_LIST]: undefined;
  [ROUTES.OFFERS]: undefined;
  [ROUTES.PROFILE]: undefined;
};

export type RootStackParamList = AuthStackParamList & AppStackParamList & BottomTabParamList;
