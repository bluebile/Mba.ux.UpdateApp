# Plugin javascript para a atualização de aplicativos enterprise (iOS)


## Utilização

### Pode ser utilizado em conjunto com o componente BuilderConfig, da seguinte maneira:

```js
Ext.application({
    ...
    beforeInitConfig: function() {
        var json;
        Ext.require([ 'Mba.ux.Environment.overrides.BuilderConfig' ], function() {
            json = Ext.create('Mba.ux.BuilderConfig.loader.Json', {
                files: {
                    ...
                    "updateapp":       'resources/globals/updateapp.js',
                    ...
                }
            });

            Mba.ux.BuilderConfig.setData(json);
        });
    },

    ...

    launch: function() {
        selectTranslate(navigator.language)();
        var update = Ext.create('Mba.ux.UpdateApp');
        update.load();
     	...

 	}
```

#### O layout do arquivo updateapp.js:

```json
{
	plist: 'https://dl.dropboxusercontent.com/u/ProjetoArquitetura.plist',
	currentVersion: "3.0.0"
}
```

### Pode ser utilizado também como config:

```js
Ext.application({
    ...

    launch: function() {
        selectTranslate(navigator.language)();
        var update = Ext.create('Mba.ux.UpdateApp', {
            plist: 'https://package.url.projetc/ProjectName.plist',
            currentVersion: "3.0.0"
        });
        update.load();
     	...
 	}
```

## Atenção: Deve ser utilizado o locale para o correto funcionamento do alert com a mensagem de atualização.


## Contato

<info@bluebile.com>