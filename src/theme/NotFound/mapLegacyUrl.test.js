import { mapLegacyUrl as mapLegacyUrl } from "./mapLegacyUrl";

// prettier-ignore
describe('mapLegacyUrl()', () => {
  it('should resolve legacy versions to their appropriate version', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.3.x/api/animations/cancelAnimation')).toBe('/react-native-reanimated/docs/2.x/api/animations/cancelAnimation');
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.0.x/events')).toBe('/react-native-reanimated/docs/2.x/fundamentals/events');
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.1.x/api/useAnimatedRef')).toBe('/react-native-reanimated/docs/2.x/api/hooks/useAnimatedRef');
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x.x/getting_started')).toBe('/react-native-reanimated/docs/1.x/getting_started');
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x.x/animations/timing')).toBe('/react-native-reanimated/docs/1.x/animations/timing');
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x.x/nodes/startClock')).toBe('/react-native-reanimated/docs/1.x/nodes/startClock');
  });

  it('should correctly resolve legacy fundamentals url', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.1.x/installation')).toBe('/react-native-reanimated/docs/2.x/fundamentals/installation');
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.1.x/troubleshooting')).toBe('/react-native-reanimated/docs/2.x/fundamentals/troubleshooting');
  });

  it('should correctly resolve animations url', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.0.x/api/withTiming')).toBe('/react-native-reanimated/docs/2.x/api/animations/withTiming');
  });

  it('should not have an effect on 1.x docs', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x/getting_started')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x/animations/timing')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/1.x/nodes/startClock')).toBe(null);
  });

  it('should not have an effect on 2.x docs', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.x/fundamentals/architecture')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.x/fundamentals/animations')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.x/api/LayoutAnimations/customAnimations')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.x/api/nativeMethods/measure')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.x/api/hooks/useAnimatedGestureHandler')).toBe(null);
  });

  it('should not have an effect on default docs', () => {
    expect(mapLegacyUrl('/react-native-reanimated/docs/fundamentals/architecture')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/fundamentals/animations')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/api/LayoutAnimations/customAnimations')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/api/nativeMethods/measure')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/api/hooks/useAnimatedGestureHandler')).toBe(null);
  });

  it('should handle anchors to headers', () => {
    expect(mapLegacyUrl('react-native-reanimated/docs/api/useAnimatedProps#example')).toBe(null);
    expect(mapLegacyUrl('/react-native-reanimated/docs/2.0.x/api/useAnimatedReaction#arguments')).toBe('/react-native-reanimated/docs/2.x/api/hooks/useAnimatedReaction#arguments');
  });
});
