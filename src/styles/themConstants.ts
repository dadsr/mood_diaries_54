export const COLORS = {
    primary: '#98A1BC',
    secondary: '#555879',
    accent: '#DED3C4',
    background: '#FDF5AA',
    text: '#1B3C53',
    textLight: '#456882',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#4CD964',
};



export const THEME_CONSTANTS = {
    SPACING: {
        XS: 4,
        SM: 8,
        MD: 10,
        LG: 12,
        XL: 14,
    },
    BORDER_RADIUS: {
        SM: 4,
        MD: 8,
        LG: 12,
        XL: 16,
    },
    ELEVATION: {
        NONE: 0,
        LOW: 2,
        MEDIUM: 4,
        HIGH: 8,
    },
    TYPOGRAPHY: {
        SIZES: {
            XS: 12,
            SM: 14,
            MD: 16,
            LG: 18,
            XL: 20,
            XXL: 24,
            XXXL: 40,
            XXXXL: 100,


        },
        WEIGHTS: {
            LIGHT: '300' as const,
            REGULAR: '400' as const,
            MEDIUM: '500' as const,
            BOLD: '700' as const,
        },
        FAMILIES: {
            REGULAR: 'System',
            BOLD: 'Roboto-Bold',
            MONO: 'Courier New',
        },
    },
} as const;

export const { TYPOGRAPHY, SPACING, BORDER_RADIUS, ELEVATION } = THEME_CONSTANTS;
