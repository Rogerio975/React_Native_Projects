import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Panel, PrimaryButton, Screen, SectionTitle } from '@/components/gym-ui';
import { gymColors, membershipPlans } from '@/constants/gym-data';

export default function PlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState('trimestral');

  return (
    <Screen title="Planos para cada objetivo" subtitle="Escolha a opção que combina com a sua jornada.">
      <View>
        <SectionTitle title="Planos disponíveis" />
        <View style={styles.planList}>
          {membershipPlans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <Panel key={plan.id} style={[styles.planCard, isSelected && styles.planSelected]}>
                <View style={styles.planHeader}>
                  <View><Text style={styles.planName}>{plan.name}</Text><Text style={styles.planDescription}>{plan.detail}</Text></View>
                  {isSelected ? <Badge label="SEU PLANO" /> : plan.accent ? <Badge label="MAIS ESCOLHIDO" tone="orange" /> : null}
                </View>
                <View style={styles.priceRow}><Text style={styles.price}>{plan.price}</Text><Text style={styles.period}>{plan.period}</Text></View>
                <View style={styles.divider} />
                <Text style={styles.benefit}>✓  Acesso à musculação</Text>
                <Text style={styles.benefit}>✓  Avaliação física inclusa</Text>
                <Text style={styles.benefit}>{plan.id === 'anual' ? '✓  Acompanhamento personalizado' : plan.id === 'trimestral' ? '✓  Aulas coletivas incluídas' : '✓  Cancele quando quiser'}</Text>
                <PrimaryButton label={isSelected ? 'Plano selecionado' : 'Escolher este plano'} onPress={() => setSelectedPlan(plan.id)} outlined={isSelected} />
              </Panel>
            );
          })}
        </View>
      </View>
      <Panel style={styles.help}>
        <Text style={styles.helpTitle}>Precisa de ajuda?</Text>
        <Text style={styles.helpText}>Nossa equipe pode ajudar você a escolher o melhor plano para os seus objetivos.</Text>
      </Panel>
      <Text style={styles.demoNote}>Valores demonstrativos, sujeitos à confirmação pela academia.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  planList: { gap: 11 },
  planCard: { gap: 12 },
  planSelected: { borderColor: gymColors.green, borderWidth: 2 },
  planHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  planName: { color: gymColors.ink, fontSize: 17, fontWeight: '800' },
  planDescription: { color: gymColors.muted, fontSize: 11, marginTop: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 4 },
  price: { color: gymColors.ink, fontSize: 26, fontWeight: '800' },
  period: { color: gymColors.muted, fontSize: 12, marginLeft: 5 },
  divider: { height: 1, backgroundColor: gymColors.line },
  benefit: { color: gymColors.ink, fontSize: 12 },
  help: { backgroundColor: gymColors.greenSoft, borderColor: gymColors.greenSoft },
  helpTitle: { color: gymColors.green, fontSize: 14, fontWeight: '800' },
  helpText: { color: gymColors.ink, fontSize: 12, lineHeight: 18, marginTop: 5 },
  demoNote: { color: gymColors.muted, fontSize: 11, textAlign: 'center' },
});
