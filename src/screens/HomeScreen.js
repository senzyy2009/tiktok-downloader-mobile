import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const animScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const downloadVideo = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Masukkan URL TikTok terlebih dahulu');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/download', {
        url: url,
      });

      if (response.data.success) {
        setVideoData(response.data.data);
        navigation.navigate('Download', { videoData: response.data.data });
      } else {
        Alert.alert('Error', response.data.message || 'Gagal mengunduh video');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal terhubung ke server. Pastikan backend berjalan.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#00d4ff', '#0099cc']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>TikDown</Text>
          <Text style={styles.headerSubtitle}>Download Video TikTok dengan Mudah</Text>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>Paste Link TikTok</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="https://www.tiktok.com/@user/video/..."
              placeholderTextColor="#7a8ba8"
              value={url}
              onChangeText={setUrl}
              editable={!loading}
            />
          </View>
        </View>

        {/* Download Button */}
        <Animated.View style={{ transform: [{ scale: animScale }] }}>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={downloadVideo}
            disabled={loading}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#00d4ff', '#0099cc']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.downloadButton}
            >
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonIcon}>📥</Text>
                  <Text style={styles.buttonText}>Download Video</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>✨ Fitur Unggulan</Text>
          <View style={styles.featureGrid}>
            <FeatureCard icon="⚡" title="Super Cepat" description="Download video dalam hitungan detik" />
            <FeatureCard icon="🎬" title="Berbagai Kualitas" description="Pilih resolusi sesuai kebutuhan" />
            <FeatureCard icon="🎵" title="Ekstrak MP3" description="Konversi video ke audio" />
            <FeatureCard icon="💾" title="Auto Simpan" description="Tersimpan otomatis di galeri" />
          </View>
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips Penggunaan</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>1</Text>
            <Text style={styles.tipText}>Copy link video TikTok dari aplikasi resmi</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>2</Text>
            <Text style={styles.tipText}>Paste link di atas dan tekan tombol Download</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>3</Text>
            <Text style={styles.tipText}>Pilih kualitas dan format yang diinginkan</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipNumber}>4</Text>
            <Text style={styles.tipText}>Tunggu proses selesai, video tersimpan otomatis</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <View style={styles.featureCard}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureTitle}>{title}</Text>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  inputSection: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00d4ff',
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1a4f5f',
  },
  input: {
    backgroundColor: '#0f1a33',
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 13,
    color: '#fff',
  },
  downloadButton: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  featuresSection: {
    marginBottom: 35,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#0f1a33',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1a4f5f',
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00d4ff',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 11,
    color: '#7a8ba8',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#0f1a33',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1a4f5f',
    padding: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00d4ff',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00d4ff',
    color: '#0a0e27',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 28,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    color: '#ccc',
    lineHeight: 18,
  },
});

export default HomeScreen;
