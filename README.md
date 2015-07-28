# Plugin para o carregamento e utilização do Google Maps com o Sencha Touch


## Utilização

```js
Ext.application({
    ...

    requires: [
        ...
        'Mba.ux.Environment.overrides.*',
        'Mba.ux.Geolocation'
        ...
    ],

    launch: function() {
        ...

        //Variável google ainda não carregou!
        // Ext.create('Mba.ux.Geolocation.view.Map', {
        //     mapOptions: {
        //         center: new google.maps.LatLng(this.getLatitude(), this.getLongitude()),
        //         zoom: 4,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP,
        //         mapTypeControl: false,
        //         streetViewControl: false,
        //         overviewMapControl: false,
        //         zoomControl: Ext.os.deviceType === 'Desktop' ? true: false
        //     }
        // });

        ...

 	}
```

## Contato

<info@bluebile.com>