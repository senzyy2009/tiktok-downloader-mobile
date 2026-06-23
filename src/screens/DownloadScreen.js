import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const DownloadScreen = ({ route }) => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      const docs = FileSystem.documentDirectory;
      const files = await FileSystem.readDirectoryAsync(docs);
      const videoFiles = files.filter(f => f.endsWith('.mp4') || f.endsWith('.mp3'));
      
      const downloads = await Promise.all(
        videoFiles.map(async (file) => {
          const info = await FileSystem.getInfoAsync(docs + file);
          return {
            id: file,
            name: file,
            size: (info.size / (1024 * 1024)).toFixed(2),
            path: docs + file,
            type: file.endsWith('.mp3') ? 'Audio' : 'Video',
          };
        })
      );
      setDownloads(downloads);
    } catch (error) {
      console.log('Error loading downloads:', error);
    }
  };

  const downloadVideo = async (videoData) => {
    setLoading(true);
    try {
      const filename = `TikTok_${Date.now()}.mp4`;
      const downloadPath = FileSystem.documentDirectory + filename;

      const response = await FileSystem.downloadAsync(
        videoData.downloadUrl,
        downloadPath
      );

      if (response.status === 200) {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(downloadPath);
          Alert.alert('Sukses', 'Video berhasil diunduh dan tersimpan di galeri');
          loadDownloads();
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal mengunduh video');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderDownloadItem = ({ item }) => (
    <View style={styles.downloadItem}>
      <View style={styles.itemInfo}>
        <View style={styles.typeIcon}>
          <Text style={styles.typeText}>{item.type === 'Audio' ? '🎵' : '🎬'}</Text>
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemSize}>{item.size} MB</Text>
        </View>
      </View>
      <View style={styles.itemActions}>
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.actionIcon}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>Downloads</Text>
        <Text style={styles.headerSubtitle}>{downloads.length} file tersimpan</Text>
      </LinearGradient>

      {downloads.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>Belum ada download</Text>
          <Text style={styles.emptySubtext}>Video yang diunduh akan muncul di sini</Text>
        </View>
      ) : (
        <FlatList
          data={downloads}
          renderItem={renderDownloadItem}
          keyExtractor={item => item.id}
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
  downloadItem: {
    flexDirection: 'row',
    backgroundColor: '#0f1a33',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1a4f5f',
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: '#1a2f4f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  typeText: {
    fontSize: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 3,
  },
  itemSize: {
    fontSize: 11,
    color: '#7a8ba8',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  shareButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#1a4f5f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#4f1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 16,
  },
});

export default DownloadScreen;
