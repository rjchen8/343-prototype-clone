import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Dropdown, DropdownOption } from '../../components/ui';
import styles from '../../styles/analytics';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { theme } from '../../theme';
import { getBarWidth, getBarSpacing, getLineSpacing } from '../../utils/analyticsUtils';

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

// Mock data for 1 day (24 hours) - labels every 3 hours
const oneDayData = [
  { value: 45, label: '12a' },
  { value: 32, label: '' },
  { value: 28, label: '' },
  { value: 25, label: '3a' },
  { value: 30, label: '' },
  { value: 38, label: '' },
  { value: 52, label: '6a' },
  { value: 68, label: '' },
  { value: 85, label: '' },
  { value: 92, label: '9a' },
  { value: 88, label: '' },
  { value: 95, label: '' },
  { value: 100, label: '12p' },
  { value: 98, label: '' },
  { value: 90, label: '' },
  { value: 85, label: '3p' },
  { value: 82, label: '' },
  { value: 88, label: '' },
  { value: 95, label: '6p' },
  { value: 92, label: '' },
  { value: 85, label: '' },
  { value: 75, label: '9p' },
  { value: 65, label: '' },
  { value: 55, label: '' },
];

// Mock data for 1 week (7 days)
const oneWeekData = [
  { value: 65, label: 'Mon' },
  { value: 78, label: 'Tue' },
  { value: 92, label: 'Wed' },
  { value: 85, label: 'Thu' },
  { value: 95, label: 'Fri' },
  { value: 88, label: 'Sat' },
  { value: 72, label: 'Sun' },
];

// Mock data for 1 year (12 months)
const oneYearData = [
  { value: 65, label: 'Jan' },
  { value: 70, label: 'Feb' },
  { value: 78, label: 'Mar' },
  { value: 85, label: 'Apr' },
  { value: 92, label: 'May' },
  { value: 95, label: 'Jun' },
  { value: 88, label: 'Jul' },
  { value: 82, label: 'Aug' },
  { value: 90, label: 'Sep' },
  { value: 85, label: 'Oct' },
  { value: 75, label: 'Nov' },
  { value: 80, label: 'Dec' },
];

export function Analytics() {
  const [selectedProduct, setSelectedProduct] = useState('product1');
  const [selectedGraphType, setSelectedGraphType] = useState('bar');
  const [selectedDuration, setSelectedDuration] = useState('1week');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('thisweek');

  // Select the appropriate data based on duration
  const getChartData = () => {
    switch (selectedDuration) {
      case '1day':
        return oneDayData;
      case '1week':
        return oneWeekData;
      case '1year':
        return oneYearData;
      default:
        return oneWeekData;
    }
  };

  // Get chart title based on selected options
  const getChartTitle = () => {
    const productLabel = PRODUCT_OPTIONS.find(p => p.value === selectedProduct)?.label || 'Product';
    const timePeriodLabel = TIME_PERIOD_OPTIONS.find(t => t.value === selectedTimePeriod)?.label || 'Time Period';
    return `${productLabel} - Sales from ${timePeriodLabel.toLowerCase()}`;
  };

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
          <Text variant="h2" style={styles.title}>
            {getChartTitle()}
          </Text>
          {selectedGraphType === 'bar' ? (
            <BarChart
              data={getChartData()}
              width={575}
              height={500}
              barWidth={getBarWidth(selectedDuration)}
              spacing={getBarSpacing(selectedDuration)}
              frontColor={theme.colors.primary}
            />
          ) : (
            <LineChart
              data={getChartData()}
              width={575}
              height={500}
              spacing={getLineSpacing(selectedDuration)}
              color={theme.colors.primary}
              thickness={3}
              dataPointsColor={theme.colors.primary}
              dataPointsRadius={4}
              curved
            />
          )}
        </View>
      </View>
    </View>
  );
}