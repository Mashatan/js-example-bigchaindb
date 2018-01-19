const driver = require('bigchaindb-driver')
const hexToBinary = require('hex-to-binary')
var _bs = require('bs58');

// BigchainDB server instance or IPDB (e.g. https://test.ipdb.io/api/v1/)
const API_PATH = 'https://test.bigchaindb.com/api/v1/'

// Create a new keypair.
const alice = new driver.Ed25519Keypair()

var publicInner ="CRPj1bAnxrsSeBtRo9QKHkJzxFRD62fDchpLecEnNVEq"
var privateInner ="6WVmvaDmPFQQwVwc39o7eYoymKQLGM8ZTD7FadJsZ6E3"
var publicHex = (_bs.decode(publicInner))
var privateHex = (_bs.decode(privateInner))
console.log(publicHex)
console.log(privateHex)
// Construct a transaction payload
const tx = driver.Transaction.makeCreateTransaction(
    // Define the asset to store, in this example it is the current temperature
    // (in Celsius) for the city of Berlin.
    { city: 'Berlin, DE', temperature: 22, datetime: new Date().toString() },

    // Metadata contains information about the transaction itself
    // (can be `null` if not needed)
    { what: 'My first BigchainDB transaction' },

    // A transaction needs an output
    [ driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(publicInner))
    ],
    publicInner
)

// Sign the transaction with private keys
const txSigned = driver.Transaction.signTransaction(tx, privateInner)
console.log(txSigned)
// Send the transaction off to BigchainDB
/*
const conn = new driver.Connection(API_PATH, { 
    app_id: 'b1d63ff3',
    app_key: '29913c6deb7ee2bd0709d6af3b382b44'
})
conn.postTransaction(txSigned)
    .then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))

*/