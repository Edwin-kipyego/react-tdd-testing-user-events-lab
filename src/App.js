import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const allInterests = ["Technology", "Design", "Marketing"];

  function handleCheckboxChange(e) {
    const value = e.target.value;
    setInterests(prev =>
      prev.includes(value)
        ? prev.filter(i => i !== value)
        : [...prev, value]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua...
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <section>
        <h2>Newsletter Signup</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <fieldset>
              <legend>Select your interests:</legend>
              {allInterests.map(interest => (
                <label key={interest}>
                  <input
                    type="checkbox"
                    value={interest}
                    onChange={handleCheckboxChange}
                    checked={interests.includes(interest)}
                  />
                  {interest}
                </label>
              ))}
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <h3>Thank you, {name}!</h3>
            <p>You have signed up with {email}.</p>
            {interests.length > 0 && (
              <p>Your interests: {interests.join(", ")}</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;


