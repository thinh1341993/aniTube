import { createContext, useContext } from "react";
import { AuthStore } from "./authStore.ts";

interface RootStore {
  authStore: AuthStore;
}

export const rootStore: RootStore = {
  authStore: new AuthStore(),
};

/**
 * Create a context we can use to
 * - Provide access to our stores from our root component
 * - Consume stores in our screens (or other components, though it's
 *   preferable to just connect screens)
 */
const RootStoreContext = createContext<RootStore>({} as RootStore);

/**
 * The provider our root component will use to expose the root store
 */
export const RootStoreProvider = ({ children }: { children: any }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
};

/**
 * A hook that screens can use to gain access to our stores, with
 * `const { someStore, someOtherStore } = useStores()`,
 * or less likely: `const rootStore = useStores()`
 */
export const useStores = () => useContext(RootStoreContext);
