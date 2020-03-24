var fs = require("fs");
var languageJson = require('../assets/lang/language.json');
var path = require('path');

module.exports = function (app) {
  var Controller = {};
  var Internal = {};

  var client = app.database.client;
  var queries = app.database.queries.map;

  Internal.filterLanguage = function filterItems(query, array) {
    return array.filter(function(el) {
      if(el[0] === query){
        return el[1];
      }
    })
  };

  Controller.extent = function (request, response) {
    var queryResult = request.queryResult;

    var result = {
      type: "Feature",
      geometry: JSON.parse(queryResult[0].geojson),
      area_mun: queryResult[0].area_mun
    };

    response.send(result);
    response.end();
  };

  Controller.descriptor = function (request, response) {

    var language = request.param('lang')

    var result = {
      regionFilterDefault: "uf = 'GO'",
      type: languageJson["descriptor"]["type_of_information_label"][language],
      groups: [
        {
          id: "informacoes",
          label: languageJson["descriptor"]["informacoes"]["label"][language],
          group_expanded: true,
          layers:[{
            id: "casos_covid_confirmados",
            label: languageJson["descriptor"]["informacoes"]["layers"]["casos_covid_confirmados"]["label"][language],
            visible: true,
            selectedType:"covid19_municipios_casos",
            types:[{
              value: "covid19_municipios_casos",
                Viewvalue: languageJson["descriptor"]["informacoes"]["layers"]["casos_covid_confirmados"]["types"]["covid19_municipios_casos"]["view_value"][language],
                regionFilter: true,
                opacity: 0.8,
                order: 3
            }]
          },
          {
            id: "qtd_populacional",
            label: languageJson["descriptor"]["informacoes"]["layers"]["qtd_populacional"]["label"][language],
            visible: false,
            selectedType:"ibge_populacao",
            types:[{
              value: "ibge_populacao",
                Viewvalue: languageJson["descriptor"]["informacoes"]["layers"]["qtd_populacional"]["types"]["ibge_populacao"]["view_value"][language],
                regionFilter: true,
                opacity: 0.8,
                order: 3
            }]
          }
        ]
        },
        {
          id: "infraestrutura",
          label: languageJson["descriptor"]["infraestrutura"]["label"][language],
          group_expanded: false,
          layers: [{
              id: "osm_rodovias",
              label: languageJson["descriptor"]["infraestrutura"]["layers"]["osm_rodovias"]["label"][language],
              visible: false,
              metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['osm_rodovias']['metadata'],
              selectedType: "osm_rodovias",
              types: [{
                value: "osm_rodovias",
                Viewvalue: "Open Street Map",
                regionFilter: true,
                opacity: 0.8,
                order: 3
              }]
            },
            {
              id: "armazens",
              label: languageJson["descriptor"]["infraestrutura"]["layers"]["armazens"]["label"][language],
              visible: false,
              metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['armazens']['metadata'],
              selectedType: "armazens_fip",
              types: [{
                value: "armazens_fip",
                Viewvalue: "CONAB / LAPIG-UFG",
                regionFilter: true,
                opacity: 0.8,
                order: 3
              }]
            }
            // {
            //   id: "frigorificos",
            //   label: languageJson["descriptor"]["infraestrutura"]["layers"]["frigorificos"]["label"][language],
            //   visible: false,
            //   metadata: languageJson["descriptor"]["infraestrutura"]["layers"]['frigorificos']['metadata'],
            //   selectedType: "armazens_fip",
            //   selectedType: "matadouros_e_frigorificos",
            //   types: [{
            //     value: "matadouros_e_frigorificos",
            //     Viewvalue: "LAPIG",
            //     regionFilter: true,
            //     opacity: 0.8,
            //     order: 3
            //   }]
            // }
          ]
        },
        // {
        //   id: "imagens",
        //   label: languageJson["descriptor"]["imagens"]["label"][language],
        //   group_expanded: false,
        //   layers: [{
        //     id: "satelite",
        //     label: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["label"][language],
        //     visible: false,
        //     selectedType: "landsat",
        //     types: [{
        //         value: "landsat",
        //         Viewvalue: "Landsat",
        //         order: 10,
        //         opacity: 1,
        //         metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['landsat']['metadata'],
        //         timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
        //         timeSelected: "bi_ce_mosaico_landsat_completo_30_2019_fip",
        //         timeHandler: "layername",
        //         times: [{
        //             value: "bi_ce_mosaico_landsat_completo_30_2000_fip",
        //             Viewvalue: "2000"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2002_fip",
        //             Viewvalue: "2002"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2004_fip",
        //             Viewvalue: "2004"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2006_fip",
        //             Viewvalue: "2006"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2008_fip",
        //             Viewvalue: "2008"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2010_fip",
        //             Viewvalue: "2010"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2012_fip",
        //             Viewvalue: "2012"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2013_fip",
        //             Viewvalue: "2013"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2014_fip",
        //             Viewvalue: "2014"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2015_fip",
        //             Viewvalue: "2015"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2016_fip",
        //             Viewvalue: "2016"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2017_fip",
        //             Viewvalue: "2017"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2018_fip",
        //             Viewvalue: "2018"
        //           },
        //           {
        //             value: "bi_ce_mosaico_landsat_completo_30_2019_fip",
        //             Viewvalue: "2019"
        //           }
        //         ]
        //       },
        //       {
        //         value: "sentinel",
        //         Viewvalue: "Sentinel",
        //         order: 10,
        //         opacity: 1,
        //         metadata: languageJson["descriptor"]["imagens"]["layers"]['satelite']['sentinel']['metadata'],
        //         timeLabel: languageJson["descriptor"]["imagens"]["layers"]["satelite"]["timelabel"][language],
        //         timeSelected: "bi_ce_mosaico_sentinel_10_2018_lapig",
        //         timeHandler: "layername",
        //         times: [{
        //             value: "bi_ce_mosaico_sentinel_10_2016_lapig",
        //             Viewvalue: "2016"
        //           },
        //           {
        //             value: "bi_ce_mosaico_sentinel_10_2017_lapig",
        //             Viewvalue: "2017"
        //           },
        //           {
        //             value: "bi_ce_mosaico_sentinel_10_2018_lapig",
        //             Viewvalue: "2018"
        //           }
        //         ]
        //       }
        //     ]
        //   }]
        // }
      ],
      basemaps: [{
        id: "basemaps",
        defaultBaseMap: "mapbox",
        types: [
          {
            value: "estradas",
            viewValue: languageJson["descriptor"]["basemaps"]["types"]["estradas"][language],
            visible: true
          },
          {
            value: "mapbox",
            viewValue: languageJson["descriptor"]["basemaps"]["types"]["mapbox"][language],
            visible: false
          },
          {
            value: "satelite",
            viewValue: languageJson["descriptor"]["basemaps"]["types"]["satelite"][language],
            visible: false
          },
          {
            value: "relevo",
            viewValue: languageJson["descriptor"]["basemaps"]["types"]["relevo"][language],
            visible: false
          }
        ]
      }],
      limits: [{
        id: "limits",
        types: [
          {
            value: "municipios_goias",
            Viewvalue: languageJson["descriptor"]["limits"]["types"]["municipios_goias"][language],
            visible: true,
            layer_limits: true,
            opacity: 1
          }
        ],
        selectedType: "municipios_goias"
      }]
    };

    response.send(result);
    response.end();
  };


  Controller.titles = function (request, response) {

    var language = request.param('lang')

    var jsonPath = path.join(__dirname, '..', 'assets', 'lang', 'language.json');
    var languageFile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    var dialogJsonMiniReport = languageFile["mini_report_utfgrid"];
    var keysUTF = {};

    Object.keys(dialogJsonMiniReport).forEach(function (key, index) {
      keysUTF[key] = key[language]
    });

    var resultUTF = {};
    Object.keys(keysUTF).forEach(function (key, index) {

      if (dialogJsonMiniReport[key].hasOwnProperty("pt-br")) {
        resultUTF[key] = dialogJsonMiniReport[key][language]
      }
    });

    var jsonLayerBox = languageFile["layer_box"]
    var keysLayerBox = {};

    Object.keys(jsonLayerBox).forEach(function (key, index) {
      keysLayerBox[key] = key[language]
    });

    var resultLayerBox = {};
    Object.keys(keysLayerBox).forEach(function (key, index) {

      if (jsonLayerBox[key].hasOwnProperty("pt-br")) {
        resultLayerBox[key] = jsonLayerBox[key][language]
      }
    });

    var result = {
      legendTitle: languageFile["legends_box_title"][language],
      utfgrid: resultUTF,
      layer_box: resultLayerBox,
      descriptor: languageFile["descriptor"]

    };

    response.send(result);
    response.end();
  };



  Controller.textreport = function (request, response) {
    var language = request.param('lang')

    var jsonPath = path.join(__dirname, '..', 'assets', 'lang', 'language.json');
    var languageFile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    var dialogJson = languageFile["dialog_relatorio"];

    var keys = {};

    Object.keys(dialogJson).forEach(function (key, index) {
      keys[key] = key
    });

    var result = {};
    Object.keys(keys).forEach(function (key, index) {

      if (dialogJson[key].hasOwnProperty("pt-br")) {
        result[key] = dialogJson[key][language]
      } else {
        result[key] = dialogJson[key]
        Object.keys(dialogJson[key]).forEach(function (key2, index) {
          result[key][key2] = dialogJson[key][key2][language]
        });
      }
    });

    response.send(result);
    response.end();

  };


  return Controller;
};