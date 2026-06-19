module suid::credential {
    use std::string::String;
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::TxContext;
    use sui::event;
    use sui::object::uid_to_address;

    // Credential record stored on-chain
    public struct Credential has key, store {
        id: UID,
        owner: address,
        credential_id: String,
        issuer: String,
        credential_type: String,
        metadata_url: String,
        issued_at: u64,
        verified: bool,
    }

    // Admin capability for managing the contract
    public struct AdminCap has key {
        id: UID,
    }

    // Events
    public struct CredentialIssued has copy, drop, store {
        credential_id: address,
        owner: address,
        credential_type: String,
    }

    public struct CredentialVerified has copy, drop, store {
        credential_id: address,
        verified: bool,
    }

    // Create a new credential and transfer to owner
    public fun issue_credential(
        owner: address,
        credential_id: String,
        issuer: String,
        credential_type: String,
        metadata_url: String,
        ctx: &mut TxContext,
    ) {
        let cred = Credential {
            id: object::new(ctx),
            owner,
            credential_id,
            issuer,
            credential_type,
            metadata_url,
            issued_at: tx_context::epoch(ctx),
            verified: false,
        };

        // Get ID before transferring
        let cred_address = object::uid_to_address(&cred.id);
        
        // Emit event
        event::emit(CredentialIssued {
            credential_id: copy cred_address,
            owner,
            credential_type: copy cred.credential_type,
        });

        // Transfer to owner
        transfer::transfer(cred, owner);
    }

    // Verify a credential (admin only)
    public fun verify_credential(
        credential: &mut Credential,
        _cap: &AdminCap,
    ) {
        credential.verified = true;

        // Emit event
        event::emit(CredentialVerified {
            credential_id: object::uid_to_address(&credential.id),
            verified: true,
        });
    }

    // Get credential info (view function)
    public fun get_credential_info(
        credential: &Credential,
    ): (address, String, String, String, String, u64, bool) {
        (
            credential.owner,
            credential.credential_id,
            credential.issuer,
            credential.credential_type,
            credential.metadata_url,
            credential.issued_at,
            credential.verified,
        )
    }
}
