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

        const { language } = this.props;

        return (
            <>
                <div className='cards'>


                    {/* Introduction Card */}
                    <CSSTransition in={true} appear={true} timeout={500} classNames="slide-left">
                        <div className="card card-form text-center mb-4">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    {language === 'English' && 'Introduction'}
                                    {language === 'German' && 'Einführung'}
                                    {language === 'Croatian' && 'Uvod'}
                                </h5>
                                <p>
                                    {language === 'English' && `Welcome to SwissCosts, your comprehensive guide to understanding the nuances of living costs across the picturesque Swiss cantons. Designed with precision and user-friendliness at its core, SwissCosts aims to offer residents and potential movers a clear perspective on the financial landscape of Switzerland. Our estimates are meticulously curated from various reliable sources to give you a well-rounded view. However, as with any estimations, the figures presented are approximate and should be used as a general guideline. Our primary goal is to equip you with insights, helping you make informed decisions whether you're considering relocating, planning a trip, or merely curious about the cost of living in Switzerland.`}

                                    {language === 'German' && `Willkommen bei SwissCosts, Ihrem umfassenden Leitfaden zum Verständnis der Feinheiten der Lebenshaltungskosten in den malerischen Schweizer Kantonen. SwissCosts wurde mit Präzision und Benutzerfreundlichkeit entwickelt und soll Einwohnern und potenziellen Umziehenden einen klaren Überblick über die finanzielle Landschaft der Schweiz bieten. Unsere Schätzungen werden sorgfältig aus verschiedenen zuverlässigen Quellen zusammengestellt, um Ihnen einen gut abgerundeten Überblick zu bieten. Wie bei allen Schätzungen sind die angegebenen Zahlen jedoch nur ungefähre Werte und sollten als allgemeine Richtlinie verwendet werden. Unser Hauptziel ist es, Sie mit Erkenntnissen auszustatten, die Ihnen fundierte Entscheidungen ermöglichen, egal ob Sie einen Umzug in Erwägung ziehen, eine Reise planen oder einfach nur neugierig auf die Lebenshaltungskosten in der Schweiz sind.`}

                                    {language === 'Croatian' && `Dobrodošli u SwissCosts, vaš sveobuhvatan vodič za razumijevanje nijansi troškova života diljem slikovitih švicarskih kantona. Dizajniran s preciznošću i jednostavnošću korištenja u svojoj osnovi, SwissCosts cilja ponuditi stanovnicima i potencijalnim doseljenicima jasan pogled na financijski okvir Švicarske. Naše procjene su pažljivo kurirane iz raznih pouzdanih izvora kako bi vam pružile zaokruženu sliku. Međutim, kao i sa svim procjenama, predstavljene brojke su približne i trebale bi se koristiti kao opće smjernice. Naš primarni cilj je opremiti vas uvidima, pomažući vam donositi informirane odluke bilo da razmatrate preseljenje, planirate putovanje ili ste jednostavno znatiželjni o troškovima života u Švicarskoj.`}
                                </p>
                            </div>
                        </div>
                    </CSSTransition>



                    {/* Target Audience Card */}
                    {/* Target Audience Card */}
                    <CSSTransition in={true} appear={true} timeout={500} classNames="slide-right">
                        <div className="card card-form mb-4 ">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    {language === 'English' && 'Target Audience'}
                                    {language === 'German' && 'Zielgruppe'}
                                    {language === 'Croatian' && 'Ciljna Publika'}
                                </h5>
                                <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                    <li>
                                        <strong>
                                            {language === 'English' && 'Locals:'}
                                            {language === 'German' && 'Einheimische:'}
                                            {language === 'Croatian' && 'Lokalci:'}
                                        </strong>
                                        {language === 'English' && ' For Swiss residents looking to understand the financial implications of moving between cantons or making lifestyle adjustments.'}
                                        {language === 'German' && ' Für Schweizer Einwohner, die die finanziellen Auswirkungen eines Umzugs zwischen Kantonen oder einer Lebensstiländerung verstehen möchten.'}
                                        {language === 'Croatian' && ' Za švicarske stanovnike koji žele razumjeti financijske implikacije preseljenja između kantona ili promjene načina života.'}
                                    </li>
                                    <li>
                                        <strong>
                                            {language === 'English' && 'Expatriates:'}
                                            {language === 'German' && 'Ausländer:'}
                                            {language === 'Croatian' && 'Iseljenici:'}
                                        </strong>
                                        {language === 'English' && ' For foreign nationals considering a move to Switzerland, offering a clear perspective on potential living costs.'}
                                        {language === 'German' && ' Für Ausländer, die einen Umzug in die Schweiz in Erwägung ziehen und einen klaren Überblick über die potenziellen Lebenshaltungskosten bieten.'}
                                        {language === 'Croatian' && ' Za strane državljane koji razmatraju preseljenje u Švicarsku, nudeći jasan uvid u potencijalne troškove života.'}
                                    </li>
                                    <li>
                                        <strong>
                                            {language === 'English' && 'Travel Enthusiasts:'}
                                            {language === 'German' && 'Reisebegeisterte:'}
                                            {language === 'Croatian' && 'Putnici:'}
                                        </strong>
                                        {language === 'English' && ' For those planning trips and wanting a glimpse into the cost of short-term stays in different regions.'}
                                        {language === 'German' && ' Für diejenigen, die Reisen planen und einen Einblick in die Kosten für kurzfristige Aufenthalte in verschiedenen Regionen wünschen.'}
                                        {language === 'Croatian' && ' Za one koji planiraju putovanja i žele uvid u troškove kratkoročnih boravaka u različitim regijama.'}
                                    </li>
                                    <li>
                                        <strong>
                                            {language === 'English' && 'Researchers & Analysts:'}
                                            {language === 'German' && 'Forscher & Analysten:'}
                                            {language === 'Croatian' && 'Istraživači i analitičari:'}
                                        </strong>
                                        {language === 'English' && ' Offering data-driven insights into the economic landscape of Swiss cantons.'}
                                        {language === 'German' && ' Bietet datengesteuerte Einblicke in die wirtschaftliche Landschaft der Schweizer Kantone.'}
                                        {language === 'Croatian' && ' Pružanje uvida temeljenih na podacima u ekonomsku sliku švicarskih kantona.'}
                                    </li>
                                </ul>
                                <p>
                                    {language === 'English' && 'SwissCosts provides valuable insights that aid in making informed decisions, whether you\'re contemplating relocation, a vacation, or a lifestyle change.'}
                                    {language === 'German' && 'SwissCosts bietet wertvolle Einblicke, die bei der Entscheidungsfindung helfen, egal ob Sie über eine Umsiedlung, einen Urlaub oder eine Lebensstiländerung nachdenken.'}
                                    {language === 'Croatian' && 'SwissCosts pruža vrijedne uvide koji pomažu u donošenju informiranih odluka, bilo da razmatrate preseljenje, odmor ili promjenu načina života.'}
                                </p>
                            </div>
                        </div>
                    </CSSTransition>



                    {/* Calculations Card */}
                    <CSSTransition in={true} appear={true} timeout={500} classNames="slide-left">
                        <div className="card card-form mb-4">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    {language === 'English' && 'How We Calculate'}
                                    {language === 'German' && 'Wie wir berechnen'}
                                    {language === 'Croatian' && 'Kako računamo'}
                                </h5>
                                <p>
                                    {language === 'English' && `At SwissCosts, our mission is to provide users with a comprehensive and accurate estimation of living costs across Swiss cantons. Our approach is threefold:`}

                                    {language === 'German' && `Bei SwissCosts ist es unsere Mission, den Benutzern eine umfassende und genaue Schätzung der Lebenshaltungskosten in den Schweizer Kantonen zu bieten. Unser Ansatz ist dreifach:`}

                                    {language === 'Croatian' && `U SwissCosts, naša misija je pružiti korisnicima sveobuhvatnu i točnu procjenu troškova života u švicarskim kantonima. Naš pristup je trostruk:`}
                                </p>
                                <ul style={{ listStyleType: 'none', paddingLeft: '15px' }}>
                                    <li>
                                        <strong>
                                            {language === 'English' && 'API Integration:'}
                                            {language === 'German' && 'API-Integration:'}
                                            {language === 'Croatian' && 'API Integracija:'}
                                        </strong>
                                        {language === 'English' && `We leverage APIs for real-time data. For instance, user input details, such as Canton and Gross Salary, are sent to IncomeTax.ch to fetch the net income. Additionally, we retrieve current prices for utilities like electricity, petrol, and diesel.`}

                                        {language === 'German' && `Wir nutzen APIs für Echtzeitdaten. Zum Beispiel werden Benutzereingaben wie Kanton und Bruttogehalt an IncomeTax.ch gesendet, um das Nettoeinkommen abzurufen. Zusätzlich holen wir aktuelle Preise für Versorgungsunternehmen wie Strom, Benzin und Diesel ab.`}

                                        {language === 'Croatian' && `Koristimo API-je za podatke u stvarnom vremenu. Na primjer, detalji koje unosi korisnik, kao što su kanton i bruto plaća, šalju se na IncomeTax.ch kako bi se dobila neto plaća. Osim toga, dohvaćamo trenutačne cijene za komunalne usluge poput električne energije, benzina i dizela.`}
                                        <li>
                                            <strong>
                                                {language === 'English' && 'Personal Research:'}
                                                {language === 'German' && 'Persönliche Recherche:'}
                                                {language === 'Croatian' && 'Osobno istraživanje:'}
                                            </strong>
                                            {language === 'English' && `Our estimates for Housing Costs are derived from in-depth research on platforms like Comparis and Homegate. We also analyze various platforms to provide estimates for Health Insurance, Public Transport, Phone Plans, and more.`}

                                            {language === 'German' && `Unsere Schätzungen für die Wohnkosten basieren auf eingehenden Recherchen auf Plattformen wie Comparis und Homegate. Wir analysieren auch verschiedene Plattformen, um Schätzungen für Krankenversicherungen, öffentliche Verkehrsmittel, Telefonpläne und mehr zu bieten.`}

                                            {language === 'Croatian' && `Naše procjene za troškove stanovanja temelje se na temeljitom istraživanju na platformama poput Comparis i Homegate. Također analiziramo razne platforme kako bismo pružili procjene za zdravstveno osiguranje, javni prijevoz, telefonske planove i još mnogo toga.`}
                                        </li>
                                        <li>
                                            <strong>
                                                {language === 'English' && 'Personal Assessment:'}
                                                {language === 'German' && 'Persönliche Einschätzung:'}
                                                {language === 'Croatian' && 'Osobna procjena:'}
                                            </strong>
                                            {language === 'English' && `For categories such as Food, Clothing, and Entertainment & Leisure, we use personal judgment based on general spending habits observed within Swiss cantons.`}

                                            {language === 'German' && `Für Kategorien wie Lebensmittel, Kleidung und Unterhaltung & Freizeit verwenden wir ein persönliches Urteil, das auf allgemeinen Ausgabegewohnheiten basiert, die in den Schweizer Kantonen beobachtet werden.`}

                                            {language === 'Croatian' && `Za kategorije poput hrane, odjeće i zabave i slobodnog vremena koristimo osobnu procjenu temeljenu na općim navikama trošenja promatranim unutar švicarskih kantona.`}
                                        </li>
                                    </li>
                                </ul>
                                <p>
                                    {language === 'English' && `Transparency in our calculations is of utmost importance. While our estimates aim to be accurate, we recommend users conduct their own research or seek financial advice for detailed financial planning.`}

                                    {language === 'German' && `Transparenz bei unseren Berechnungen ist von größter Bedeutung. Obwohl wir bestrebt sind, genaue Schätzungen abzugeben, empfehlen wir den Benutzern, eigene Recherchen durchzuführen oder finanziellen Rat für eine detaillierte Finanzplanung einzuholen.`}

                                    {language === 'Croatian' && `Transparentnost u našim izračunima od najveće je važnosti. Iako se trudimo da naše procjene budu točne, preporučujemo korisnicima da provode vlastita istraživanja ili traže financijske savjete za detaljno financijsko planiranje.`}
                                </p>
                            </div>
                        </div>
                    </CSSTransition>








                    {/* Feedback Card */}
                    <CSSTransition in={true} appear={true} timeout={500} classNames="slide-right">
                        <div className="card card-form text-center mb-4">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    {language === 'English' && 'Your Feedback'}
                                    {language === 'German' && 'Ihr Feedback'}
                                    {language === 'Croatian' && 'Vaša povratna informacija'}
                                </h5>
                                <p>
                                    {language === 'English' && `Your insights are crucial to us. Kindly share any discrepancies or suggestions you might have.`}

                                    {language === 'German' && `Ihre Einsichten sind für uns von entscheidender Bedeutung. Bitte teilen Sie uns eventuelle Abweichungen oder Vorschläge mit.`}

                                    {language === 'Croatian' && `Vaše spoznaje su nam ključne. Ljubazno podijelite bilo kakve nesuglasice ili prijedloge koje biste mogli imati.`}
                                </p>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="emailInput" className="form-label">
                                            {language === 'English' && 'Email Address'}
                                            {language === 'German' && 'E-Mail-Adresse'}
                                            {language === 'Croatian' && 'E-mail adresa'}
                                        </label>
                                        <input type="email" className="form-control" id="emailInput" placeholder="you@example.com" aria-describedby="emailHelp" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="messageInput" className="form-label">
                                            {language === 'English' && 'Your Message'}
                                            {language === 'German' && 'Ihre Nachricht'}
                                            {language === 'Croatian' && 'Vaša poruka'}
                                        </label>
                                        <textarea className="form-control" id="messageInput" rows="3" placeholder={
                                            language === 'English' && "Share your thoughts..." ||
                                            language === 'German' && "Teilen Sie Ihre Gedanken..." ||
                                            language === 'Croatian' && "Podijelite svoje misli..."
                                        } required></textarea>
                                    </div>
                                    <Button type="submit">
                                        {language === 'English' && 'Submit'}
                                        {language === 'German' && 'Senden'}
                                        {language === 'Croatian' && 'Pošalji'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </CSSTransition>

                </div >
            </>
        );
    }
}

export default About;