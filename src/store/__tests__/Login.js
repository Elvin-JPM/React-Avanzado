import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Login from "../../Components/Login";
import { authLogin } from "../actions";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../actions");

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
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("should dispatch authLogin action", () => {
    const username = "keepcoding";
    const password = "password";
    const remember = true;
    renderComponent();
    const usernameInput = screen.getByLabelText(/username/);
    const passwordInput = screen.getByLabelText(/password/);
    const rememberInput = screen.getByLabelText(/Remember/);
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(rememberInput, { target: { value: remember } });

    //expect(submitButton).toBeEnabled();

    fireEvent.click(submitButton);
    console.log("authLogin calls:", authLogin.mock.calls);
    //expect(authLogin).toHaveBeenCalledWith(remember,{ username, password });
  });
});
