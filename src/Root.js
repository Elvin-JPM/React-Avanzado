import { Provider } from "react-redux";

export default function Root({ store, children }) {
  return <Provider store={store}>{children}</Provider>;
}
