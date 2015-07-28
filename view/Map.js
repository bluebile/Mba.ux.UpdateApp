Ext.define('Mba.ux.Geolocation.view.Map', {
    extend: 'Ext.Map',

    xtype: 'mba-map',

    config: {
        latitude: -15.127750417479298,
        longitude: -53.18050174999996,
        markerMe: 'resources/img/map-marker-me.gif',
        markerPosicaoAtual: null,
        paintMapMarkers: Ext.emptyFn,
        width: '100%',
        height: '100%',
        //Não pode chamar aqui porque o google ainda não carregou!
        // mapOptions: {
        //     center: new google.maps.LatLng(this.getLatitude(), this.getLongitude()),
        //     zoom: 4,
        //     mapTypeId: google.maps.MapTypeId.ROADMAP,
        //     mapTypeControl: false,
        //     streetViewControl: false,
        //     overviewMapControl: false,
        //     zoomControl: Ext.os.deviceType === 'Desktop' ? true: false
        // },

        listeners: {
            maprender: function(comp, map) {
            	var me = this;
            	// Centralizando o mapa.
                // comp.getMap().panTo(new google.maps.LatLng(-15.127750417479298, -53.18050174999996));
                // comp.getMap().setZoom(4);
                if (navigator.geolocation && this.getMarkerMe()) {
    	            navigator.geolocation.getCurrentPosition(function(position) {

    	                var imagePosicaoAtual =
    	                    new google.maps.MarkerImage(this.getMarkerMe(),
    	                        null, null, null, new google.maps.Size(30,30)),

    	                    posicaoAtual = new google.maps.LatLng(
    	                        position.coords.latitude,
    	                        position.coords.longitude
    	                    );

    	                me.setMarkerPosicaoAtual(new google.maps.Marker({
    		                    position: posicaoAtual,
    		                    title: 'Localização atual',
    		                    icon: imagePosicaoAtual,
    		                    optimized: false,
    		                    map: comp.getMap()
    	                	})
    	                );
    	            }, function(error) {
    	                Ext.Msg.alert(null, 'Não foi possível recuperar a sua posição atual.', Ext.emptyFn);
    	            });
    	        }
    	        me.config.paintMapMarkers();
            }
        }
    }

});