import { AxiosError } from 'axios';

export function handleAxiosError(
  error: unknown,
  setError: (msg: string) => void,
) {
  if (error instanceof AxiosError) {
    if (error.response) {
      const message =
        typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.message;
      setError(message);
    } else if (error.request) {
      setError('Нет ответа от сервера. Пожалуйста, попробуйте позже.');
    } else {
      setError('Неизвестная ошибка, попробуйте, пожалуйста, позже.');
    }
  }
}
