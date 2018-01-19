const cc = require('crypto-conditions')

/*const fulfillment = 'pGSAIOwXK5OtXlY79JMscOEkUDTDVGfvLv1NZOv4GWg0Z-K_gUC2IpH62UMvjymLnEpIldvik_b_2hpo2t8Mze9fR6DHISpf6jzal6P0wD6p8uisHOyGpR1FISer26CdG28zHAcK'
const condition = 'ni:///sha-256;U1YhFdW0lOI-SVF3PbDP4t_lVefj_-tB5P11yvfBaoE?fpt=ed25519-sha-256&cost=131072'
const message = new Buffer('Hello World! Conditions are here!')

const result = cc.validateFulfillment(fulfillment, condition, message)

console.log(result)
*/
const edPrivateKey = new Buffer('2af5435e885fb89a9548dd56ad9f5933f622704dbf95c6e5d8b393890370b3d2', 'hex')
const ed25519Fulfillment = new cc.Ed25519Sha256()
//ed25519Fulfillment.setPublicKey(new Buffer('...'))
// ed25519Fulfillment.setSignature(new Buffer('...'))
// -- or --
ed25519Fulfillment.sign(new Buffer('Hello World! Conditions are here!'), edPrivateKey)
console.log(ed25519Fulfillment.getAsn1JsonPayload().signature.toString('hex'))
console.log(ed25519Fulfillment.getConditionUri())
// prints 'ni:///sha-256;U1YhFdW0lOI-SVF3PbDP4t_lVefj_-tB5P11yvfBaoE?fpt=ed25519-sha-256&cost=131072'
 console.log(ed25519Fulfillment.serializeUri())
// prints 'pGSAIOwXK5OtXlY79JMscOEkUDTDVGfvLv1NZOv4GWg0Z-K_gUC2IpH62UMvjymLnEpIldvik_b_2hpo2t8Mze9fR6DHISpf6jzal6P0wD6p8uisHOyGpR1FISer26CdG28zHAcK'

