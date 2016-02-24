var transit = [];
var shrug = "¯\\_(ツ)_/¯";
var city_temp, route_temp, status_temp;
var end = false;

var CITY = $('#city');
var ROUTE = $('#route');
var LATE = $('#late');

function parse_bookmark() {
    //retrieve params to allow bookmarking
    //of specific route
    //var u = window.location.href;
}

function detailed_status(route_number) {
    var ctx = {
        shrug: shrug,
        stamp: new Date()
    };
    var status_html = status_temp(ctx);
    LATE.html(status_html);
}

function build_city_picker() {
    var ctx = {
        cities: []
    };
    for (var i = 0; i < transit.length; i++) {
        //console.log("City: " + transit[i].name);
        ctx.cities.push({
            id: i,
            name: transit[i].name
        });
    }
    var city_html = city_temp(ctx);
    CITY.html(city_html);
    ROUTE.html('');
    LATE.html('');
}

function build_route_picker(city_id) {
    var ctx = {
        routes: []
    };
    console.log("Process City Number: " + city_id);
    console.log("Showing routes for: " + transit[city_id].name);
    console.log("Routes: "+ transit[city_id].routes);
    for (var i = 0; i < transit[city_id].routes.length; i++) {
        //console.log("City: " + transit[i].name);
        ctx.routes.push({
            id: i,
            name: transit[city_id].routes[i]
        });
    }
    var route_html = route_temp(ctx);
    ROUTE.html(route_html);
    LATE.html('');
}

function pick_city() {
    build_route_picker($('#citysel').val());
}

function get_city_data() {
    $.getJSON('systems.json', function(data) {
        transit = data;
        build_city_picker();
    });
}

function compile_templates() {
    var city_source = $('#system-selector').html();
    var route_source = $('#route-selector').html();
    var status_source = $('#status').html();

    city_temp = Handlebars.compile(city_source);
    route_temp = Handlebars.compile(route_source);
    status_temp = Handlebars.compile(status_source);
}

$(document).ready(function() {
    get_city_data();
    compile_templates();
});
