import React from "react";
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Launcher } from 'react-chat-window'
import io from 'socket.io-client';
class ChatBotRobot extends React.Component {
    constructor(props,context) {
        super(props);
this.state = {
            messageList: [],
            socket: props.context.socket,
            room: "user1",
        }
}
UNSAFE_componentWillMount() {
        this._sendMessage("Hey there ! Would You Like Me To Advise You Which Course To Buy?");
    }
componentDidMount() {
        // this.state.socket.connect(true);
        this.state.socket.emit('join', this.state.room);
this.state.socket.on("send-msg-response", async (msg) => {
            this.state.messageList.pop();
            await this.setState({
                messageList: [...this.state.messageList]
            })
this._sendMessage(msg);
        })
}
async _onMessageWasSent(message) {
        await this.setState({
            messageList: [...this.state.messageList, message]
        })
this._sendMessage("••••");
        await this.state.socket.emit('new-msg', { msg: message.data.text, room: this.state.room })
}
_sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                },]
            })
        }
    }
render() {
return (
            <div id="chatbox" className="chatbox">
                <Launcher
                    agentProfile={{
                        teamName: 'Chatbot',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    onMessageWasSent={this._onMessageWasSent.bind(this)}
                    messageList={this.state.messageList}
                    showEmoji
                />
            </div>
        );
    }
}
export default ChatBotRobot;