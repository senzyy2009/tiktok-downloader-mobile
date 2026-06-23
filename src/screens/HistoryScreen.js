import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('downloadHistory');
      if (data) {
        setHistory(JSON.parse(data));
      }
    } catch (error) {
      console.log('Error loading history:', error);
    }
  };

  const clearHistory = async () => {
    Alert.alert('Konfirmasi', 'Hapus semua riwayat?', [
      { text: 'Batal', onPress: () => {} },
      {
        text: 'Hapus',
        onPress: async () => {
          await AsyncStorage.removeItem('downloadHistory');
          setHistory([]);
          Alert.alert('Sukses', 'Riwayat telah dihapus');
        },
      },
    ]);
  };

  const renderHistoryItem = ({ item, index }) => (
    <View style={styles.historyItem}>
      <View style={styles.itemNumber}>
        <Text style={styles.numberText}>{history.length - index}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.itemDate}>{new Date(item.timestamp).toLocaleString('id-ID')}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>✅ Berhasil</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.itemMore}>
        <Text style={styles.moreIcon}>⋮</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#00d4ff', '#0099cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>History</Text>
            <Text style={styles.headerSubtitle}>{history.length} download tercatat</Text>
          </View>
          {history.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearHistory}
            >
              <Text style={styles.clearIcon}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>Belum ada riwayat</Text>
          <Text style={styles.emptySubtext}>Download video untuk melihat riwayat di sini</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  clearButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearIcon: {
    fontSize: 22,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#7a8ba8',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#0f1a33',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1a4f5f',
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemNumber: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1a4f5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00d4ff',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 11,
    color: '#7a8ba8',
    marginBottom: 6,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#1a4f2f',
  },
  statusText: {
    fontSize: 10,
    color: '#4ade80',
    fontWeight: '600',
  },
  itemMore: {
    padding: 8,
  },
  moreIcon: {
    fontSize: 20,
    color: '#7a8ba8',
  },
});

export default HistoryScreen;
