export default function useClipboard() {
  function write(data: string) {
    return navigator.clipboard.writeText(data);
  }
  function read(
    onSuccess: (text: string) => void,
    onFail: (reason: any) => void
  ) {
    return navigator.clipboard.readText().then(onSuccess).catch(onFail);
  }
  return {
    write,
    read,
  };
}
