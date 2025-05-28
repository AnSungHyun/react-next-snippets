// app/_component/CommonDialog.tsx
'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const CommonDialog: React.FC<CommonDialogProps> = ({
                                                     open,
                                                     onClose,
                                                     title,
                                                     children,
                                                     maxWidth = 'md'
                                                   }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: { borderRadius: '12px' }
      }}
    >
      {open && (
        <>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
              <IconButton
                edge="end"
                onClick={onClose}
                aria-label="close"
                sx={{
                  color: 'grey.500',
                  '&:hover': { color: 'grey.700' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            {children}
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default CommonDialog;