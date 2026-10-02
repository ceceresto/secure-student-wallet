import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Dashboard() {
  // State demo: values that change live on the dashboard
  const [balance, setBalance] = useState(1500);
  const [hidden, setHidden] = useState(false);
  const [now, setNow] = useState(new Date());

  // Live clock updates every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Welcome back 👋</Text>
      <Text style={styles.clock}>{now.toLocaleTimeString()}</Text>

      {/* Balance widget */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Wallet Balance</Text>
        <Text style={styles.balance}>{hidden ? "₱ ••••••" : `₱ ${balance.toFixed(2)}`}</Text>
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
        <View style={styles.smallCard}>
          <Text style={styles.cardLabel}>Spent Today</Text>
          <Text style={styles.value}>₱ 250</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.cardLabel}>Savings</Text>
          <Text style={styles.value}>₱ 600</Text>
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