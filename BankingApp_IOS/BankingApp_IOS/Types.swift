//
//  Types.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation

struct LogInRequest: Codable {
    let username: String
    let password: String
    let clientLocation: String
    let clientBrowser: String
    let clientOS: String
}

struct LogInResponse: Codable {
    let id: Int
    let username: String
    let roles: [String]
}

struct AccountDetails: Codable {
    let id: Int
    let name: String
    let balance: Double
    let active: Bool
    let iban: String
}
