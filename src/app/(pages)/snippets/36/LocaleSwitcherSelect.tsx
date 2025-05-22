'use client';

import { useTransition } from 'react';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/i18n/locale';

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(event: SelectChangeEvent) {
    const locale = event.target.value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <FormControl fullWidth variant="outlined" size="small" disabled={isPending}>
      <InputLabel id="locale-switcher-label">{label}</InputLabel>
      <Select
        labelId="locale-switcher-label"
        value={defaultValue}
        onChange={onChange}
        label={label}
        startAdornment={
          <LanguageIcon sx={{ mr: 1, color: 'text.secondary' }} />
        }
        sx={{
          minWidth: 120,
          backgroundColor: isPending
            ? 'action.disabledBackground'
            : 'background.paper',
        }}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <Box display="flex" alignItems="center">
              {item.value === defaultValue && (
                <CheckIcon
                  fontSize="small"
                  sx={{ mr: 1, color: 'text.secondary' }}
                />
              )}
              <span>{item.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Select>
      {isPending && (
        <Box position="absolute" top={8} right={8}>
          <CircularProgress size={20} />
        </Box>
      )}
    </FormControl>
  );
}
