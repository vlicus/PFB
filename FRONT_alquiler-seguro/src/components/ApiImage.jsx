export default function ApiImage({ name, ...rest }) {
  const { VITE_API_URL, VITE_API_MEDIA_PATH } = import.meta.env;
  return <img src={VITE_API_URL + VITE_API_MEDIA_PATH + name} {...rest} />;
}
