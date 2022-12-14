function InfoComponent() {
    return (
        <>
            <h1>Käyttöohjeet:</h1>
            <p>
                Ajanhallintasovellusta voit käyttää erilaisten aktiviteettien
                seuraamiseen.
            </p>
            <h3>Sivulla navigointi:</h3>
            <p>
                Sivulla voit navigoida käyttämällä kolmea ylhäällä olevaa
                nappia.<br></br>Main Page-näppäin vie sinut päänäkymään, jossa
                pystyt käyttämään ajanhallintasovellusta.
                <br></br>Stats-näppäin vie sinut näkymään, josta voit nähdä
                tietoa lisäämistäsi aktivitiiteista.
                <br></br>Info-näppäin tuo sinut tähän näkymään.
            </p>
            <h3>Uuden aktiviteetin lisääminen</h3>
            <p>
                Voit lisätä uuden aktiviteetin järjestelmään "Add a new
                activity:"-otsikon alla olevilla napeilla.
                <br></br>Voit kirjoittaa aktiviteetin nimen, kontekstit ja
                niiden määrän, sekä antaa aktiviteettiin käytetyn ajan. Jos
                haluat kirjata aktiviteetin ennen kuin olet käyttänyt siihen
                aikaa, voit jättää aikaan viittaavat kohdat nollille.
            </p>
            <h3>Ajan lisääminen aktivitiitteihin.</h3>
            <p>
                Jos haluat tehdä jostain tietystä aktivitiitista aktiivisen,
                voit valita haluamasi aktiviteetin "Start timer:"-tekstin
                alapuolella löytyvästä valikosta ja painaa "Start
                timer"-painiketta.
                <br></br>
                "Start timer"-painiketta painamalla kyseisestä aktiviteetista
                tulee aktiivinen, ja "Start timer"-painike muuttuu "Stop
                timer"-painikkeeksi.
                <br></br>
                Kun painat "Stop timer"-painiketta, sovellus lopettaa ajan
                laskemisen ja lisää kuluneen ajan valitsemallesi aktiviteetille.
                <br></br>
                Voit myös lisätä aikaa "Edit existing activities"-otsikon
                alapuolella löytyvästä painikkeesta: "Add time to an existing
                activity"
                <br></br>
                Painikkeesta painamalla saat uuden valikon auki josta voit
                lisätä aikaa haluamaasi aktiviteettiin. Lisääminen tapahtuu
                "Submit"-painikkeella.
            </p>
            <h3>Konteksti-asetukset</h3>
            <p>
                "Context settings:"-alaotsikon alta löytyy kaksi nappia.
                Molemmat näistä avaavat oman valikon painaessa.
                <br></br>
                "Add new context"-painike lisää uuden kontekstin tietokantaan,
                jonka jälkeen sitä voi käyttää aktiviteeteissa.
                <br></br>
                "Delete an existing context"-painike poistaa valitsemasi
                kontekstin tietokannasta ja jokaisesta siihen viittaavasta
                aktiviteetista.
            </p>
            <h3>Aktiviteettien poistaminen</h3>
            <p>
                Voit poistaa aktiviteetteja tietokannasta "Edit existing
                activities:"-alaotsikon alla löytyvästä painikkeesta, jossa
                lukee "Delete existing activity"
            </p>
            <h3>Stats-näkymä</h3>
            <p>
                Stats-näkymässä näet aktiviteettisi ja niihin käytetyn ajan.
                Näkymään tultaessa kaikki aktiviteetit ovat näkyvissä, mutta
                voit alavalikosta muokata näkymää niin, että vain tiettyyn
                kontekstiin liityvät aktiviteetit ovat näkyvissä.
            </p>
            <br></br>
            <br></br>
            <h1>Työssä käytetyt ulkoinen materiaali:</h1>
            <p>Ei käytetty ulkoista materiaalia.</p>
            <br></br>
            <br></br>
            <h2>Tekijä: Masi Soranummi</h2>
        </>
    );
}

export default InfoComponent;
