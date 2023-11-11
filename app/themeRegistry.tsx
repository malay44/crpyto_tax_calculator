// app/ThemeRegistry.tsx
'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
    interface Palette {
        blue: Palette['primary'];
        gray: Palette['secondary'];
        green: Palette['success'];
    }

    interface PaletteOptions {
        blue?: PaletteOptions['primary'];
        gray?: PaletteOptions['secondary'];
        green?: PaletteOptions['success'];
    }
}
let theme = createTheme({
    palette: {
        green: {
            main: '#00C853',
            light: '#ebf8f4',
            dark: '#0FBA83',
        },
        blue: {
            main: '#0052FE', // investment type select background
            dark: '#0141CF', // tax payable background and text
        },
        gray: {
            main: '#3E424A', // gray/2
            dark: '#0F1629', // gray/1
            light: '#EFF2F5', // input background
        },
    },
});

theme = responsiveFontSizes(theme);

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: any) {
    const { options, children } = props;

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}
