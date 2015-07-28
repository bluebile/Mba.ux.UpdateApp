Ext.define('Mba.ux.Geolocation', {
    extend: 'Ext.Evented',

    requires: ['Ext.util.DelayedTask', 'Mba.ux.Geolocation.view.Map'],

    singleton: true,

    config: {
        mapsCarregado: false,
        mapsCarregando: false,
        mapaControllerCarregado: false
    },

    initialize: function() {
        this.callParent();
        document.addEventListener('resume', Ext.Function.bind(this.verifyMapLoaded, this), false);
        this.setMapaControllerCarregado(true);
        var me = this,
            task = Ext.create('Ext.util.DelayedTask', function() {
                this.carregarMapa();
            },
            me
        );

        task.delay(100);
    },

    verifyMapLoaded: function() {
        if (this.getMapsCarregando() || (this.getMapaControllerCarregado() && !this.getMapsCarregado())) {
            this.carregarMapa();
        }
    },

    carregarMapa: function() {
        if (this.isConnected()) {
            if(document.getElementById('scriptMapa')) {
                return;
            }
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.id = 'scriptMapa';
            script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&language=pt_BR&' + 'callback=Mba.ux.Geolocation.googleMapsCarregado';
            document.body.appendChild(script);
        }
    },

    googleMapsCarregado: function() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'vendor/ux/Mba.ux.Geolocation/resources/markercluster.js';
        document.body.appendChild(script);

        this.mapsCarregado = true;
        //Talvez alguma ação aqui.
    },

    isConnected: function() {
        if (navigator.network) {
            var networkState = navigator.network.connection.type;
            
            if (networkState == Connection.UNKNOWN || networkState == Connection.NONE) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

});
