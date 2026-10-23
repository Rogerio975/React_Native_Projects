import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Panel, Screen, SectionTitle } from '@/components/gym-ui';
import { gymColors } from '@/constants/gym-data';

export default function HomeScreen() {
  return (
    <Screen title="Seu próximo nível começa aqui." subtitle="Olá, Mariana! Vamos fazer hoje valer a pena.">
      <Panel style={styles.hero}>
        <View style={styles.heroTop}>
          <View>
            <Text style={styles.heroEyebrow}>SEU TREINO DE HOJE</Text>
            <Text style={styles.heroTitle}>Treino A</Text>
            <Text style={styles.heroDetail}>Pernas e glúteos · 45 min</Text>
          </View>
          <View style={styles.heroIcon}><Text style={styles.heroIconText}>↗</Text></View>
        </View>
        <View style={styles.heroBottom}>
          <Badge label="4 exercícios" />
          <Link href="/explore" asChild>
            <Pressable accessibilityRole="link" style={styles.startButton}><Text style={styles.startButtonText}>Ver treino  →</Text></Pressable>
          </Link>
        </View>
      </Panel>

      <View style={styles.metrics}>
        <Panel style={styles.metricCard}>
          <Text style={styles.metricIcon}>◷</Text>
          <Text style={styles.metricValue}>12</Text>
          <Text style={styles.metricLabel}>treinos no mês</Text>
        </Panel>
        <Panel style={styles.metricCard}>
          <Text style={styles.metricIcon}>↗</Text>
          <Text style={styles.metricValue}>78%</Text>
          <Text style={styles.metricLabel}>frequência</Text>
        </Panel>
        <Panel style={styles.metricCard}>
          <Text style={styles.metricIcon}>✦</Text>
          <Text style={styles.metricValue}>+2,4</Text>
          <Text style={styles.metricLabel}>kg no agachamento</Text>
        </Panel>
      </View>

      <View>
        <SectionTitle title="Aulas de hoje" action="Ver agenda" href="/schedule" />
        <Panel style={styles.classRow}>
          <View style={styles.classTime}><Text style={styles.classTimeText}>18:00</Text></View>
          <View style={styles.classInfo}><Text style={styles.className}>Yoga</Text><Text style={styles.classCoach}>com Camila Rocha</Text></View>
          <Badge label="2 vagas" tone="orange" />
        </Panel>
      </View>

      <View>
        <SectionTitle title="Seu espaço" />
        <View style={styles.quickActions}>
          <Link href="/students" asChild><Pressable style={styles.quickAction}><Text style={styles.quickIcon}>♧</Text><Text style={styles.quickTitle}>Alunos</Text><Text style={styles.quickHint}>Acompanhe sua equipe</Text></Pressable></Link>
          <Link href="/plans" asChild><Pressable style={styles.quickAction}><Text style={styles.quickIcon}>◇</Text><Text style={styles.quickTitle}>Planos</Text><Text style={styles.quickHint}>Confira as opções</Text></Pressable></Link>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { backgroundColor: gymColors.navy, borderColor: gymColors.navy, padding: 20 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  heroEyebrow: { color: '#B9CDC2', fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 10 },
  heroTitle: { color: '#FFFFFF', fontSize: 27, fontWeight: '800' },
  heroDetail: { color: '#C9D8D0', fontSize: 13, marginTop: 5 },
  heroIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#2A4438' },
  heroIconText: { color: gymColors.lime, fontSize: 27, fontWeight: '700' },
  heroBottom: { marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  startButton: { paddingVertical: 10, paddingHorizontal: 13, borderRadius: 12, backgroundColor: gymColors.lime },
  startButtonText: { color: gymColors.ink, fontSize: 13, fontWeight: '800' },
  metrics: { flexDirection: 'row', gap: 8 },
  metricCard: { flex: 1, padding: 12, minHeight: 112 },
  metricIcon: { color: gymColors.green, fontSize: 18, fontWeight: '700' },
  metricValue: { color: gymColors.ink, fontSize: 21, fontWeight: '800', marginTop: 8 },
  metricLabel: { color: gymColors.muted, fontSize: 10, lineHeight: 14, marginTop: 3 },
  classRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  classTime: { backgroundColor: gymColors.greenSoft, borderRadius: 12, padding: 10 },
  classTimeText: { color: gymColors.green, fontSize: 12, fontWeight: '800' },
  classInfo: { flex: 1 },
  className: { color: gymColors.ink, fontWeight: '800', fontSize: 14 },
  classCoach: { color: gymColors.muted, fontSize: 11, marginTop: 3 },
  quickActions: { flexDirection: 'row', gap: 10 },
  quickAction: { flex: 1, padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: gymColors.line },
  quickIcon: { color: gymColors.green, fontSize: 21, fontWeight: '700' },
  quickTitle: { color: gymColors.ink, fontSize: 14, fontWeight: '800', marginTop: 8 },
  quickHint: { color: gymColors.muted, fontSize: 11, marginTop: 3 },
});
