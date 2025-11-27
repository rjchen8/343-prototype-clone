import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Modal, Image } from 'react-native';
import { Text, Dropdown, DropdownOption } from '../../components/ui';
import DateTimePicker from '@react-native-community/datetimepicker';
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

// Mock data for 1 day (24 hours) - labels every 3 hours
const oneDayData = [
  { value: 0, label: '12a' },
  { value: 0, label: '' },
  { value: 0, label: '' },
  { value: 0, label: '3a' },
  { value: 0, label: '' },
  { value: 0, label: '' },
  { value: 0, label: '6a' },
  { value: 0, label: '' },
  { value: 0, label: '' },
  { value: 10, label: '9a' },
  { value: 17, label: '' },
  { value: 25, label: '' },
  { value: 70, label: '12p' },
  { value: 89, label: '' },
  { value: 80, label: '' },
  { value: 50, label: '3p' },
  { value: 43, label: '' },
  { value: 27, label: '' },
  { value: 0, label: '6p' },
  { value: 0, label: '' },
  { value: 0, label: '' },
  { value: 0, label: '9p' },
  { value: 0, label: '' },
  { value: 0, label: '' },
];

// Mock data for 1 week (7 days)
const oneWeekData = [
  { value: 41, label: 'Mon' },
  { value: 30, label: 'Tue' },
  { value: 25, label: 'Wed' },
  { value: 40, label: 'Thu' },
  { value: 50, label: 'Fri' },
  { value: 85, label: 'Sat' },
  { value: 77, label: 'Sun' },
];

// Mock data for 1 year (12 months)
const oneYearData = [
  { value: 21, label: 'Jan' },
  { value: 32, label: 'Feb' },
  { value: 12, label: 'Mar' },
  { value: 40, label: 'Apr' },
  { value: 32, label: 'May' },
  { value: 65, label: 'Jun' },
  { value: 78, label: 'Jul' },
  { value: 80, label: 'Aug' },
  { value: 100, label: 'Sep' },
  { value: 97, label: 'Oct' },
  { value: 67, label: 'Nov' },
  { value: 47, label: 'Dec' },
];

export function Analytics() {
  const [selectedProduct, setSelectedProduct] = useState('product1');
  const [selectedGraphType, setSelectedGraphType] = useState('bar');
  const [selectedDuration, setSelectedDuration] = useState('1week');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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

    const formatDate = (date: Date): string => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    let dateLabel = '';
    if (selectedDuration === '1day') {
      dateLabel = formatDate(selectedDate);
    } else if (selectedDuration === '1week') {
      const endDate = new Date(selectedDate);
      endDate.setDate(endDate.getDate() + 6);
      dateLabel = `${formatDate(selectedDate)} - ${formatDate(endDate)}`;
    } else if (selectedDuration === '1year') {
      dateLabel = `${selectedDate.getFullYear()}`;
    }

    return `${productLabel} - Sales from ${dateLabel}`;
  };

  const formatDisplayDate = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
    }
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

        <View style={styles.datePickerContainer}>
          <Text style={styles.datePickerLabel}>
            {selectedDuration === '1day' ? 'Date' : 'Start Date'}
          </Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {formatDisplayDate(selectedDate)}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export to CSV</Text>
          <Image
            source={require('../../assets/icons8-export-24.png')}
            style={styles.exportIcon}
          />
        </TouchableOpacity>
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

      {/* Date Picker Modal - centered on screen */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Text variant="h3" style={styles.modalTitle}>
              {selectedDuration === '1day' ? 'Select Date' : 'Select Start Date'}
            </Text>

            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              textColor={theme.colors.text.primary}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setShowDatePicker(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}