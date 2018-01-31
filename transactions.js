const driver = require('bigchaindb-driver')
const hexToBinary = require('hex-to-binary')
var _bs = require('bs58');
const util = require('util')


const API_PATH = 'https://test.bigchaindb.com/api/v1/'

const alice = new driver.Ed25519Keypair()

var publicInner ="ErrnYeJSZP6dybKSNMZCEpnzYN8L1cCfk22TPcPaSfVw"
var privateInner ="551SwNxgSEWyT2b65HvUyDj4SK54Y7NXpCNkKiUJN2tS"
var publicBuf = (_bs.decode(publicInner))
var privateBuf = (_bs.decode(privateInner))

var privateData = privateBuf.toString('binary');
var privateHex = new Buffer(privateData, 'ascii').toString('hex');

var publicData = publicBuf.toString('binary');
var publicHex = new Buffer(publicData, 'ascii').toString('hex');

console.log(publicHex)
console.log(privateHex)
const tx = driver.Transaction.makeCreateTransaction(
    { AssetKey: "AssetValue" },
    { MetaDataKey: "MetaDataValue" },
    [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(publicInner))
    ],
    publicInner
)

const txSigned = driver.Transaction.signTransaction(tx, privateInner)
console.log(util.inspect(txSigned, {showHidden: false, depth: null}))

const conn = new driver.Connection(API_PATH, { 
    app_id: 'b1d63ff3',
    app_key: '29913c6deb7ee2bd0709d6af3b382b44'
})
conn.postTransaction(txSigned)
    .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => console.log('\r\n********\r\nRetrive TX : ', util.inspect(retrievedTx, {showHidden: false, depth: null}), "\r\n*****\r\n"))
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))

