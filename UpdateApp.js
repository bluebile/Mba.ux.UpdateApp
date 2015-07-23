Ext.define('Mba.ux.UpdateApp', {
    extend: 'Ext.Evented',

    requires: ['Ext.MessageBox'],

    mixins: [
        'Mba.ux.BuilderConfig.mixin.BuilderConfig'
    ],

    config: {
        plist: '',
        currentVersion: ''
    },

    load: function() {
        var me = this;
        Ext.Ajax.request({
            async: false,
            url: this.getPlist(),
            success: function(res) { 
                var xmlDoc = null, parser, thisNode, current, xpto;
                if (window.DOMParser) {
                    parser = new DOMParser();
                    xmlDoc = parser.parseFromString(res.responseText, 'text/xml');
                } else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(res.responseText);
                }
                xmlDoc = me.selectXPath('plist/dict/array/dict/dict', xmlDoc);
                thisNode = xmlDoc.next();

                for(var i=0; i< thisNode.childNodes.length ; i++) {
                    if (thisNode.childNodes[i].nodeType == 3) {
                        x= i+1;
                    }
                    if (thisNode.childNodes[i].textContent == 'bundle-version') {
                        xpto = thisNode.childNodes[++i].nodeType == 3;
                        current = thisNode.childNodes[i];
                        while(xpto) {
                            current = thisNode.childNodes[++i]; 
                            xpto = current.nodeType == 3;
                        }
                        me.verifyAppVersion(current.textContent);
                    }
                }
            }
        });
    },

    verifyAppVersion: function(versionPlist) {
        var me = this;
        var currentVersion = new Ext.Version(this.getCurrentVersion());
        if (currentVersion.isLessThan(versionPlist)) {
            Ext.Msg.confirm(null,
                'Uma nova versão do aplicativo foi encontrada. Deseja fazer o download?', function(answer) {
                    if (answer == 'sim') {
                        window.open('itms-services://?action=download-manifest&url=' + me.getPlist(), '_blank');
                    }
                }
            );
        }
    },

    selectXPath: function(expr, node) {
        if (document.evaluate) {
            return {
                list : node.evaluate(expr,node,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),
                next : function() { 
                    return this.list.iterateNext()
                }
            }
        } else {
            return {
                list: node.selectNodes(expr),
                i : 0,
                next: function() {
                    if (this.i > this.list.length) {
                        return null;
                    }
                    return this.list[this.i++];
                }
            }
        }
    }
});
