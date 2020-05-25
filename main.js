$(document).ready(function() {

    // preparo le variabili per handlebars
    var template_html = $('#film-template').html();
    var template = Handlebars.compile(template_html);

    // intercetto i tasti del campo di testo
    $('#testo-ricerca').keyup(function(event) {
        if(event.which == 13) {
            // l'utnete ha premuto INVIO
            ricerca();
        }
    });

    // intercetto il click sul pulsante di ricerca
    $('#tasto').click(function() {
            ricerca();
    });

    // funzione per effettuare una ricerca a tmdb
    function ricerca() {
        // recupero il testo inserito dall'utente
        var testo_utente = $('#testo-ricerca').val().trim();

        // controllo che l'utente abbia digitato qualcosa
        if(testo_utente.length > 1) {
            reset_risultati();
            // faccio partire la chiamata ajax
            $.ajax({
                'url': 'https://api.themoviedb.org/3/search/movie',
                'method': 'GET',
                'data': {
                    'api_key': 'c4a5d0f9204fe8ed8998978f4fb5f4c2',
                    'query': testo_utente,
                    'language': 'it'
                },
                'success': function(risposta) {
                    // inserisco il testo cercato dall'utente nel titolo della pagina
                    $('#ricerca-utente').text(testo_utente);
                    // visualizzo il titolo della pagina
                    $('.titolo-ricerca').addClass('visible');

                    // recupero i risultati della ricerca
                    var risultati = risposta.results;
                    // ciclo su tutti i risultati
                    for (var i = 0; i < risultati.length; i++) {
                        // recupero il risultato corrente
                        var risultato_corrente = risultati[i];
                        disegna_card(risultato_corrente);
                    }
                },
                'error': function() {
                    console.log('errore');
                }
            });
        } else {
            // l'utente ha digitato meno di 2 caratteri
            alert('devi digitare almeno 2 caratteri');
        }
    }

    // funzione per resettare la pagina e prepararla all'inserimento di nuovi risultati
    function reset_risultati() {
        // resetto l'input testuale
        $('#testo-ricerca').val('');
        // nascondo il titolo della pagina
        $('.titolo-ricerca').removeClass('visible');
        // svuoto il contenitore dei risultati
        $('#risultati').empty();
        // $('#risultati .card').remove();
        // $('#risultati').html('');
    }

    // funzione per appendere una card ai risultati
    function disegna_card(dati) {
        // preparo i dati per il template
        var placeholder = {
            'titolo': dati.title,
            'titolo_originale': dati.original_title,
            'lingua': dati.original_language,
            'voto': dati.vote_average
        };
        var html_card = template(placeholder);
        // appendo la card con i dati del risultato corrente
        $('#risultati').append(html_card);
    }

});
