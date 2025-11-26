import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Dropdown, DropdownOption } from '../../components/ui';
import styles from '../../styles/analytics';
import { BarChart } from 'react-native-gifted-charts';

// Dropdown options
const PRODUCT_OPTIONS: DropdownOption[] = [
  { label: 'Product 1', value: 'product1' },
  { label: 'Product 2', value: 'product2' },
  { label: 'Product 3', value: 'product3' },
  { label: 'Product 4', value: 'product4' },
  { label: 'Product 5', value: 'product5' },
];

const GRAPH_TYPE_OPTIONS: DropdownOption[] = [
  { label: 'Bar chart', value: 'bar' },
  { label: 'Line chart', value: 'line' },
];

const DURATION_OPTIONS: DropdownOption[] = [
  { label: '1 day', value: '1day' },
  { label: '1 week', value: '1week' },
  { label: '1 year', value: '1year' },
];

const TIME_PERIOD_OPTIONS: DropdownOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'This week', value: 'thisweek' },
  { label: 'This month', value: 'thismonth' },
  { label: 'This year', value: 'thisyear' },
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'Last 90 days', value: 'last90days' },
];

const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }]

export function Analytics() {
  const [selectedProduct, setSelectedProduct] = useState('product1');
  const [selectedGraphType, setSelectedGraphType] = useState('bar');
  const [selectedDuration, setSelectedDuration] = useState('1week');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('thisweek');

  return (
    <View style={styles.container}>
      {/* Left column - Controls */}
      <View style={styles.controlsSection}>
        <Dropdown
          label="Product"
          value={selectedProduct}
          options={PRODUCT_OPTIONS}
          onValueChange={setSelectedProduct}
        />

        <Dropdown
          label="Graph Type"
          value={selectedGraphType}
          options={GRAPH_TYPE_OPTIONS}
          onValueChange={setSelectedGraphType}
        />

        <Dropdown
          label="Duration"
          value={selectedDuration}
          options={DURATION_OPTIONS}
          onValueChange={setSelectedDuration}
        />

        <Dropdown
          label="Time Period"
          value={selectedTimePeriod}
          options={TIME_PERIOD_OPTIONS}
          onValueChange={setSelectedTimePeriod}
        />
      </View>

      {/* Right column - Chart */}
      <View style={styles.chartSection}>
        <View style={styles.chartPlaceholder}>
          <BarChart data={data} width={700} height={500} />
        </View>
      </View>
    </View>
  );
}