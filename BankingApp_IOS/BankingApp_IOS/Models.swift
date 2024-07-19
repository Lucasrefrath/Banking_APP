//
//  Types.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation

struct LogInRequestModel: Codable {
    let username: String
    let password: String
    let clientLocation: String
    let clientBrowser: String
    let clientOS: String
    let deviceUUID: String
}

struct LogInResponseModel: Codable {
    let id: Int
    let username: String
    let roles: [String]
    let deviceIsMobileAuthentication: Bool
}

struct AccountDetailsModel: Codable {
    let id: Int
    let name: String
    let balance: Double
    let active: Bool
    let iban: String
}
