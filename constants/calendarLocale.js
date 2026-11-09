import { LocaleConfig } from 'react-native-calendars'

// Czech names for every <Calendar> in the app (month names, weekday letters).
// Imported once in app/_layout.jsx, so it is set before any calendar shows.
LocaleConfig.locales.cs = {
  monthNames: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec',
  ],
  monthNamesShort: [
    'led',
    'úno',
    'bře',
    'dub',
    'kvě',
    'čvn',
    'čvc',
    'srp',
    'zář',
    'říj',
    'lis',
    'pro',
  ],
  dayNames: [
    'neděle',
    'pondělí',
    'úterý',
    'středa',
    'čtvrtek',
    'pátek',
    'sobota',
  ],
  dayNamesShort: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
  today: 'Dnes',
}
LocaleConfig.defaultLocale = 'cs'
