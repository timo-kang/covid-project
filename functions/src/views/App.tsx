import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatValue: "채팅을 입력해주세요",
            chat2DList: [],
            chat1DList: [],
            remove: 0,
        };
    }

    handleClick() {
        this.setState({
            chatValue: ""
        })
    }

    doChange(e) {
        const newValue = e.target.value;
        this.setState({ chatValue: newValue });
    }

    doSubmit(e) {
        const chat2DList = this.state.chat2DList;
        const chat2DValue = this.state.chatValue;
        if (chat2DValue[0] === '!') {
            /* Chat1D로 가야함 */
            const chat1DList = this.state.chat1DList;
            const today = new Date();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const newItem = {
                time: time,
                writer: '나',
                chatValue: chat2DValue.slice(1, chat2DValue.length),
            }
            if (chat1DList.empty) {
                this.setState({
                    chat1DList: [newItem],
                });
            }
            else {
                this.setState({
                    chat1DList: chat1DList.concat(newItem),
                });
            }
        }
        else {
            if (chat2DValue) {
                const popupX = 10 + chat2DValue.length * 15 + Math.random() * (500 - chat2DValue.length * 15);
                const popupY = 30 + Math.random() * 250;
                const popupStyle = {
                    zIndex: '1',
                    position: "absolute",
                    left: popupX - chat2DValue.length * 10 + "px",
                    top: popupY + "px",
                    border: "1px solid",
                    width: 40 + chat2DValue.length * 15 + "px",
                    maxWidth: "300px",
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    background: "white",
                };
                const newItem = {
                    popupStyle: popupStyle,
                    writer: '나',
                    chatValue: chat2DValue,
                };
                if (!chat2DList) {
                    const newList = [newItem];
                    this.setState({
                        chat2DList: newList,
                    });
                }
                else {
                    this.setState({
                        chat2DList: chat2DList.concat(newItem),
                    });
                }
                setTimeout(() => {
                    this.setState(prevState => ({
                        remove: prevState.remove + 1
                    }));
                }, 4000);
            }
        }
        this.setState({
            chatValue: "",
        });
        e.preventDefault();
    }

    componentDidUpdate() {
        const chat2DList = this.state.chat2DList;
        const remove = this.state.remove;
        if (remove !== 0) {
            this.setState({
                chat2DList: chat2DList.slice(1, chat2DList.length),
                remove: remove - 1,
            });
        }
    }


    render() {
        const doSubmit = (e) => this.doSubmit(e);
        const doChange = (e) => this.doChange(e);
        const handleClick = () => this.handleClick();

        return (
            <div className="App">
                <div className="App-Chat2D">
                    <Chat2D chatList={this.state.chat2DList} />
                </div>
                <div className="App-Chat1D">
                    <Chat1D chatList={this.state.chat1DList} />
                </div>
                <div className="App-ChatInput">
                    <form onSubmit={doSubmit}>
                        <input type="text"
                            className="chatInput"
                            value={this.state.chatValue}
                            onClick={handleClick}
                            onChange={doChange} />
                    </form>
                </div>
            </div>
        );
    }
}


class Chat2D extends Component {

    render() {
        const chatList = this.props.chatList;
        const popups = chatList.map(
            (chat, i) => (
                <div key={i} style={chat.popupStyle}>{chat.writer} : {chat.chatValue}</div>
            )
        );
        return (
            <div>
                {popups}
                <div className="Chat2D-layout">
                    <div className="Chat2D-title">2D채팅방</div>
                </div>
            </div>
        )
    }
}

class Chat1D extends Component {
    render() {
        const chatList = this.props.chatList;
        const chatHistory = chatList.map(
            (chat, i) => (
                <div key={i} textAlign="left">[{chat.time}] {chat.writer} : {chat.chatValue}</div>
            )
        );
        return (
            <div className="Chat1D-layout">
                <div className="Chat1D-title">1D 채팅방</div>
                {chatHistory}
            </div>
        )
    }
}


export default App;