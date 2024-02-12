import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Login from "../../Components/Login";

describe("Login", () => {
  const state = { ui: { isFetching: false, error: null } };
  const store = {
    getState: () => state,
    subscribe: () => {},
    dispatch: () => {},
  };

  const history = createMemoryHistory();

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Login />
        </Router>
      </Provider>
    );
  test("snapshot", () => {
    const renderComp = renderComponent();
    expect(renderComp.container).toMatchSnapshot();
  });

  test("should dispatch outhLogin action", () => {
    renderComponent();
    const usernameInput = screen.getByLabelText(/username/);
    const password = screen.getByLabelText(/password/);
    const submitButton = screen.getByRole("button");
  });
});
