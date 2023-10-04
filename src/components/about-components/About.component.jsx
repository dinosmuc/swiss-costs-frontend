import React from 'react';
import './about.styles.scss';
import Button from '../main-conent-components/main-components/button-components/Button.component';
import { CSSTransition } from 'react-transition-group';

class About extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        
        const email = document.getElementById("emailInput").value;
        const message = document.getElementById("messageInput").value;

        if (!email || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }
        
        // If everything is filled in, you can send the form data to the server or handle it as per your requirement
        console.log("Feedback submitted:", { email, message });
    }

    render() {
        return (
            <>
            <div className='cards'>

            
                {/* Introduction Card */}
                <CSSTransition in={true} appear={true} timeout={500} classNames="slide-left">
                <div className="card card-form text-center mb-4">
                    <div className="card-body">
                        <h5 className="mb-3">Introduction</h5>
                        <p>
                            Welcome to SwissCosts, your comprehensive guide to understanding the nuances of living costs across the picturesque Swiss cantons. Designed with precision and user-friendliness at its core, SwissCosts aims to offer residents and potential movers a clear perspective on the financial landscape of Switzerland. Our estimates are meticulously curated from various reliable sources to give you a well-rounded view. However, as with any estimations, the figures presented are approximate and should be used as a general guideline. Our primary goal is to equip you with insights, helping you make informed decisions whether you're considering relocating, planning a trip, or merely curious about the cost of living in Switzerland.
                        </p>
                    </div>
                </div>
                </CSSTransition>


                {/* Target Audience Card */}
                <CSSTransition in={true} appear={true} timeout={500} classNames="slide-right">
                <div className="card card-form mb-4 ">
                    <div className="card-body">
                        <h5 className="mb-3">Target Audience</h5>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            <li><strong>Locals:</strong> For Swiss residents looking to understand the financial implications of moving between cantons or making lifestyle adjustments.</li>
                            <li><strong>Expatriates:</strong> For foreign nationals considering a move to Switzerland, offering a clear perspective on potential living costs.</li>
                            <li><strong>Travel Enthusiasts:</strong> For those planning trips and wanting a glimpse into the cost of short-term stays in different regions.</li>
                            <li><strong>Researchers & Analysts:</strong> Offering data-driven insights into the economic landscape of Swiss cantons.</li>
                        </ul>
                        <p>
                            SwissCosts provides valuable insights that aid in making informed decisions, whether you're contemplating relocation, a vacation, or a lifestyle change.
                        </p>
                    </div>
                </div>
                </CSSTransition>



                {/* Calculations Card */}
                <CSSTransition in={true} appear={true} timeout={500} classNames="slide-left">
                <div className="card card-form mb-4 ">
                    <div className="card-body">
                        <h5 className="mb-3">How We Calculate</h5>
                        <p>
                            At SwissCosts, our mission is to provide users with a comprehensive and accurate estimation of living costs across Swiss cantons. Our approach is threefold:
                        </p>
                        <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
                            <li><strong>API Integration:</strong> We leverage APIs for real-time data. For instance, user input details, such as Canton and Gross Salary, are sent to <a href="https://incometax.ch/" target="_blank" rel="noopener noreferrer">IncomeTax.ch</a> to fetch the net income. Additionally, we retrieve current prices for utilities like electricity, petrol, and diesel.</li>
                            <li><strong>Personal Research:</strong> Our estimates for Housing Costs are derived from in-depth research on platforms like Comparis and Homegate. We also analyze various platforms to provide estimates for Health Insurance, Public Transport, Phone Plans, and more.</li>
                            <li><strong>Personal Assessment:</strong> For categories such as Food, Clothing, and Entertainment & Leisure, we use personal judgment based on general spending habits observed within Swiss cantons.</li>
                        </ul>
                        <p>
                            Transparency in our calculations is of utmost importance. While our estimates aim to be accurate, we recommend users conduct their own research or seek financial advice for detailed financial planning.
                        </p>
                    </div>
                </div>
                </CSSTransition>


                {/* Feedback Card */}
                <CSSTransition in={true} appear={true} timeout={500} classNames="slide-right">
                <div className="card card-form text-center mb-4">
                    <div className="card-body">
                        <h5 className="mb-3">Your Feedback</h5>
                        <p>
                            Your insights are crucial to us. Kindly share any discrepancies or suggestions you might have.
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="emailInput" className="form-label">Email Address</label>
                                <input type="email" className="form-control" id="emailInput" placeholder="you@example.com" aria-describedby="emailHelp" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="messageInput" className="form-label">Your Message</label>
                                <textarea className="form-control" id="messageInput" rows="3" placeholder="Share your thoughts..." required></textarea>
                            </div>
                            <Button type="submit">Submit</Button>
                        </form>
                    </div>
                </div>
                </CSSTransition>

            </div>
            </>
        );
    }
}

export default About;