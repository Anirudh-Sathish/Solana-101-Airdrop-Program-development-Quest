//Anirudh Sathish 
// Solana Quest 
//AirDrop Program with Solana web3.js
// Airdrops 1 SOL from the devnet
// Getting all the neccesary library dependecies 
const
{
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js")

//Generating a new wallet key pair 

const newPair = new Keypair();
console.log(newPair)

// Storing the public and private key
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;

//STEP-3 Getting the wallet Balance
const getWalletBalance = async () => 
{
  try 
  {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> For wallet address ${publicKey}`);
    console.log(`   Wallet balance: ${parseInt(walletBalance)/LAMPORTS_PER_SOL}SOL`);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

// Air dropping SOL , in Lamports units 
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log("Airdropping 1 SOL ")
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      1 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } 
  catch (err) 
  {
    console.log(err);
  }
};

//Function to excecute 
const excecuteCheck = async () => 
{
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
excecuteCheck();