import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TextWidget({ data }) {
  const widgetStyles = data.styles ?? {};

  return <View>{data ? <Text style={[widgetStyles]}>{data.text}</Text> : null}</View>;
}