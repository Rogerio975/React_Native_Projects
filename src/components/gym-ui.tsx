import type { ReactNode } from 'react';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { gymColors } from '@/constants/gym-data';

export function Screen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandMarkText}>V</Text>
          </View>
          <Text style={styles.brandName}>VIVA<Text style={styles.brandNameStrong}>FIT</Text></Text>
          <View style={styles.avatar}><Text style={styles.avatarText}>MC</Text></View>
        </View>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>ACADEMIA · BEM-ESTAR · MOVIMENTO</Text>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

export function Panel({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

export function SectionTitle({
  title,
  action,
  href,
}: {
  title: string;
  action?: string;
  href?: '/explore' | '/schedule' | '/students' | '/plans';
}) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && href ? (
        <Link href={href} asChild>
          <Pressable accessibilityRole="link"><Text style={styles.actionText}>{action}</Text></Pressable>
        </Link>
      ) : null}
    </View>
  );
}

export function Badge({ label, tone = 'green' }: { label: string; tone?: 'green' | 'orange' | 'red' }) {
  const badgeStyle = tone === 'orange' ? styles.badgeOrange : tone === 'red' ? styles.badgeRed : styles.badgeGreen;
  const textStyle = tone === 'orange' ? styles.badgeOrangeText : tone === 'red' ? styles.badgeRedText : styles.badgeGreenText;
  return <View style={[styles.badge, badgeStyle]}><Text style={[styles.badgeText, textStyle]}>{label}</Text></View>;
}

export function PrimaryButton({
  label,
  onPress,
  outlined = false,
}: {
  label: string;
  onPress: () => void;
  outlined?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, outlined && styles.buttonOutlined, pressed && styles.pressed]}>
      <Text style={[styles.buttonText, outlined && styles.buttonOutlinedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: gymColors.background },
  header: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 10 },
  scrollView: { flex: 1 },
  page: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: 36 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  brandMark: { width: 34, height: 34, borderRadius: 12, backgroundColor: gymColors.green, alignItems: 'center', justifyContent: 'center', marginRight: 9 },
  brandMarkText: { color: gymColors.lime, fontSize: 20, fontWeight: '900' },
  brandName: { fontSize: 18, fontWeight: '500', letterSpacing: 2, color: gymColors.ink },
  brandNameStrong: { fontWeight: '900' },
  avatar: { marginLeft: 'auto', width: 38, height: 38, borderRadius: 20, backgroundColor: gymColors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: gymColors.green, fontSize: 12, fontWeight: '800' },
  kicker: { color: gymColors.green, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 8 },
  heading: { color: gymColors.ink, fontSize: 30, lineHeight: 36, fontWeight: '800', letterSpacing: -0.8 },
  subtitle: { color: gymColors.muted, fontSize: 14, lineHeight: 21, marginTop: 5, marginBottom: 23 },
  content: { gap: 18 },
  panel: { backgroundColor: gymColors.card, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: gymColors.line },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { color: gymColors.ink, fontSize: 17, fontWeight: '800' },
  actionText: { color: gymColors.green, fontSize: 13, fontWeight: '700' },
  badge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5, alignSelf: 'flex-start' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeGreen: { backgroundColor: gymColors.greenSoft },
  badgeGreenText: { color: gymColors.green },
  badgeOrange: { backgroundColor: gymColors.orangeSoft },
  badgeOrangeText: { color: '#A45A1F' },
  badgeRed: { backgroundColor: gymColors.redSoft },
  badgeRedText: { color: gymColors.red },
  button: { backgroundColor: gymColors.green, minHeight: 46, borderRadius: 14, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  buttonOutlined: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: gymColors.line },
  buttonOutlinedText: { color: gymColors.ink },
  pressed: { opacity: 0.8, transform: [{ scale: 0.99 }] },
});
