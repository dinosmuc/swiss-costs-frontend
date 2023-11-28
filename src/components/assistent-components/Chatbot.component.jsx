import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

import Button from "../main-conent-components/main-components/button-components/Button.component.jsx";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Spinner } from 'react-bootstrap';
import { FileIcon } from 'react-file-icon';


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
        this.fileInputRef = React.createRef(); // Create a ref for the file input
        this.state = {
            currentInput: '',       // State for the current input text
            chatMessages: [],
            isNextUserMessage: true,
            isLoading: false,
            selectedFile: null,      // State to store chat messages
        };
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentDidMount() {
        this.resetChat();
    }
    findDataByTitle(title) {
        // Duplicate the options array here
        const options = [
            {
                id: 1,
                title: 'Swiss Relocation Assistant',
                image: '/images/relocate.png', // Ensure the image path is correct
                system_message: `
                    As the Swiss Relocation Assistant, it's your job to guide users through the key steps of moving to Switzerland. 
                    Begin by collecting essential data from the user, asking questions one at a time and waiting for their response.
                    Go through the following steps.
                    Provide links to relevant websites and resources as needed.

                    Steps:

                    1. Confirm their visa and residence permit status to ensure they can legally reside in Switzerland. 
                    2. Discuss their financial stability, focusing on employment or other income sources.
                    3. Explore housing options, addressing preferences for renting or buying, and desired locations.
                    4. Advise on mandatory health insurance and provide options for different providers.
                    5. Inquire about moving logistics, particularly what they plan to bring and if they need support with the moving process.

                    Only offer a final answer(steps) after you have a comprehensive understanding of the user's specific needs and circumstances.
        
                `,


                first_message: 'Hello, I am the Swiss Relocation Assistant, and I will be assisting you with your relocation to Switzerland. Please provide me with your current country of residence.',
            },
            {
                id: 2,
                title: 'Swiss Canton Transition Assistant',
                image: '/images/canton.png', // Ensure the image path is correct
                system_message: `As the Swiss Canton Transition Assistant, you are responsible for guiding users through the process of moving to a new canton within Switzerland. Your task is to gather essential information from the user, asking questions one at a time and waiting for their responses. Provide advice and resources to facilitate a smooth transition.
            
                Steps:
            
                1. Confirm the user's current canton of residence and the canton they plan to move to.
                2. Provide information on the specific requirements and procedures for changing cantons, such as registration deadlines and necessary documents.
                3. Advise on housing options in the new canton, including renting, buying, and temporary accommodations.
                4. Offer guidance on transferring utilities and services like electricity, water, internet, and postal services.
                5. Assist with understanding the tax implications and changes in tax rates or regulations between cantons.
                6. Share information on local amenities, public transportation, schools, healthcare facilities, and other essential services in the new canton.
                7. Provide resources for cultural integration, including language courses, community groups, and social events specific to the canton.
                8. Help in navigating any canton-specific legal or administrative differences, such as vehicle registration, insurance, and local laws.
            
                Only offer a final answer (steps) after you have a comprehensive understanding of the user's circumstances and the specifics of their planned canton transition.
                `,
                first_message: 'Hello, I am the Swiss Canton Transition Assistant, here to assist you with your move to a new canton in Switzerland. Please tell me about your current and planned cantons of residence.'
            },
            {
                id: 3,
                title: 'Swiss Business Startup Assistant',
                image: '/images/business.png', // Ensure the image path is correct
                system_message: `As the Swiss Business Startup Assistant, your role is to guide users through the essential steps of starting and operating a business in Switzerland. Begin by gathering key information from the user, asking questions one at a time and waiting for their response. Follow these steps and provide links to relevant websites and resources as needed.
            
                Steps:
                
                1. Determine the user's business idea, industry focus, and target market in Switzerland.
                2. Provide guidance on legal structures for businesses in Switzerland, such as sole proprietorship, partnership, or corporation, and help them choose the best fit.
                3. Offer information on the registration process for new businesses, including necessary documents and where to file them.
                4. Advise on Swiss business regulations, compliance requirements, and necessary permits or licenses for their specific industry.
                5. Discuss financing options available in Switzerland, including government grants, venture capital, and bank loans.
                6. Share resources for finding office space, coworking locations, or virtual office services in Switzerland.
                7. Provide tips on networking and integrating into the Swiss business community, including local business events, trade associations, and online platforms.
                8. Assist in understanding the Swiss tax system and recommend resources for financial management and accounting services.
                
                Only offer a final answer (steps) after you have a comprehensive understanding of the user's specific needs and business context.
                `,
                first_message: 'Hello, I am the Swiss Business Startup Assistant, here to help you with starting your business in Switzerland. Please share your business idea and goals.',
            },

            {
                id: 4,
                title: 'Swiss Exploration Assistant',
                image: '/images/explore.png', // Ensure the image path is correct
                system_message: `As the Swiss Exploration Assistant, it's your job to guide users through the key steps of exploring and experiencing the best of Switzerland. Begin by collecting essential data from the user, asking questions one at a time and waiting for their response. Go through the following steps. Provide links to relevant websites and resources as needed.

                Steps:
                
                1. Identify the user's interests and preferences in terms of cultural experiences, outdoor activities, culinary tastes, and historical sites.
                2. Suggest itineraries and destinations that align with their interests, including popular spots and hidden gems across Switzerland.
                3. Offer guidance on the best times to visit different regions and attractions, considering weather and seasonal events.
                4. Provide information on transportation options within Switzerland, such as trains, buses, and car rentals, to facilitate travel between destinations.
                5. Advise on accommodation options, ranging from luxury hotels to cozy bed and breakfasts, based on their budget and location preferences.
                6. Share tips on experiencing local culture, including recommendations for traditional Swiss events, festivals, and local cuisine.
                7. Help plan outdoor adventures, such as hiking in the Alps, skiing, or lake activities, ensuring safety and accessibility based on the user's experience level.
                
                Only offer a final answer (steps) after you have a comprehensive understanding of the user's specific needs and circumstances.
                `,
                first_message: 'Hello, I am the Swiss Exploration Assistant, and I will be assisting you with exploring Switzerland. Please provide me with your interests.',
            },
            {
                id: 5,
                title: 'Swiss Financial Savings Assistant',
                image: '/images/save.png', // Ensure the image path is correct
                system_message: `As the Swiss Financial Savings Assistant, it's your job to guide users through the key steps of managing and optimizing their savings in Switzerland. Begin by collecting essential data from the user, asking questions one at a time and waiting for their response. Go through the following steps. Provide links to relevant websites and resources as needed.

                Steps:
                
                1. Assess the user's current financial situation, including their income, expenses, and existing savings.
                2. Understand their savings goals, whether short-term or long-term, and any specific objectives they have in mind.
                3. Explore various savings and investment options available in Switzerland, tailored to the user's risk tolerance and time horizon.
                4. Discuss tax implications and benefits related to savings and investments in Switzerland.
                5. Provide advice on budgeting strategies and expense management to enhance their ability to save.
                6. Offer insights on retirement planning and pension schemes available in Switzerland.
                7. Guide the user in selecting the right financial institutions and savings accounts that suit their needs.
                
                Only offer a final answer (steps) after you have a comprehensive understanding of the user's specific needs and circumstances.
                `,
                first_message: 'Hello, I am the Swiss Financial Savings Assistant, and I will be assisting you with saving money in Switzerland. Please provide me with your interests.',
            },
            {
                id: 6,
                title: 'Swiss Employment Assistant',
                image: '/images/job.png', // Ensure the image path is correct
                system_message: `As the Swiss Employment Assistant, it's your job to guide users through the key steps of finding and securing employment in Switzerland. Begin by collecting essential data from the user, asking questions one at a time and waiting for their response. Go through the following steps. Provide links to relevant websites and resources as needed.

                Steps:
                
                1. Determine the user's professional background, including qualifications and the type of job they seek in Switzerland.
                2. Confirm their work permit and visa status to ensure they are eligible for employment in Switzerland.
                3. Provide insights into the Swiss job market, focusing on sectors and positions relevant to the users skills and experience.
                4. Guide the user in effective job search strategies, including networking and identifying suitable job platforms.
                5. Assist in CV and interview preparation, aligning with Swiss standards and expectations.
                6. Discuss salary expectations and negotiating strategies, tailored to the Swiss employment context.
                7. Offer advice on adapting to the Swiss work culture, including typical workplace norms and etiquette.
                
                Only offer a final answer (steps) after you have a comprehensive understanding of the user's specific needs and circumstances.
                `,
                first_message: 'Hello, I am the Swiss Employment Assistant, and I will be assisting you with finding employment in Switzerland. Please provide me with your interests.',
            }
        ];


        return options.find(option => option.title === decodeURIComponent(title));
    }


    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Create a URL for the file
            const filePreviewUrl = URL.createObjectURL(file);

            this.setState({
                selectedFile: file,
                filePreviewUrl, // Store the preview URL
                fileName: file.name, // Store the file name
            });
        }
    }

    uploadFileToServer(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${API_BASE_URL}/your-upload-endpoint`, { // Replace with your actual endpoint
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('File upload success:', data);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    }



    handleInputChange = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();  // Prevent default form submit behavior
            this.handleSendClick();
        } else {
            this.setState({ currentInput: event.target.value });
        }
    }
    handleSendClick = async () => {
        if (this.state.currentInput.trim() !== '' || this.state.selectedFile) {
            // Update state with user message
            await this.setState(prevState => ({
                chatMessages: [...prevState.chatMessages, { text: prevState.currentInput, isUser: true }],
                currentInput: ''  // Clear the input field
            }));

            // Send updated chatMessages to backend and fetch response
            this.sendMessagesAndGetResponse();

        }
    }

    addChatbotResponse = () => {
        const { params } = this.props.router;
        const data = this.findDataByTitle(params.title) || {};
        const chatbotResponse = data.system_message || "Default chatbot response"; // Use the system_message

        this.setState(prevState => ({
            chatMessages: [...prevState.chatMessages, { text: chatbotResponse, isUser: false }]
        }));
    }

    sendMessagesAndGetResponse = async () => {
        this.setState({ isLoading: true }); // Activate spinner before the fetch operation

        // Determine if this is the first user message
        const isFirstMessage = this.state.chatMessages.length === 1 && this.state.chatMessages[0].isUser;

        // Retrieve the system message and first message if it's the first user message
        let systemMessage = '';
        let firstMessage = '';

        if (isFirstMessage) {
            const { params } = this.props.router;
            const data = this.findDataByTitle(params.title) || {};
            systemMessage = data.system_message;
            firstMessage = data.first_message;
        }

        // Construct payload to be sent to the backend
        const payload = {
            message: this.state.chatMessages[this.state.chatMessages.length - 1].text,
            systemMessage: isFirstMessage ? systemMessage : undefined,
            firstMessage: isFirstMessage ? firstMessage : undefined,
        };

        // Prepare FormData to handle file upload
        const formData = new FormData();
        formData.append('message', JSON.stringify(payload)); // Append payload as JSON string
        if (this.state.selectedFile) {
            formData.append('file', this.state.selectedFile); // Append file if it exists
        }

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot/api/`, {
                method: 'POST',
                body: formData, // Send formData instead of JSON
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Use response.text() or response.json() depending on your backend response
            const chatbotResponseText = await response.text();

            // Update state with chatbot response
            this.setState(prevState => ({
                chatMessages: [...prevState.chatMessages, { text: chatbotResponseText, isUser: false }],
                isLoading: false,
                // selectedFile: null // Reset the selected file after sending
            }));
            if (this.fileInputRef.current) {
                this.fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            this.setState({ isLoading: false, selectedFile: null }); // Reset loading and file on error
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

            // Reset the chatMessages state here
            this.setState({ chatMessages: [] });

        } catch (error) {
            console.error('Error resetting chat:', error);
        }
    }

    renderChatMessages = () => {
        return this.state.chatMessages.map((message, index) => {
            const isLastUserMessage = index === this.state.chatMessages.length - 1 || this.state.chatMessages[index + 1]?.isUser === false;
            const shouldShowFile = this.state.selectedFile && isLastUserMessage && message.isUser;

            if (message.isUser) {
                return (
                    <div key={index} className="chat-interface-user">
                        <div className="chatbot-image-container">
                            <img src='/images/user.png' alt="User" className="chatbot-image" />
                        </div>
                        <div className="chatbot-text-container">
                            {message.text && <p className="chatbot-message">{message.text}</p>}

                            {shouldShowFile && (
                                <div className="file-preview-container">
                                    {this.state.selectedFile.type.startsWith('image/') ? (
                                        <img src={this.state.filePreviewUrl} alt="File Thumbnail" className="file-thumbnail" />
                                    ) : (
                                        // Use FileIcon for non-image files
                                        <FileIcon
                                            extension={this.getFileExtension(this.state.fileName)}
                                            size={24} // Adjust this value
                                        />







                                    )}
                                    <p className="file-name">{this.state.fileName}</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            } else {
                // Existing rendering logic for chatbot messages remains unchanged
                const { params } = this.props.router;
                const data = this.findDataByTitle(params.title) || {};

                return (
                    <div key={index} className="chat-interface">
                        <div className="chatbot-image-container">
                            <img src={data.image} alt={`Chatbot for ${data.title}`} className="chatbot-image" />
                        </div>
                        <div className="chatbot-text-container" dangerouslySetInnerHTML={{ __html: message.text }}>
                            {/* Content rendered as HTML */}
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
            <div className="chatbot-container" >
                <h2>{data.title}</h2>

                {/* Chat interface for the chatbot */}
                <div className="chat-interface" >
                    <div className="chatbot-image-container">
                        <img src={data.image} alt={`Chatbot for ${data.title}`} className="chatbot-image" />
                    </div>
                    <div className="chatbot-text-container">
                        <p className="chatbot-message">{data.first_message}</p>
                    </div>
                </div>

                {/* Rendered chat messages from the user */}
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
                        onKeyPress={(event) => event.key === 'Enter' && this.handleSendClick()} // Modified this line
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
                        ref={this.fileInputRef} // Attach the ref to the file input
                    />
                </Form.Group>
                <div className="text-center">
                    <Button className="send-button" onClick={this.handleSendClick}>Send</Button> {/* Added onClick event */}
                </div>


            </div>
        );
    }
}

export default withRouter(ChatbotComponent);