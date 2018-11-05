import React, { Component } from "react";
import "./index.css";
import Toolbar from "./components/Toolbar.jsx";
import MessageList from "./components/MessageList.jsx";
import Compose from "./components/Compose";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      allSpark: "far fa-minus-square",
      composeMenu: false,
      newMessage: {}
    };
    this.dispose = this.dispose.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8082/api/messages")
      .then(response => response.json())
      .then(response => {
        this.setState({
          messages: response
        });
      });
  }

  changeMyDB = data => {
    fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json());
  };

  addMessage = data => {
    fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => console.log(res.json()));
  };

  selector = e => {
    //  setting set for the messages
    var messages = this.state.messages;
    // sparker is for checking/ selecting items
    var allSpark;
    let allSparker;
    //  button is targname is equaling selected button through reduce function tally is a true or false type tally
    if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
      var countSelects = messages.reduce((tally, current) => {
        return (tally += current.selected ? 1 : 0);
      }, 0);
      //  countSelect reduces the tally to 1 or 0   to select items
      var newSelectValues =
        countSelects > 0
          ? countSelects === messages.length
            ? false
            : true
          : true;
      let update = messages.map(x => {
        return {
          ...x,
          selected: newSelectValues
        };
      });
      this.setState({
        messages: update
      });
      //  sparker is for selecting or putting check in check boxes.
      allSparker = newSelectedValues;
    } else {
      var target = messages[e.target.id - 1];
      target.selected === undefined
        ? (target.selected = true)
        : (target.selected = !target.selected);
      this.setState({
        messages: messages
      });
      e.stopPropogation();
    }
    var countSelects = this.state.messages.reduce((tally, current) => {
      return (tally += current.selected ? 1 : 0);
    }, 0);
    //  filling in check box  with 1 or 0 tally function
    countSelects > 0
      ? countSelects === messages.length
        ? (allSpark = "far fa-check-square")
        : (allSpark = "far fa-minus-square")
      : (allSpark = "far fa-square");
    allSparker === true
      ? (allSpark = "far fa-check-square")
      : allSparker === undefined
        ? allSpark
        : (allSpark = "far fa-square");
    this.setState({
      AllSpark: AllSpark
    });
  };
  // Selects by if read true after mapping messages
  markRead = e => {
    var messages = this.state.messages;
    messages = messages.map(x => {
      return {
        ...x,
        read: x.selected === true ? (x.read = true) : (x.read = x.read)
      };
    });
    this.setState({
      messages: messages
    });
  };
  // if unread true mark unread
  markUnread = e => {
    var messages = this.state.messages;
    messages = messages.map(x => {
      return {
        ...x,
        read: x.selected === true ? (x.read = false) : (x.read = x.read)
      };
    });
    this.setState({
      messages: messages
    });
  };
  //  select star and fill by ID
  starMe = e => {
    var messages = this.state.messages;
    var target = messages[e.target.id - 1];
    target.starred = !target.starred;
    this.setState({
      messages: messages
    });
    e.stopPropogation();
  };

  labelMeElmo = e => {
    var messages = this.state.messages;
    messages = messages.map(messages => {
      messages.selected === true
        ? message.labels.length === 0
          ? (message.labels = [e.target.value])
          : (message.labels = message.labels.reduce(
              newLabelArray => {
                newLabelArray.indexOf(e.target.value) === -1
                  ? newLabelArray.push(e.target.value)
                  : (newLabelArray = newLabelArray);
                return newLabelArray;
              },
              [...message.labels]
            ))
        : (message.labels = message.labels);
      return message;
    });
    this.setState({
      messages: messages
    });
  };
  unlabelMeElmo = e => {
    var messages = this.state.messages;
    messages = messages.map(message => {
      messages.selected === true
        ? (message.labels = message.labels.reduce(
            newLabelArray => {
              newLabelArray.indexOf(e.target.values) !== -1
                ? (newLabelArray[newLabelArray.indexOf(e.target.value)] = "")
                : (newLabelArrray = newLabelArray);
              return newLabelArray;
            },
            [...message.labels]
          ))
        : (message.labels = message.labels);
      return message;
    });
    this.setState({
      messages: messages
    });
  };
  delete = e => {
    var messages = this.state.messages;
    var targets = messages.reduce((tally, message) => {
      message.selected && tall.push(message.id);
      return tally;
    }, []);
    messages = messages.map(
      item =>
        item.selected === undefined || item.selected === false
          ? item
          : undefined
    );
    messages = messages.filter(item => item !== undefined);
    messages = message.map((item, i) => {
      return {
        ...item,
        id: i + 1,
        selected: false
      };
    });
    this.setState({
      messages: messages
    });
    for (leti + 0; i < targets.length; i++) {
      let body = {
        messageIds: [targets[i]],
        command: "removeLabels",
        label: e.target.value
      };
      this.changeMyDB(body);
    }
  };
  showMebody = e => {
    var messages = this.state.messages;
    var target = messages[e.target.id - 1];
    target.displayed === undefined
      ? (target.displayed = true)
      : (target.displayed = !target.displayed);
    target.read = true;
    this.setState({
      message: messages
    });
    let body = {
      messageIds: [e.target.id],
      command: "read",
      read: true
    };
    this.changeMyDB(body);
    e.stopPropogation();
  };
  compose = e => {
    var onOff = this.state.composeMenu;
    onOff = !onOff;
    this.setState({ composeMenu: onOff });
  };

  dispose = e => {
    if (e.target.id === "body") {
      var body = e.target.value;
      this.setState({
        newMessage: body
      });
      console.log("body checked", body);
    } else if (e.target.id === "subject") {
      var subject = e.target.value;
      console.log("subject checked", subject);
    } else if (e.target.value === "Send") {
      console.log("no submit, bitch!");
      let body = {
        subject: "subject",
        body: "body"
      };
      this.addMessage(body);
    }
    var messages = this.state.messages;
  };
  render() {
    return (
      <div className="App">
        <div className="container">
          <Toolbar
            delete={this.delete}
            labelMeElmo={this.labelMeElmo}
            unlabelMeElmo={this.unlabelMeElmo}
            messages={this.state.messages}
            markRead={this.markRead}
            markUnread={this.markUnread}
            allSpark={this.state.allSpark}
            selector={this.selector}
          />
          <MessageList
            showMebody={this.showMeBody}
            starMe={this.starMe}
            selector={this.selector}
            messages={this.state.messages}
          />
        </div>
      </div>
    );
  }
}

export default App;
