import React from "react";
import Message from "./Message.js";

const MessageList = props => {
  let listOMessages = props.messages.map((item, i) => (
    <Message
      key={i}
      starMe={props.starMe}
      selector={props.selector}
      info={item}
    />
  ));
  return <div className="container">{list0Messages}</div>;
};

export default MessageList;
