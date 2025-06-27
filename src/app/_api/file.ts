

// 로그인 요청에 대한 매개변수 타입
import { fakeApi } from '@/app/_config/domainAxios/apiInstances';

export interface FileUploadRequest {
  filename: string;
  file: File;
  onProgress?: (progress: number) => void;
}

export interface FileUploadResponse {
  originalname: boolean;
  filename: string;
  location: string;
}

export interface MultiFileUploadRequest {
  files: File[];
  description?: string;
  category?: string;
}

export const postFileUploadFormData = (
  data: FormData,
): Promise<FileUploadResponse> => {
  return fakeApi.post({
    url: '/api/v1/files/upload',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postFileUpload = (
  data: FileUploadRequest,
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('filename', data.filename);
  formData.append('description', data.filename);

  return fakeApi.post({
    url: '/api/v1/files/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // onUploadProgress: (progressEvent: AxiosProgressEvent) => {
    //   if (data.onProgress) {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / (progressEvent.total || 1)
    //     );
    //     data.onProgress(percentCompleted);
    //   }
    // }
  });
};

export const postMultiFileUpload = (
  data: MultiFileUploadRequest,
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  data.files.forEach((file, index) => {
    formData.append('files', file);
    formData.append('filename', `${index+1} 번째 파일`);
  });

  return fakeApi.post({
    url: '/api/v1/files/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};











// 파일 업로드 응답 인터페이스
// import commonAxios from '@/app/_config/axios/commonAxios';

// export interface FileUploadResponse {
//   success: boolean;
//   url: string;
//   message: string;
//   filename?: string;
//   size?: number;
//   mimetype?: string;
//   uploadedAt?: string;
// }
//
// // 다중 파일 업로드 응답 인터페이스
// export interface MultipleFileUploadResponse {
//   files: FileUploadResponse[];
//   totalUploaded: number;
//   failedUploads: number;
// }
//
// // 파일 업로드 진행률 콜백 타입
// export type ProgressCallback = (progress: number) => void;
//
// // 단일 파일 업로드 API
// export const uploadFileApi = (
//   file: File,
//   onProgress?: ProgressCallback
// ): Promise<FileUploadResponse> => {
//   const formData = new FormData();
//   formData.append('file', file);
//
//   return commonAxios.post({
//     url: '/upload',
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress: (progressEvent) => {
//       if (onProgress) {
//         const percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / (progressEvent.total || 1)
//         );
//         onProgress(percentCompleted);
//       }
//     },
//   });
// };
//
// // 다중 파일 업로드 API
// export const uploadMultipleFilesApi = (
//   files: File[],
//   onProgress?: ProgressCallback
// ): Promise<MultipleFileUploadResponse> => {
//   const formData = new FormData();
//   files.forEach((file, index) => {
//     formData.append(`files`, file);
//   });
//
//   return commonAxios.post({
//     url: '/upload/multiple',
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress: (progressEvent) => {
//       if (onProgress) {
//         const percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / (progressEvent.total || 1)
//         );
//         onProgress(percentCompleted);
//       }
//     },
//   });
// };
//
// // 제품 이미지 업로드 API
// export const uploadProductImageApi = (
//   productId: number,
//   file: File,
//   onProgress?: ProgressCallback
// ): Promise<FileUploadResponse> => {
//   const formData = new FormData();
//   formData.append('image', file);
//   formData.append('productId', productId.toString());
//
//   return commonAxios.post({
//     url: `/products/${productId}/image`,
//     data: formData,
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     onUploadProgress: (progressEvent) => {
//       if (onProgress) {
//         const percentCompleted = Math.round(
//           (progressEvent.loaded * 100) / (progressEvent.total || 1)
//         );
//         onProgress(percentCompleted);
//       }
//     },
//   });
// };
//
// // 파일 삭제 API
// export const deleteFileApi = (fileUrl: string): Promise<{ success: boolean }> => {
//   return commonAxios.delete({
//     url: '/files',
//     data: { url: fileUrl },
//   });
// };
