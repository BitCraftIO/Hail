const electrumClient = require('electrum-client');

// default server list from
// https://github.com/spesmilo/electrum/blob/afa1a4d22a31d23d088c6670e1588eed32f7114d/lib/network.py//L57
const DEFAULT_PORTS = { 't': '50001', 's': '50002' }
DEFAULT_SERVERS = {
    'erbium1.sytes.net': DEFAULT_PORTS,                  // core, e-x
    'ecdsa.net': { 't': '50001', 's': '110' },               // core, e-x
    'gh05.geekhosters.com': DEFAULT_PORTS,               // core, e-s
    'VPS.hsmiths.com': DEFAULT_PORTS,                    // core, e-x
    'electrum.anduck.net': DEFAULT_PORTS,                // core, e-s; banner with version pending
    'electrum.no-ip.org': DEFAULT_PORTS,                 // core, e-s
    'electrum.be': DEFAULT_PORTS,                        // core, e-x
    'helicarrier.bauerj.eu': DEFAULT_PORTS,              // core, e-x
    'elex01.blackpole.online': DEFAULT_PORTS,            // core, e-x
    'electrumx.not.fyi': DEFAULT_PORTS,                  // core, e-x
    'node.xbt.eu': DEFAULT_PORTS,                        // core, e-x
    'kirsche.emzy.de': DEFAULT_PORTS,                    // core, e-x
    'electrum.villocq.com': DEFAULT_PORTS,               // core?, e-s; banner with version recommended
    'us11.einfachmalnettsein.de': DEFAULT_PORTS,         // core, e-x
    'electrum.trouth.net': DEFAULT_PORTS,                // BU, e-s
    'Electrum.hsmiths.com': { 't': '8080', 's': '995' },     // core, e-x
    'electrum3.hachre.de': DEFAULT_PORTS,                // core, e-x
    'b.1209k.com': DEFAULT_PORTS,                        // XT, jelectrum
    'btc.smsys.me': { 't': '110', 's': '995' },              // BU, e-x
}

/**
 * This class handles interfacing with a remote Electrum server over JSON-RPC.
 * It has support for both long-running connections and sending one-off messages.
 * 
 * For now, all API functionality is passed through `Electrum.client` and follows the API
 * at https://github.com/BitCraftIO/node-electrum-client/blob/master/lib/electrum_client.js
 */
export default class Electrum {
    constructor() {
        this.server = s = Electrum.getRandomServer()
        this.client = new electrumClient(s.port, s.hostname, s.protocol)
        this.client.connect().then(() => console.log('Electrum connection established with ' + s.hostname))
            .catch((e) => { throw new Error('Could not establish an Electrum connection') })
    }

    /**
     * Returns an appropriate hostname, port, and protocol to use when establishing a new connection.
     * Detects if `tls` is available and if so makes use of it.
     */
    static getRandomServer() {
        try {
            require.resolve('tls')
            secure = true
        } catch (e) { // no TLS support
            secure = false
        }
        hostnames = Object.keys(DEFAULT_SERVERS)
        hostname = hostnames[Math.floor(Math.random() * hostnames.length)]
        port = secure ? DEFAULT_SERVERS[hostname].s : DEFAULT_SERVERS[hostname].t
        protocol = secure ? 'tls' : 'tcp'
        return { hostname, port, protocol, secure }
    }
}