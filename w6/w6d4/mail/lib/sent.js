const MessageStore = require('./message_store.js');

module.exports = {
  render() {
    const newUl = document.createElement("ul");
    newUl.className = "messages";
    const inboxMessages = MessageStore.getSentMessages();
    inboxMessages.forEach(message => {
      const messageNode = this.renderMessage(message);
      newUl.appendChild(messageNode);
    });
    return newUl;
  },

  renderMessage(message) {
    const newLi = document.createElement("li");
    newLi.className = "message";
    newLi.innerHTML = `
      <span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span> -
      <span class="body">${message.body}</span>
    `;
    return newLi;
  }
};
