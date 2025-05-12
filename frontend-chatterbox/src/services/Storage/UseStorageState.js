import { useEffect, useState } from "react";
import LocalStorageServicio from "./LocalStorageServicio";

// Todo lo que empiece con "use" es un hook
function useStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    const saveValue = LocalStorageServicio.get(key);
    return saveValue !== null ? saveValue : initialValue;
  });

  useEffect(() => LocalStorageServicio.set(key, state), [state]);

  return [state, setState];
}

export default useStorageState;
