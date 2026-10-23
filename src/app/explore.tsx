import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Panel, PrimaryButton, Screen, SectionTitle } from '@/components/gym-ui';
import { gymColors, workoutExercises } from '@/constants/gym-data';

export default function WorkoutsScreen() {
  const [completed, setCompleted] = useState<string[]>([]);
  const toggleExercise = (name: string) => {
    setCompleted((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  };

  return (
    <Screen title="Treinos" subtitle="Sua rotina personalizada para evoluir com consistência.">
      <Panel style={styles.summary}>
        <View style={styles.summaryTop}><Badge label="TREINO A · SEGUNDA-FEIRA" /><Text style={styles.duration}>45 min</Text></View>
        <Text style={styles.summaryTitle}>Pernas e glúteos</Text>
        <Text style={styles.summaryDescription}>Foco em força e estabilidade. Descanse 60–90 segundos entre as séries.</Text>
        <View style={styles.progressTrack}><View style={[styles.progress, { width: `${(completed.length / workoutExercises.length) * 100}%` }]} /></View>
        <Text style={styles.progressLabel}>{completed.length} de {workoutExercises.length} exercícios concluídos</Text>
      </Panel>

      <View>
        <SectionTitle title="Exercícios" />
        <View style={styles.exerciseList}>
          {workoutExercises.map((exercise, index) => {
            const isDone = completed.includes(exercise.name);
            return (
              <Panel key={exercise.name} style={styles.exercise}>
                <Pressable onPress={() => toggleExercise(exercise.name)} accessibilityRole="checkbox" accessibilityState={{ checked: isDone }} style={[styles.check, isDone && styles.checkDone]}>
                  <Text style={[styles.checkText, isDone && styles.checkTextDone]}>{isDone ? '✓' : String(index + 1).padStart(2, '0')}</Text>
                </Pressable>
                <View style={styles.exerciseInfo}>
                  <Text style={[styles.exerciseName, isDone && styles.exerciseDone]}>{exercise.name}</Text>
                  <Text style={styles.exerciseDetail}>{exercise.detail}</Text>
                </View>
                <Badge label={exercise.group} />
              </Panel>
            );
          })}
        </View>
      </View>
      <PrimaryButton label={completed.length === workoutExercises.length ? 'Treino concluído!' : 'Finalizar treino'} onPress={() => setCompleted(workoutExercises.map((exercise) => exercise.name))} />
      <Text style={styles.coachNote}>Dica da instrutora · Mantenha a postura e controle o movimento em cada repetição.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { backgroundColor: gymColors.green, borderColor: gymColors.green, padding: 20 },
  summaryTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  duration: { color: '#D5E9DD', fontSize: 12, fontWeight: '700' },
  summaryTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginTop: 22 },
  summaryDescription: { color: '#DDEDE4', fontSize: 13, lineHeight: 19, marginTop: 7 },
  progressTrack: { height: 6, borderRadius: 5, backgroundColor: '#3B8064', overflow: 'hidden', marginTop: 22 },
  progress: { height: 6, backgroundColor: gymColors.lime, borderRadius: 5 },
  progressLabel: { color: '#DDEDE4', fontSize: 11, marginTop: 7 },
  exerciseList: { gap: 9 },
  exercise: { flexDirection: 'row', alignItems: 'center', padding: 13, gap: 12 },
  check: { width: 35, height: 35, borderRadius: 12, backgroundColor: '#F2F5F3', alignItems: 'center', justifyContent: 'center' },
  checkDone: { backgroundColor: gymColors.green },
  checkText: { fontSize: 11, fontWeight: '800', color: gymColors.green },
  checkTextDone: { color: '#FFFFFF', fontSize: 18 },
  exerciseInfo: { flex: 1 },
  exerciseName: { color: gymColors.ink, fontSize: 13, fontWeight: '800' },
  exerciseDone: { textDecorationLine: 'line-through', color: gymColors.muted },
  exerciseDetail: { color: gymColors.muted, fontSize: 11, marginTop: 3 },
  coachNote: { color: gymColors.muted, fontSize: 12, lineHeight: 18, textAlign: 'center', marginHorizontal: 12 },
});
