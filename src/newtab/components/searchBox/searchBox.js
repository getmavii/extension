import React from "react";
import "./searchBox.scss";

const KEY_CODES = {
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  UP: 38,
};

class SearchBox extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      query: "",
      userInput: null,
      suggestions: [],
      selectedSuggestionIndex: -1,
      isFocused: false,
    };
  }

  async handleInput(e) {
    const q = e.target.value;

    this.setState({
      query: q,
      userInput: q,
      selectedSuggestionIndex: -1,
      isFocused: true,
    });

    if (q.length) {
      const response = await (
        await fetch(
          `https://dev.mavii.com/api/suggestions?q=${encodeURIComponent(q)}`
        )
      ).json();

      // Don't update the suggestions unless it still matches the input
      if (e.target.value == response[0]) {
        this.setState({ suggestions: response[1] });
      }
    }
    // If the query is empty but we still have suggestions, reset them.
    else if (this.state.suggestions.length) {
      this.setState({ suggestions: [] });
    }
  }

  handleKeyDown(e) {
    const { query, suggestions, selectedSuggestionIndex } = this.state;

    if (query.length) {
      if (e.keyCode == KEY_CODES.UP) {
        // Don't move cursor to the beginning of the text
        e.preventDefault();

        // Wrap around to the end
        if (selectedSuggestionIndex == -1) {
          this.selectSuggestion(suggestions.length - 1);
        }
        // Select the input box
        else if (selectedSuggestionIndex == 0) {
          this.revertToUserInput();
        } else {
          this.selectSuggestion(selectedSuggestionIndex - 1);
        }
      }
      // Down arrow: increment the index
      else if (e.keyCode == KEY_CODES.DOWN) {
        // Don't move cursor to the end of the text
        e.preventDefault();

        // Select in the input box
        if (selectedSuggestionIndex == suggestions.length - 1) {
          this.revertToUserInput();
        } else {
          this.selectSuggestion(selectedSuggestionIndex + 1);
        }
      }
      // Esc: reset values
      else if (e.keyCode == KEY_CODES.ESC) {
        // Revert if there's a selected index
        if (selectedSuggestionIndex != -1) {
          this.revertToUserInput();
        }
        // Clear suggestions if esc is pressed while search box is selected
        else {
          this.clearSuggestions();
        }
      }
    }
  }

  selectSuggestion(index) {
    this.setState({
      selectedSuggestionIndex: index,
      query: this.state.suggestions[index],
    });
  }

  revertToUserInput() {
    this.setState({
      query: this.state.userInput,
      selectedSuggestionIndex: -1,
    });
  }

  clearSuggestions(e) {
    this.setState({ suggestions: [] });
  }

  handleBlur() {
    this.setState({ isFocused: false });
  }

  handleFocus() {
    this.setState({ isFocused: true });
  }

  getFormClasses() {
    const formClasses = ["searchBox"];

    if (this.state.suggestions.length) {
      formClasses.push("hasSuggestions");
    }

    if (this.state.isFocused) {
      formClasses.push("isFocused");
    }

    return formClasses.join(" ");
  }

  render() {
    const { suggestions, selectedSuggestionIndex } = this.state;
    const query =
      this.state.query !== null ? this.state.query : this.props.query;

    let suggestionsComponent;

    if (query?.length && suggestions.length) {
      suggestionsComponent = (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === selectedSuggestionIndex) {
              className = "selected";
            }

            const href = `http://dev.mavii.com/search?q=${encodeURIComponent(
              suggestion
            )}`;

            return (
              <li className={className} key={suggestion}>
                <a href={href} onClick={this.clearSuggestions.bind(this)}>
                  {suggestion}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className="searchBoxContainer">
        <form
          className={this.getFormClasses()}
          action="https://dev.mavii.com/search"
          method="get"
          onSubmit={this.clearSuggestions.bind(this)}
        >
          <input
            ref={this.inputRef}
            name="q"
            placeholder={this.props.placeholder}
            onInput={this.handleInput.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            value={query}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
            </svg>
          </button>
          {suggestionsComponent}
        </form>
      </div>
    );
  }
}

export default SearchBox;
