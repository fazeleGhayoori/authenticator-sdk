import axios from 'axios'
import btoa from 'btoa'
import {v4 as uuidv4} from 'uuid'
import {
    ConvertCardNumberToIBAN, GetClientCredentialToken, MatchIBANWithNationalCode, MatchPhoneNumberWithNationalCode
} from "./Types/FinnotechTypes";


export class Finnotech {
    public clientId
    public baseUrl
    public clientPass
    public clientNationalCode
    public AuthenticationString

    constructor(config: {
        clientId: string
        baseUrl?: string
        clientPass: string
        clientNationalCode: string
    }) {
        this.clientId = config.clientId
        this.baseUrl = config.baseUrl || 'https://apibeta.finnotech.ir'
        this.clientPass = config.clientPass
        this.clientNationalCode = config.clientNationalCode
        this.AuthenticationString = btoa(`${this.clientId}:${this.clientPass}`)
    }

    public async getClientCredentialToken(scopes: string): Promise<GetClientCredentialToken> {
        try {
            const {data} = await axios.post(`${this.baseUrl}/dev/v2/oauth2/token`, {
                'grant_type': 'client_credentials', 'nid': `${this.clientNationalCode}`, scopes,
            }, {
                headers: {
                    Authorization: `Basic ${this.AuthenticationString}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

    public async matchPhoneNumberWithNationalCode(mobile: string, nationalCode: string): Promise<MatchPhoneNumberWithNationalCode> {
        try {
            const {result} = await this.getClientCredentialToken('facility:shahkar:get')
            const trackId = uuidv4()
            const {data} = await axios.get(`${this.baseUrl}/facility/v2/clients/${this.clientId}/shahkar/verify?trackId=${trackId}&mobile=${mobile}&nationalCode=${nationalCode}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

// eslint-disable-next-line max-len
    public async matchIBANWithNationalCode(birthDate: string, iban: string, nationalCode: string): Promise<MatchIBANWithNationalCode> {
        try {
            const {result} = await this.getClientCredentialToken('kyc:iban-owner-verification:get')
            const trackId = uuidv4()
            const {data} = await axios.get(`${this.baseUrl}/kyc/v2/clients/vista1/ibanOwnerVerification?trackId=${trackId}&birthDate=${birthDate}&nid=${nationalCode}&iban=${iban}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

    public async convertCardNumberToIBAN(card: string): Promise<ConvertCardNumberToIBAN> {
        try {
            const {result} = await this.getClientCredentialToken('facility:card-to-iban:get')
            const trackId = uuidv4()
            const {data} = await axios.get(`${this.baseUrl}/facility/v2/clients/${this.clientId}/cardToIban?version=2&trackId=${trackId}&card=${card}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }


    public async matchAccountNumberWithNationalCode(cardNumber: string, nationalCode: string) {
        try {
            const {result: accountNumber} = await this.convertCardNumberToAccountNumber(cardNumber)
            const {result} = await this.getClientCredentialToken('facility:deposit-owner-verification:get')
            const trackId = uuidv4()
            // Remember that you should complete bank code
            const {data} = await axios.get(`${this.baseUrl}/facility/v2/clients/${this.clientId}/depositOwnerVerification?trackId=${trackId}&deposit=${accountNumber.deposit}&bank={bankCode}&nationalCode=${nationalCode}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }

    public async getFinnotechBanksCode() {
        try {
            const {result} = await this.getClientCredentialToken('facility:cc-bank-info:get')
            const trackId = uuidv4()
            const {data} = await axios.get(`${this.baseUrl}/facility/v2/clients/${this.clientId}/banksInfo?trackId=${trackId}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data.result.result
        } catch (e: any) {
            return e.response.data
        }
    }

    public async convertCardNumberToAccountNumber(card: string) {
        try {
            const {result} = await this.getClientCredentialToken('facility:card-to-deposit:get')
            const trackId = uuidv4()
            const {data} = await axios.get(`${this.baseUrl}/facility/v2/clients/${this.clientId}/cardToDeposit?trackId=${trackId}&card=${card}`, {
                headers: {
                    Authorization: `Bearer ${result?.value}`,
                },
            })
            return data
        } catch (e: any) {
            return e.response.data
        }
    }
}





