module.exports = function (app) {

  var Internal = {}
  var Query = {};

  Query.defaultParams = {
  }

  Query.timeseries = function (params) {

    return [
      {
        id: 'timeseries_go',
        sql: "select data, sum(confirmados) as confirmados, sum(suspeitos) as suspeitos, sum(obitos) as obitos , sum(descartados) as descartados from casos where cd_geocmu <> '52' AND cd_geocmu <> '5300108' group by data order by data;"
      },
      {
        id: 'timeseries_cities',
        sql: "select true"
      }
     

    ];
  }

  Query.states = function (params) {
  
    return  "select uf , max(total_casos) as total_casos from casos_estados where cd_geouf <> '1058' group by uf order by 2 desc"           
    
  }
  
  Query.cities = function (params) {

    return [
        {
          id: 'ranking_municipios',
          sql: "SELECT nome, cd_geocmu, confirmados_total as confirmados, rank FROM v_ranking_municipios_go"           
        },
        {
          id: 'next',
          sql: "select true"
        }
    ]

  }
  
  Query.projections = function(params) {

    return [
      {
        id: 'confirmados_recuperados',
        sql: "SELECT data, confirmados, recuperados FROM projecao_casos_go where data >= now() - interval '1' day AND data <= now() + interval '5' day order by data;"
      },
      {
        id: 'next',
        sql: "select true"
      }
    
    ]
  }

  return Query;

};