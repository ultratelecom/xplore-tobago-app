import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { Video, ResizeMode } from 'expo-av';

const phrases = ["Your Paradise", "Your Adventure", "Your Getaway", "Tobago"];

export default function IntroScreen() {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateText = () => {
      // Create smooth Instagram-style animation
      Animated.parallel([
        // Fade out with scale down
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Change text
        setIndex((prev) => (prev + 1) % phrases.length);
        
        // Fade in with scale up and glow
        Animated.parallel([
          Animated.spring(fadeAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ]).start();
      });
    };

    const timer = setInterval(animateText, 1500);
    return () => clearInterval(timer);
  }, [fadeAnim, scaleAnim, glowAnim]);

  const handleExplore = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        style={styles.backgroundVideo}
        source={require('../assets/videos/xplore-trailer-mobile.m4v')}
        shouldPlay={true}
        isLooping={true}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        useNativeControls={false}
        onError={(error) => {
          console.log('Video error:', error);
        }}
        onLoad={(status) => {
          console.log('Video loaded successfully');
        }}
        onLoadStart={() => console.log('Video loading started')}
      />
      
      {/* Remove fallback background so it doesn't cover video */}
      {/* <View style={styles.temporaryBackground} /> */}
      
      {/* Overlay Content */}
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          {/* Tobago Map */}
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Tobago_topographic_map-en.svg/800px-Tobago_topographic_map-en.svg.png' }}
            style={styles.tobagoMap}
            resizeMode="contain"
          />
          
          {/* Animated Headline */}
          <View style={styles.headlineContainer}>
            <Animated.Text 
              style={[
                styles.rotatingText, 
                { 
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                }
              ]}
            >
              {phrases[index]}
            </Animated.Text>
            <Text style={styles.staticText}>In Your Hands</Text>
          </View>
          
          {/* Description Paragraph */}
          <Text style={styles.descriptionText}>
            Discover the hidden treasures of paradise. From secret beaches to authentic local flavors.
          </Text>
        </View>
        
        {/* Explore Button */}
        <TouchableOpacity style={styles.exploreButton} onPress={handleExplore}>
          <Text style={styles.exploreButtonText}>Explore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
    zIndex: 1,
  },
  temporaryBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height,
    backgroundColor: '#1e3c72',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 32,
    zIndex: 2,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  tobagoMap: {
    width: 200,
    height: 100,
    marginBottom: 30,
    opacity: 0.8,
  },
  headlineContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  rotatingText: {
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FF6B35',
    letterSpacing: 1.2,
    textShadowColor: 'rgba(255, 107, 53, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    marginBottom: 12,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  staticText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    maxWidth: 300,
    fontWeight: '300',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  exploreButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 56,
    paddingVertical: 18,
    borderRadius: 35,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 