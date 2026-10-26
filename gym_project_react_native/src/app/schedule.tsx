import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Badge, Panel, PrimaryButton, Screen, SectionTitle } from '@/components/gym-ui';
import { classes, gymColors } from '@/constants/gym-data';

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<'Hoje' | 'Amanhã'>('Hoje');
  const [booked, setBooked] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const toggleBooking = (id: string) => {
    setConfirmed(false);
    setBooked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <Screen title="Agenda de aulas" subtitle="Encontre sua próxima aula e reserve seu lugar.">
      <View style={styles.dayPicker}>
        {(['Hoje', 'Amanhã'] as const).map((day) => (
          <Pressable key={day} onPress={() => setSelectedDay(day)} accessibilityRole="button" accessibilityState={{ selected: selectedDay === day }} style={[styles.dayButton, selectedDay === day && styles.dayButtonSelected]}>
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextSelected]}>{day}</Text>
            <Text style={[styles.dateText, selectedDay === day && styles.dateTextSelected]}>{day === 'Hoje' ? 'SEX · 23 OUT' : 'SÁB · 24 OUT'}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <SectionTitle title={`${classes.length} aulas disponíveis`} />
        <View style={styles.classList}>
          {classes.map((classItem) => {
            const isBooked = booked.includes(classItem.id);
            return (
              <Panel key={classItem.id} style={styles.classCard}>
                <View style={[styles.timeBlock, { backgroundColor: classItem.color }]}><Text style={styles.time}>{classItem.time}</Text><Text style={styles.timeLabel}>INÍCIO</Text></View>
                <View style={styles.classDetails}>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <Text style={styles.coach}>{classItem.coach}</Text>
                  <Badge label={`${classItem.spots - (isBooked ? 1 : 0)} vagas`} tone={classItem.spots < 3 ? 'orange' : 'green'} />
                </View>
                <Pressable onPress={() => toggleBooking(classItem.id)} accessibilityRole="button" style={[styles.bookButton, isBooked && styles.bookedButton]}>
                  <Text style={[styles.bookText, isBooked && styles.bookedText]}>{isBooked ? '✓' : '+'}</Text>
                </Pressable>
              </Panel>
            );
          })}
        </View>
      </View>
      <Panel style={styles.notice}>
        <Text style={styles.noticeTitle}>Sua reserva</Text>
        <Text style={styles.noticeText}>{booked.length ? `${booked.length} aula${booked.length > 1 ? 's' : ''} reservada${booked.length > 1 ? 's' : ''} para ${selectedDay.toLowerCase()}.` : 'Toque no + para reservar uma aula. Você pode cancelar quando quiser.'}</Text>
      </Panel>
      <PrimaryButton
        label={confirmed ? 'Reservas confirmadas' : booked.length ? `Confirmar ${booked.length} reserva${booked.length > 1 ? 's' : ''}` : 'Escolher uma aula'}
        onPress={() => {
          if (booked.length) setConfirmed(true);
          else toggleBooking(classes[0].id);
        }}
        outlined={!booked.length}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  dayPicker: { flexDirection: 'row', gap: 10 },
  dayButton: { flex: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: gymColors.line, backgroundColor: '#FFFFFF' },
  dayButtonSelected: { backgroundColor: gymColors.green, borderColor: gymColors.green },
  dayText: { color: gymColors.ink, fontSize: 14, fontWeight: '800' },
  dayTextSelected: { color: '#FFFFFF' },
  dateText: { color: gymColors.muted, fontSize: 10, fontWeight: '700', marginTop: 5 },
  dateTextSelected: { color: '#D5E9DD' },
  classList: { gap: 10 },
  classCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  timeBlock: { width: 62, height: 67, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  time: { color: gymColors.ink, fontSize: 15, fontWeight: '800' },
  timeLabel: { color: gymColors.muted, fontSize: 8, fontWeight: '800', marginTop: 4, letterSpacing: 0.5 },
  classDetails: { flex: 1, gap: 5 },
  className: { color: gymColors.ink, fontSize: 14, fontWeight: '800' },
  coach: { color: gymColors.muted, fontSize: 11 },
  bookButton: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: gymColors.green },
  bookedButton: { backgroundColor: gymColors.greenSoft },
  bookText: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', lineHeight: 25 },
  bookedText: { color: gymColors.green, fontSize: 18 },
  notice: { backgroundColor: gymColors.greenSoft, borderColor: gymColors.greenSoft },
  noticeTitle: { color: gymColors.green, fontSize: 13, fontWeight: '800' },
  noticeText: { color: gymColors.ink, fontSize: 12, lineHeight: 18, marginTop: 5 },
});
