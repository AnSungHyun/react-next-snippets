
'use client';

import React, { useState, useRef } from 'react';
import { Button, Box, CircularProgress, Typography, IconButton, Tabs, Tab } from '@mui/material';
import {
  FileUploadRequest,
  FileUploadResponse,
  MultiFileUploadRequest,
  postFileUpload, postFileUploadFormData,
  postMultiFileUpload,
} from '@/app/_api/file';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileWithPreview {
  file: File;
  previewUrl: string;
  uploadResponse?: FileUploadResponse;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function MultipleFileUploadPage() {
  const [tabValue, setTabValue] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const singleFileInputRef = useRef<HTMLInputElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // 탭 전환시 선택된 파일들 초기화
    setSelectedFiles([]);
    setUploadProgress({});
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxFiles = tabValue === 0 ? 1 : 5;
    console.log(files.length);
    console.log(selectedFiles.length);

    if (selectedFiles.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiles(prev => [...prev, {
          file,
          previewUrl: reader.result as string
        }]);
      };
      reader.readAsDataURL(file);
    });

    // 파일 선택 초기화
    event.target.value = '';
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = selectedFiles.map(async (fileData, index) => {
        let formData: FormData = new FormData();
        formData.append('file', fileData.file);

        // const req: FileUploadRequest = {
        //   file: formData,
        //   filename: `file-${index + 1}-${fileData.file.name}`,
        // };

        // const response = await postFileUpload(req);
        const response = await postFileUploadFormData(formData);

        setSelectedFiles(prev => prev.map((item, i) =>
          i === index ? { ...item, uploadResponse: response } : item
        ));

        setUploadProgress(prev => ({
          ...prev,
          [fileData.file.name]: 100
        }));

        return response;
      });

      await Promise.all(uploadPromises);

      /**
       * files 배열을 생성하여 다중 파일 업로드 요청을 처리합니다.
       * fake api 에는 다중 파일 업로드 기능이 없으므로 주석 처리합니다.
       */

      /*const files: File[] = selectedFiles.map(fileData => fileData.file);
      const req: MultiFileUploadRequest = {
        files: files,
      };

      const response = await postMultiFileUpload(req);

      setSelectedFiles(prev => prev.map((item, i) => {
        return {
          ...item,
          uploadResponse: response
        }
      }));

      const newProgress = selectedFiles.reduce((acc, item) => ({
        ...acc,
        [item.file.name]: 100
      }), {});

      setUploadProgress(prev => ({
        ...prev,
        ...newProgress
      }));*/




      alert('파일 업로드가 완료되었습니다!');
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="단일 파일 업로드" />
          <Tab label="다중 파일 업로드" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" gutterBottom>
          단일 파일 업로드
        </Typography>
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            ref={singleFileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            onClick={() => singleFileInputRef.current?.click()}
            disabled={uploading || selectedFiles.length >= 1}
          >
            파일 선택
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" gutterBottom>
          다중 파일 업로드 (최대 5개)
        </Typography>
        <Box sx={{ my: 2 }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            multiple
            style={{ display: 'none' }}
          />
          <Button
            variant="contained"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || selectedFiles.length >= 5}
          >
            파일 선택 ({selectedFiles.length}/5)
          </Button>
        </Box>
      </TabPanel>

      {/* 공통 파일 미리보기 및 업로드 영역 */}
      <Box sx={{ px: 3 }}>
        <Box sx={{ my: 2, display: 'grid', gap: 2 }}>
          {selectedFiles.map((fileData, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: 1
              }}
            >
              <img
                src={fileData.previewUrl}
                alt={`미리보기 ${index + 1}`}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" noWrap>
                  {fileData.file.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                {uploading && (
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress[fileData.file.name] || 0}
                      size={20}
                    />
                  </Box>
                )}
                {fileData.uploadResponse && (
                  <Typography variant="caption" color="success.main" display="block">
                    업로드 완료
                  </Typography>
                )}
              </Box>
              <IconButton
                onClick={() => handleRemoveFile(index)}
                disabled={uploading}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        {selectedFiles.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
            >
              {uploading ? '업로드 중...' : '업로드'}
            </Button>
          </Box>
        )}

        {uploading && (
          <Box sx={{ my: 2 }}>
            <Typography>파일 업로드 중...</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}