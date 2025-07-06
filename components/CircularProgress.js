import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import Theme from './Theme';

export default function CircularProgress({
  size = 100,
  strokeWidth = 10,
  percentage = 70,
  color = Theme.colors.primary,
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  textColor = Theme.colors.surface,
  label = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            stroke={backgroundColor}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            stroke={color}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </G>
        <SvgText
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="8"
          fontSize={Theme.typography.h3.fontSize}
          fontWeight="bold"
          fill={textColor}
        >
          {`${percentage}%`}
        </SvgText>
      </Svg>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: Theme.spacing.sm,
    ...Theme.typography.caption,
    fontWeight: '600',
  },
}); 