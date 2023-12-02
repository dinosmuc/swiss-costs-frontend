import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import Button from "../main-conent-components/main-components/button-components/Button.component.jsx";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Spinner } from 'react-bootstrap';
import { FileIcon } from 'react-file-icon';
import options from './chatOptions.js';
import "./chatbot.styles.scss"
import { API_BASE_URL } from '../../config.js';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return <Component {...props} router={{ params }} />;
    }
    return ComponentWithRouterProp;
}

class ChatbotComponent extends Component {
    constructor(props) {
        super(props);
        this.fileInputRef = React.createRef();
        this.state = {
            currentInput: '',
            chatMessages: [],
            isLoading: false,
            selectedFile: null,
        };
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentDidMount() {
        this.resetChat();
    }

    findDataByTitle(title) {
        return options.find(option => option.title === decodeURIComponent(title));
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            console.log("File selected:", file); // Log file selection
            this.setState({
                selectedFile: file,
                filePreviewUrl: URL.createObjectURL(file),
                fileName: file.name,
            }, () => console.log("State after file selection:", this.state)); // Log state change
        }
    }
    uploadFileAndMessage = async (file, textMessage) => {
        this.setState({ isLoading: true }); // Set loading to true before starting the fetch request

        console.log("uploadFileAndMessage called with file:", file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('message', JSON.stringify({ message: textMessage }));

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/api/`, {
                method: 'POST',
                body: formData,
            });



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const chatbotResponseText = await response.text();
            console.log('Response from server:', chatbotResponseText);

            this.setState(prevState => ({
                chatMessages: [...prevState.chatMessages, { text: chatbotResponseText, isUser: false }],
                isLoading: false // Set loading to false after getting the response
            }));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ isLoading: false }); // Set loading to false also in case of an error
        }
    };



    handleInputChange = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSendClick();
        } else {
            this.setState({ currentInput: event.target.value });
        }
    }

    handleSendClick = async () => {
        console.log("Send button clicked");
        const { currentInput, selectedFile } = this.state; // Destructure for easier access

        if (currentInput.trim() !== '' || selectedFile) {
            console.log("Preparing to send message", selectedFile, currentInput);

            // Store the file in a local variable before setting the state
            const fileToSend = selectedFile;

            this.setState(prevState => ({
                chatMessages: [...prevState.chatMessages, { text: currentInput, isUser: true, file: selectedFile }],
                currentInput: '',
                selectedFile: null
            }), () => {
                // Use the local variable fileToSend instead of this.state.selectedFile
                if (fileToSend) {
                    console.log("Calling uploadFileAndMessage with file:", fileToSend);
                    this.uploadFileAndMessage(fileToSend, currentInput);
                } else {
                    this.sendMessagesAndGetResponse();
                }
            });

            if (this.fileInputRef.current) {
                this.fileInputRef.current.value = "";
            }
        }
    };








    addChatbotResponse = () => {
        const { params } = this.props.router;
        const data = this.findDataByTitle(params.title) || {};
        const chatbotResponse = data.system_message || "Default chatbot response";

        this.setState(prevState => ({
            chatMessages: [...prevState.chatMessages, { text: chatbotResponse, isUser: false }]
        }));
    }

    sendMessagesAndGetResponse = async () => {
        this.setState({ isLoading: true });



        if (this.state.chatMessages.length === 0) {
            console.error('No messages in chatMessages array');
            this.setState({ isLoading: false });
            return;
        }

        const isFirstMessage = this.state.chatMessages.length === 1 && this.state.chatMessages[0].isUser;
        let systemMessage = '';
        let firstMessage = '';

        if (isFirstMessage) {
            const { params } = this.props.router;
            const data = this.findDataByTitle(params.title) || {};
            systemMessage = data.system_message;
            firstMessage = data.first_message;
        }

        const lastMessage = this.state.chatMessages[this.state.chatMessages.length - 1];

        const payload = {
            message: lastMessage.text,
            systemMessage: isFirstMessage ? systemMessage : undefined,
            firstMessage: isFirstMessage ? firstMessage : undefined,
        };

        console.log("Payload:", payload)

        const formData = new FormData();
        formData.append('message', JSON.stringify(payload));

        if (this.state.selectedFile) {
            formData.append('file', this.state.selectedFile);
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/api/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const chatbotResponseText = await response.text();


            this.setState(prevState => ({
                chatMessages: [...prevState.chatMessages, { text: chatbotResponseText, isUser: false }],
                isLoading: false,
                selectedFile: prevState.currentInput.trim() !== '' ? null : prevState.selectedFile
            }));
            if (this.fileInputRef.current) {
                this.fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ isLoading: false, selectedFile: null });
            if (this.fileInputRef.current) {
                this.fileInputRef.current.value = "";
            }
        }
    }

    resetChat = async () => {
        try {
            const response = await fetch("http://localhost:8000/chatbot/api/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reset: true })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Chat reset successfully');
            this.setState({ chatMessages: [] });
        } catch (error) {
            console.error('Error resetting chat:', error);
        }
    }

    renderChatMessages = () => {
        return this.state.chatMessages.map((message, index) => {
            const shouldShowFile = !!message.file;
            // Apply animation class based on the message sender
            const animationClass = message.isUser ? 'slide-in-right' : 'slide-in-left';

            if (message.isUser) {
                return (
                    <div key={index} className={`chat-interface-user ${animationClass}`}>
                        <div className="chatbot-image-container">
                            <img src='/images/user.png' alt="User" className="chatbot-image" />
                        </div>
                        <div className="chatbot-text-container">
                            {message.text && <p className="chatbot-message">{message.text}</p>}
                            {shouldShowFile && (
                                <div className="file-preview-container">
                                    {message.file.type.startsWith('image/') ? (
                                        <img src={URL.createObjectURL(message.file)} alt="File Thumbnail" className="file-thumbnail" />
                                    ) : (
                                        <FileIcon
                                            extension={this.getFileExtension(message.file.name)}
                                            size={24}
                                        />
                                    )}
                                    <p className="file-name">{message.file.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            } else {
                // For chatbot messages
                const { params } = this.props.router;
                const data = this.findDataByTitle(params.title) || {};

                return (
                    <div key={index} className={`chat-interface ${animationClass}`}>
                        <div className="chatbot-image-container">
                            <img src={data.image} alt={`Chatbot for ${data.title}`} className="chatbot-image" />
                        </div>
                        <div className="chatbot-text-container" dangerouslySetInnerHTML={{ __html: message.text }}>
                        </div>
                    </div>
                );
            }
        });
    };



    getFileExtension = (filename) => {
        return filename.split('.').pop();
    }

    componentWillUnmount() {
        this.resetChat();
    }

    render() {
        const { params } = this.props.router;
        const data = this.findDataByTitle(params.title) || {};
        return (
            <div className="chatbot-container">


                <div className="chat-interface">
                    <div className="chatbot-image-container">
                        <img src={data.image} alt={`Chatbot for ${data.title}`} className="chatbot-image" />
                    </div>
                    <div className="chatbot-text-container">
                        <p className="chatbot-message">{data.first_message}</p>
                    </div>
                </div>

                {this.renderChatMessages()}

                {this.state.isLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <InputGroup className="mb-3">
                    <Form.Control
                        value={this.state.currentInput}
                        onChange={this.handleInputChange}
                        onKeyPress={(event) => event.key === 'Enter' && this.handleSendClick()}
                        placeholder="Here write your message"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload file</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={this.handleFileUpload}
                        ref={this.fileInputRef}
                    />
                </Form.Group>
                <div className="text-center">
                    <Button className="send-button" onClick={this.handleSendClick}>Send</Button>
                </div>
            </div>
        );
    }
}

export default withRouter(ChatbotComponent);
