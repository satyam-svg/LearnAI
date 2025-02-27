import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: 'white' },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 16 *  2, // Line height ko font size se match karo
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    lineHeight: 32 * 1.2,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 20 * 1.2,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: '#0a7ea4',
  },
});
