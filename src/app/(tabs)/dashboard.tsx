import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppColors } from "../../hooks/use-app-colors"; // DARK MODE

export default function Dashboard() {
  // State demo: values that change live on the dashboard
  const [balance, setBalance] = useState(1500);
  const [hidden, setHidden] = useState(false);
  const [now, setNow] = useState(new Date());
  const colors = useAppColors(); // DARK MODE

  // Live clock updates every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView
      style={{ backgroundColor: colors.screen }} // DARK MODE
      contentContainerStyle={[styles.container, { backgroundColor: colors.screen }]} // DARK MODE
    >
      <Text style={[styles.greeting, { color: colors.text }]}>Welcome back 👋</Text>{/* DARK MODE */}
      <Text style={[styles.clock, { color: colors.muted }]}>{now.toLocaleTimeString()}</Text>{/* DARK MODE */}

      {/* Balance widget */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>{/* DARK MODE */}
        <Text style={[styles.cardLabel, { color: colors.muted }]}>Wallet Balance</Text>{/* DARK MODE */}
        <Text style={[styles.balance, { color: colors.text }]}>{/* DARK MODE */}
          {hidden ? "₱ ••••••" : `₱ ${balance.toFixed(2)}`}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.btn} onPress={() => setBalance(balance + 100)}>
            <Text style={styles.btnText}>+ ₱100</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setBalance(Math.max(0, balance - 100))}
          >
            <Text style={styles.btnText}>- ₱100</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnAlt} onPress={() => setHidden(!hidden)}>
            <Text style={styles.btnText}>{hidden ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Summary widgets */}
      <View style={styles.row}>
        <View style={[styles.smallCard, { backgroundColor: colors.card }]}>{/* DARK MODE */}
          <Text style={[styles.cardLabel, { color: colors.muted }]}>Spent Today</Text>{/* DARK MODE */}
          <Text style={[styles.value, { color: colors.text }]}>₱ 250</Text>{/* DARK MODE */}
        </View>
        <View style={[styles.smallCard, { backgroundColor: colors.card }]}>{/* DARK MODE */}
          <Text style={[styles.cardLabel, { color: colors.muted }]}>Savings</Text>{/* DARK MODE */}
          <Text style={[styles.value, { color: colors.text }]}>₱ 600</Text>{/* DARK MODE */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16, backgroundColor: "#ffffff", flexGrow: 1 },
  greeting: { fontSize: 24, fontWeight: "700", color: "#0f172a" },
  clock: { color: "#64748b", fontSize: 14 },
  card: { backgroundColor: "#f1f5f9", borderRadius: 16, padding: 20, gap: 10 },
  smallCard: { flex: 1, backgroundColor: "#f1f5f9", borderRadius: 16, padding: 16, gap: 6 },
  cardLabel: { color: "#64748b", fontSize: 13 },
  balance: { color: "#0f172a", fontSize: 32, fontWeight: "800" },
  value: { color: "#0f172a", fontSize: 20, fontWeight: "700" },
  row: { flexDirection: "row", gap: 10 },
  btn: { backgroundColor: "#22c55e", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnAlt: { backgroundColor: "#3b82f6", paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10 },
  btnText: { color: "#fff", fontWeight: "600" },
});