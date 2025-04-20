import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );
  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  expect(screen.getByLabelText(/technology/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/marketing/i)).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  expect(screen.getByLabelText(/technology/i)).not.toBeChecked();
  expect(screen.getByLabelText(/design/i)).not.toBeChecked();
  expect(screen.getByLabelText(/marketing/i)).not.toBeChecked();
});

// Newsletter Form - User Interaction
test("the page shows information the user types into the name and email address form fields", async () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  await userEvent.type(nameInput, "Jordan");
  await userEvent.type(emailInput, "jordan@example.com");

  expect(nameInput).toHaveValue("Jordan");
  expect(emailInput).toHaveValue("jordan@example.com");
});

test("checked status of checkboxes changes when user clicks them", async () => {
  render(<App />);
  const techCheckbox = screen.getByLabelText(/technology/i);

  expect(techCheckbox).not.toBeChecked();
  await userEvent.click(techCheckbox);
  expect(techCheckbox).toBeChecked();
  await userEvent.click(techCheckbox);
  expect(techCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", async () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const techCheckbox = screen.getByLabelText(/technology/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(nameInput, "Casey");
  await userEvent.type(emailInput, "casey@example.com");
  await userEvent.click(techCheckbox);
  await userEvent.click(submitButton);

  expect(screen.getByText(/thank you, casey/i)).toBeInTheDocument();
  expect(screen.getByText(/you have signed up with casey@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/your interests: technology/i)).toBeInTheDocument();
});

