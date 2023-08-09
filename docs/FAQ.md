---
sidebar_position: 5
slug: /faq
---
# FAQ

### <b>Why do you require a public / private key pair to access Turnkey API?</b>

Asymmetric cryptography offers various security benefits to you:

- Turnkey _cannot_ leak your API private keys, even if compromised, because Turnkey only knows your API public keys.
- Your API private key stays on the server you generated it for. This means there's a lower risk of key exfiltration compared to other methods where an API key, or API credentials in general, are generated in one place (web browser, company server), transported via a second (copy/paste, email, PDF document) and used in a third place (your server).

### <b>Why do I need to sign the whole POST body?</b>

Signing the whole payload is a way for Turnkey to know:

- That you are in possession of your API key (because we can verify the signature you attach to requests).
- That the person or program signing is approving the current request (not just any request).

Concretely, Turnkey needs the following:

1. **The original request you sent**: this is achieved by simply receiving the HTTP request and its body
2. **That your API key was used to approve the request**: this is achieved by checking the signature contained in the `X-Stamp` header. For this verification we need the serialized POST body, your API public key, and the signature. This is all contained in the header value.
3. **That the request is legitimate**: this is achieved by parsing the serialized request to make sure the intent is correct. This happens all the way down in our [Secure Enclaves](/security/secure-enclaves). For example, when you send a request to create a new Private Key, our policy engine parses your original request to independently derive the type of request, the payload to sign, etc. This guards against man-in-the-middle attacks.

Turnkey would not be able to have its enclaves verify signatures and check the request intent if we didn't have your signature on the whole payload.

### <b>How is a Turnkey API key different from a crypto public / private key?</b>

A Turnkey API key is simply a way to authenticate requests to Turnkey. Crypto assets are not tied to it in any way.

Think about Turnkey API keys as an access-gating mechanism to Turnkey functionality. They're flexible in what they can do (you get to decide this with [Policies](/managing-policies/overview)!), and revocable if they are lost or compromised.

### <b>What happens if I lose my API key? Do I lose my crypto?</b>

Losing your Turnkey API key doesn't mean you'll lose your crypto:

- By default, your API key is not able to move funds
- If you've changed policies so that your API key is allowed to unilaterally move funds, you may be at risk. Leverage the Turnkey UI to revoke your API key as soon as possible.

Talk to our team if you want to get in touch and talk more in-depth.

### <b>Can I use my existing crypto private key as a Turnkey API key?</b>

You can, but it doesn't mean you should. If you use your existing crypto private key as a turnkey API key, you are coupling Turnkey access with your crypto wallet. In essence, the risk profile of this key goes up. It's a bit like re-using passwords across many sites. Turnkey highly recommends creating a fresh public/private key pair if you need programmatic Turnkey access.

### <b>Which cryptographic curves do you support?</b>

Turnkey currently supports Secp256k1 private keys. We are also in the process of adding support for ED25519.

### <b>Which cryptocurrencies do you support?</b>

Turnkey's primitive for private keys is cryptographic curves, not specific cryptocurrencies. This means that if Turnkey supports the cryptographic curve used by a given cryptocurrency, you can use Turnkey private keys to store and sign for that asset.

We have deeper support for common Ethereum use cases in our API and SDKs, including address derivation and scripts to help you construct simple transactions.

If there are specific cryptocurrencies you'd like to see us offer deeper support for, please let us know by contacting us at <hello@turnkey.com>.

### <b>Do you support transaction construction and broadcast?</b>

Turnkey does not offer native support for transaction construction and broadcast, instead we focus on transaction signing.

We suggest you use blockchain-specific libraries, like Ethers.js for Ethereum, to construct transactions. We offer simple [scripts](https://github.com/tkhq/sdk/tree/main/examples/with-ethers/) leveraging ethers.js to help you with basic transaction construction.

You can use any blockchain node provider, like Infura or Alchemy, to broadcast your transactions.

### <b>Are there limits on how many resources I can create, or activities I can execute? </b>

We currently have the following limits on organizational resources in place:

| Resource                | Maximum number allowed |
| :---------------------- | :--------------------- |
| Users                   | 500                    |
| Private keys            | 10,000                 |
| Policies                | 1,000                  |
| Invitations             | 1,000                  |
| Tags                    | 100                    |
| Authenticators per user | 10                     |
| API keys per user       | 10                     |
| Sub-Organizations       | unlimited              |

Note that each deleted resource remains part of your organization's data and can slow performance at very large scales. In general, sub-organizations are an excellent way to manage scaling without losing performance. 

If you are approaching any of these limits in your implementation, reach out to the Turnkey team to discuss remediations.