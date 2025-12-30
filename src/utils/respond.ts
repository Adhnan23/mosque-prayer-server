const respond = (
  success: boolean,
  message: string,
  data: any = null,
  error: any = null
) => ({
  success,
  message,
  data,
  error,
});

export default respond;
