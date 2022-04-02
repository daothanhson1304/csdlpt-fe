import { axiosInstance } from '../../api/axiosInstence';
export const getAllStudent = () => {
  const url = '/getAll';
  return axiosInstance.get(url);
};

export const postStudent = (student) => {
  const url = '/add';
  return axiosInstance.post(url, student);
};

export const deleteStudent = (id) => {
  const url = `/delete/${id}`;
  return axiosInstance.delete(url);
};
