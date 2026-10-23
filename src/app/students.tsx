import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Badge, Panel, PrimaryButton, Screen, SectionTitle } from '@/components/gym-ui';
import { gymColors, students as initialStudents } from '@/constants/gym-data';
import type { Student } from '@/constants/gym-data';

export default function StudentsScreen() {
  const [studentList, setStudentList] = useState(initialStudents);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'Todos' | 'Ativos' | 'Pendentes'>('Todos');
  const [newStudentName, setNewStudentName] = useState('');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const filteredStudents = useMemo(() => studentList.filter((student) => {
    const matchesName = student.name.toLocaleLowerCase('pt-BR').includes(query.toLocaleLowerCase('pt-BR'));
    const matchesStatus = filter === 'Todos' || (filter === 'Ativos' ? student.status === 'Ativo' : student.status === 'Pendente');
    return matchesName && matchesStatus;
  }), [filter, query, studentList]);

  const addStudent = () => {
    const name = newStudentName.trim();
    if (!name) return;
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase('pt-BR');
    const newStudent: Student = { id: String(Date.now()), name, membership: 'Plano a definir', status: 'Ativo', initials };
    setStudentList((current) => [newStudent, ...current]);
    setNewStudentName('');
    setQuery('');
    setFilter('Todos');
    setIsAddingStudent(false);
  };

  return (
    <Screen title="Alunos" subtitle="Acompanhe sua comunidade e mantenha tudo em dia.">
      <View style={styles.statsRow}>
        <Panel style={styles.stat}><Text style={styles.statValue}>248</Text><Text style={styles.statLabel}>alunos ativos</Text></Panel>
        <Panel style={styles.stat}><Text style={styles.statValue}>18</Text><Text style={styles.statLabel}>novos este mês</Text></Panel>
        <Panel style={styles.stat}><Text style={[styles.statValue, { color: '#A45A1F' }]}>7</Text><Text style={styles.statLabel}>pendências</Text></Panel>
      </View>

      <TextInput
        accessibilityLabel="Buscar aluno"
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar aluno pelo nome"
        placeholderTextColor={gymColors.muted}
        style={styles.search}
      />

      <View style={styles.filters}>
        {(['Todos', 'Ativos', 'Pendentes'] as const).map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} accessibilityRole="button" accessibilityState={{ selected: filter === item }} style={[styles.filter, filter === item && styles.filterActive]}>
            <Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View>
        <View style={styles.listHeading}>
          <SectionTitle title={`${filteredStudents.length} alunos`} />
          <Pressable onPress={() => setIsAddingStudent((current) => !current)} accessibilityRole="button">
            <Text style={styles.addStudentText}>{isAddingStudent ? 'Cancelar' : '+ Novo aluno'}</Text>
          </Pressable>
        </View>
        {isAddingStudent && (
          <Panel style={styles.addStudentForm}>
            <TextInput
              accessibilityLabel="Nome do novo aluno"
              value={newStudentName}
              onChangeText={setNewStudentName}
              placeholder="Nome completo"
              placeholderTextColor={gymColors.muted}
              style={styles.search}
              returnKeyType="done"
              onSubmitEditing={addStudent}
            />
            <PrimaryButton label="Adicionar aluno" onPress={addStudent} />
          </Panel>
        )}
        <View style={styles.studentList}>
          {filteredStudents.map((student) => (
            <Panel key={student.id} style={styles.studentCard}>
              <View style={styles.initials}><Text style={styles.initialsText}>{student.initials}</Text></View>
              <View style={styles.studentDetails}><Text style={styles.studentName}>{student.name}</Text><Text style={styles.membership}>{student.membership}</Text></View>
              <Badge label={student.status} tone={student.status === 'Ativo' ? 'green' : 'orange'} />
            </Panel>
          ))}
          {filteredStudents.length === 0 && <Panel><Text style={styles.empty}>Nenhum aluno encontrado. Tente outro nome ou filtro.</Text></Panel>}
        </View>
      </View>
      <Text style={styles.demoNote}>Lista demonstrativa · Os dados serão sincronizados quando um backend for conectado.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: 'row', gap: 8 },
  stat: { flex: 1, padding: 13 },
  statValue: { color: gymColors.ink, fontSize: 21, fontWeight: '800' },
  statLabel: { color: gymColors.muted, fontSize: 10, marginTop: 4 },
  search: { minHeight: 48, borderRadius: 14, paddingHorizontal: 15, backgroundColor: '#FFFFFF', borderColor: gymColors.line, borderWidth: 1, color: gymColors.ink, fontSize: 13 },
  filters: { flexDirection: 'row', gap: 8 },
  filter: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 30, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: gymColors.line },
  filterActive: { backgroundColor: gymColors.green, borderColor: gymColors.green },
  filterText: { color: gymColors.muted, fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: '#FFFFFF' },
  listHeading: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  addStudentText: { color: gymColors.green, fontSize: 13, fontWeight: '800' },
  addStudentForm: { gap: 10, marginBottom: 10 },
  studentList: { gap: 9 },
  studentCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 },
  initials: { width: 40, height: 40, borderRadius: 15, backgroundColor: gymColors.greenSoft, alignItems: 'center', justifyContent: 'center' },
  initialsText: { color: gymColors.green, fontSize: 12, fontWeight: '800' },
  studentDetails: { flex: 1 },
  studentName: { color: gymColors.ink, fontSize: 13, fontWeight: '800' },
  membership: { color: gymColors.muted, fontSize: 11, marginTop: 4 },
  empty: { textAlign: 'center', color: gymColors.muted, fontSize: 13, lineHeight: 19 },
  demoNote: { color: gymColors.muted, fontSize: 11, lineHeight: 16, textAlign: 'center' },
});
