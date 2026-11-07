import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { useColors, fonts, spacing, typography } from '../constants/theme'

//themed components
import ThemedText from '../components/ThemedText'

const ReflexesScreen = () => {
  const styles = getStyles(useColors())
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <ThemedText style={styles.title} title={true}>
        Primární reflexy
      </ThemedText>

      <ThemedText style={styles.text}>
        Primární reflexy jsou automatické pohybové reakce. Objevují se už v
        prenatálním období a v prvních měsících pomáhají miminku přežít a
        vyvíjet se. Postupně by měly odeznít (inhibovat se) a nahradit je
        posturální reflexy a vědomě řízený pohyb. Když reflex přetrvává déle,
        než má, může dítěti komplikovat učení, pohyb, soustředění i chování.
      </ThemedText>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Moro reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Je to poplachová reakce na náhlý podnět, třeba hlasitý zvuk, prudkou
          změnu polohy nebo světla. Miminko rozhodí ruce, nadechne se a pak je
          přitáhne k tělu. Reflex by měl odeznít ve 2. až 4. měsíci. Pokud
          přetrvává, dítě může být přecitlivělé na zvuky, světlo a dotyky,
          snadno se lekne, bývá úzkostné, výbušné nebo trpí výkyvy nálad.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Hledací reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Když se miminka někdo dotkne na tváři nebo kolem úst, otočí hlavu za
          podnětem a otevře ústa, aby našlo prsní bradavku. Odeznívá kolem 3. až
          4. měsíce. Pokud přetrvává, dítě může mít citlivé okolí úst, potíže s
          jídlem nebo nepřesnou výslovnost.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Sací reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Dotkne-li se něco rtů nebo patra, miminko začne rytmicky sát. Je to
          základ pro kojení. Odeznívá kolem 3. až 4. měsíce. Při přetrvávání se
          mohou objevit potíže s polykáním, žvýkáním a artikulací a dítě může
          mít sklon cucat si prsty nebo okusovat předměty.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Palmární (úchopový) reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Když miminku něco přitlačíte do dlaně, sevře to v pěst. Reflex úzce
          souvisí s pohyby úst. Odeznívá mezi 3. a 6. měsícem. Pokud přetrvává,
          dítě může špatně držet tužku, mít neobratnou jemnou motoriku a při
          psaní nebo stříhání se mu mohou souhybně pohybovat ústa či jazyk.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Plantární reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Po tlaku na chodidlo pod prsty se prsty u nohou ohnou, jako by chtěly
          něco uchopit. Odeznívá zhruba mezi 7. a 12. měsícem, kdy se dítě
          začíná stavět a chodit. Při přetrvávání se mohou objevit neobvyklý
          způsob chůze, chůze po špičkách nebo horší rovnováha.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Tonický labyrintový reflex (TLR)
        </ThemedText>
        <ThemedText style={styles.text}>
          Reaguje na náklon hlavy dopředu nebo dozadu. Při předklonu se celé
          tělo ohýbá, při záklonu napíná. Varianta vpřed odeznívá kolem 4.
          měsíce, varianta vzad postupně až do 3 let. Přetrvávající TLR může
          souviset se špatnou rovnováhou, kinetózou (nevolností v autě),
          ochablým nebo naopak ztuhlým držením těla a horší orientací v
          prostoru.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Asymetrický tonický šíjový reflex (ATŠR)
        </ThemedText>
        <ThemedText style={styles.text}>
          Když miminko otočí hlavu na stranu, natáhne ruku a nohu na té straně a
          druhou stranu pokrčí. Podporuje propojení oko–ruka. Měl by odeznít
          kolem 6. měsíce. Pokud přetrvává, dítě mívá potíže s psaním, s
          překřižováním střední čáry těla, se sledováním řádku při čtení a s
          koordinací obou stran těla.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Symetrický tonický šíjový reflex (STŠR)
        </ThemedText>
        <ThemedText style={styles.text}>
          Objevuje se na krátkou dobu kolem 6. až 9. měsíce a pomáhá dítěti
          zvednout se na čtyři. Když dítě zvedne hlavu, ruce se natáhnou a nohy
          pokrčí, a naopak. Měl by odeznít mezi 9. a 11. měsícem. Při
          přetrvávání dítě často nelezlo po čtyřech, hrbí se při sezení, „visí“
          na lavici, těžko opisuje z tabule a hůř se soustředí.
        </ThemedText>
      </View>

      <View style={styles.block}>
        <ThemedText style={styles.subtitle} title={true}>
          Spinální Galantův reflex
        </ThemedText>
        <ThemedText style={styles.text}>
          Dotyk na zádech podél páteře vyvolá ohnutí trupu na tu stranu. Reflex
          pomáhá při porodu a rozvíjí pohyblivost páteře. Odeznívá mezi 3. a 9.
          měsícem. Pokud přetrvává, dítě bývá neposedné, vadí mu těsné oblečení
          a pásek a bývá spojován i s nočním pomočováním po 5. roce věku.
        </ThemedText>
      </View>
    </ScrollView>
  )
}

export default ReflexesScreen
const getStyles = (palette) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: palette.background,
    },
    container: {
      paddingHorizontal: spacing.screen,
      paddingVertical: 40,
    },
    title: {
      ...typography.headlineLg,
      textAlign: 'center',
    },
    block: {
      marginTop: 8,
    },
    subtitle: {
      fontFamily: fonts.bold,
      fontSize: 19,
      lineHeight: 26,
    },
    text: {
      ...typography.bodyLg,
      marginTop: 8,
      marginBottom: 16,
    },
  })
