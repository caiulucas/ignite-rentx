import { addDays } from 'date-fns';
import { Platform } from 'react-native';

export const getPlatformDate = (date: Date): Date =>
  Platform.OS === 'android' ? addDays(date, 1) : date;
