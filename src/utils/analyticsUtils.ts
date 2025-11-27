/**
 * Calculate appropriate bar width based on duration
 * Chart width is 575px, accounting for spacing between bars
 */
export const getBarWidth = (duration: string): number => {
    switch (duration) {
        case '1day':
            return 12; // 24 bars: ~15px each with spacing
        case '1week':
            return 50; // 7 bars: ~60px each with spacing
        case '1year':
            return 25; // 12 bars: ~35px each with spacing
        default:
            return 50;
    }
};

/**
 * Calculate spacing between bars based on duration
 */
export const getBarSpacing = (duration: string): number => {
    switch (duration) {
        case '1day':
            return 12; // Smaller spacing for 24 bars
        case '1week':
            return 25; // Default spacing for 7 bars
        case '1year':
            return 20; // Medium spacing for 12 bars
        default:
            return 20;
    }
};

/**
 * Calculate spacing between line chart points based on duration
 */
export const getLineSpacing = (duration: string): number => {
    switch (duration) {
        case '1day':
            return 23; // More spacing for 24 points
        case '1week':
            return 80; // More spacing for 7 points
        case '1year':
            return 48; // More spacing for 12 points
        default:
            return 40;
    }
};
