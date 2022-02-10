import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig,
} from 'react-native-calendars';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { ptBR } from './localeConfig';

export interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export const Calendar: React.FC<CalendarProps> = ({
  markedDates,
  onDayPress,
}) => {
  const { colors, fonts } = useTheme();

  return (
    <CustomCalendar
      renderArrow={direction => (
        <Feather name={`chevron-${direction}`} size={24} color={colors.text} />
      )}
      headerStyle={{
        backgroundColor: colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.text_detail,
        paddingBottom: RFValue(24),
      }}
      theme={{
        textDayFontFamily: fonts.primary_400,
        textDayHeaderFontFamily: fonts.secondary_600,
        textMonthFontFamily: fonts.secondary_600,
        textDayHeaderFontSize: RFValue(10),
        textMonthFontSize: RFValue(20),
        monthTextColor: colors.title,
        textSectionTitleColor: colors.text_detail,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};
