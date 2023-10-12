export interface ConvertCardNumberToIBAN {
  responseCode: string
  trackId: string
  result?: ConvertCardNumberToIBANResult
  status: 'DONE' | 'FAILED'
  error?: Error
}

export interface ConvertCardNumberToIBANResult {
  deposit: string
  bankName: string
  card: string
  depositOwners: string
  IBAN: string
  depositStatus: '02' | '03' | '04' | '05' | '06' | '07'
  bankCode: string
}

export interface MatchIBANWithNationalCode {
  responseCode: string
  trackId: string
  result?: MatchIBANWithNationalCodeResult
  status: 'DONE' | 'FAILED'
  error?: Error
}

export interface MatchIBANWithNationalCodeResult {
  isValid?: 'no' | 'yes' | 'most_possible'
  message?: string
}

export interface MatchPhoneNumberWithNationalCode {
  responseCode: string
  trackId: string
  result?: MatchPhoneNumberWithNationalCodeResult
  status: 'DONE' | 'FAILED'
  error?: Error
}

export interface MatchPhoneNumberWithNationalCodeResult {
  isValid: boolean
}

export interface GetClientCredentialToken {
  result?: GetClientCredentialTokenResult
  status: 'DONE' | 'FAILED'
  error?: Error
}

export interface GetClientCredentialTokenResult {
  value: string
  scopes: string[]
  lifeTime: number
  creationDate: string
  refreshToken: string
  _id: string
}

export interface Error {
  code: string
  message: string
}

