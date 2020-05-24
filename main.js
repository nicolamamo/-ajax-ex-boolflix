$('#tasto').click(){

    var query = $('.cerca').val();



//CHIAMATA AJAX
$.ajax ({

  url: "https://api.themoviedb.org/3/search/movie",
  data : {
      api_key : "5a8d10395cbc81449d13da7027ca58cc",
      query : query
    },
  method: "GET",
  success: function(data) {

    var results = data.response;

    for (var i = 0; i < dati.length; i++) {

      var dati = dati[i];
      var title = dati.titolo;
      var original_title = dati.originalTitle;
      var voto_medio = dati.vote;


        var context = {
      titolo:title,
      originalTitle:original_title,
      vote:voto_medio,
      };

        var source = $("#film-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        $(".film-container").append(html);

    }
  },
  error: function() {

    alert("errore");
  }
})
}
