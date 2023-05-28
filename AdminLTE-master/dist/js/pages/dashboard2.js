$(function () {
  'use strict'

  //-----------------------
  // - MONTHLY SALES CHART -
  //-----------------------

  // Get context with jQuery - using jQuery's .get() method.
  var salesChartCanvas = $('#salesChart').get(0).getContext('2d')

  var salesChartData = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Digital Goods',
        backgroundColor: 'rgba(60,141,188,0.9)',
        borderColor: 'rgba(60,141,188,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: []
      },
      {
        label: 'Electronics',
        backgroundColor: 'rgba(210, 214, 222, 1)',
        borderColor: 'rgba(210, 214, 222, 1)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: []
      }
    ]
  }

  var salesChartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  }

  Promise.all([
    fetch('https://api.thingspeak.com/channels/1956370/fields/2.json?results=6'),
    fetch('https://api.thingspeak.com/channels/1956370/fields/3.json?results=6')
  ])
    .then(function(responses) {
      return Promise.all(responses.map(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Erro na requisição à API');
      }));
    })
    .then(function(data) {
      var field2Data = data[0].feeds.map(function(feed) {
        return parseInt(feed.field2);
      });

      var field3Data = data[1].feeds.map(function(feed) {
        return parseInt(feed.field3);
      });

      console.log

      salesChartData.datasets[0].data = field2Data;
      salesChartData.datasets[1].data = field3Data;

      var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: salesChartData,
        options: salesChartOptions
      });
    })
    .catch(function(error) {
      console.error('Erro na requisição à API:', error);
    });


  /*
  // Fazer a requisição à API para obter os dados
  fetch('https://api.thingspeak.com/channels/1956370/fields/2,3.json?results=6')
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Erro na requisição à API');
    })
    .then(function(data) {
      // Extrair os valores do campo 1 da resposta da API
      var field3Data = data.feeds.map(function(feed) {
        return parseInt(feed.field3);
      })
      // Atualizar os dados do gráfico com os valores da resposta da API
      salesChartData.datasets[0].data = field3Data;
      salesChartData.datasets[1].data = field2Data;

      // Criar o gráfico com os novos dados
      var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: salesChartData,
        options: salesChartOptions
      });
    })
    .catch(function(error) {
      // Tratar erros na requisição à API
      console.error('Erro na requisição à API:', error);
    });
*/

});
